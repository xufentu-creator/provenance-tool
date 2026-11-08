/* Portable, dependency-free validation shared by the UI and regression tests. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.ProvenanceIntegrity = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const SHA256 = /^[a-f0-9]{64}$/i;

  function normalizePath(value) {
    if (typeof value !== "string" || !value.trim() || value.includes("\0")) throw new Error("Invalid file path");
    const path = value.replace(/\\/g, "/").normalize("NFC");
    if (path.startsWith("/") || /^[a-zA-Z]:\//.test(path)) throw new Error("Absolute file path");
    const parts = path.split("/");
    if (parts.some(part => !part || part === "." || part === "..")) throw new Error("Unsafe file path");
    return parts.join("/");
  }

  function uniqueFiles(items, accessor) {
    if (!Array.isArray(items)) throw new Error("Files must be an array");
    const seen = new Set();
    return items.map(item => {
      const path = normalizePath(accessor(item));
      if (seen.has(path)) throw new Error("Duplicate file path: " + path);
      seen.add(path);
      return { ...item, path };
    }).sort((a, b) => a.path.localeCompare(b.path, "en"));
  }

  function validateIntegrity(record) {
    if (!record || typeof record !== "object" || !Array.isArray(record.files) || !record.files.length) throw new Error("Invalid integrity record");
    if (record.algorithm && record.algorithm !== "SHA-256") throw new Error("Unsupported hash algorithm");
    const files = uniqueFiles(record.files, item => item.relative_path || item.name);
    for (const item of files) {
      if (!SHA256.test(item.sha256 || "")) throw new Error("Invalid SHA-256 for " + item.path);
      if (!Number.isSafeInteger(item.size_bytes) || item.size_bytes < 0) throw new Error("Invalid file size for " + item.path);
    }
    return files;
  }

  function validateManifest(manifest) {
    if (!manifest || !Array.isArray(manifest.package_files) || !manifest.package_files.length) throw new Error("Missing package manifest entries");
    const files = uniqueFiles(manifest.package_files, item => item.path);
    for (const item of files) {
      if (!SHA256.test(item.sha256 || "")) throw new Error("Invalid package SHA-256");
      if (!Number.isSafeInteger(item.size_bytes) || item.size_bytes < 0) throw new Error("Invalid package file size");
    }
    if (!files.some(item => item.path === "file-integrity-records.json")) throw new Error("Integrity record not in manifest");
    return files;
  }

  function compareFiles(previous, current) {
    const a = new Map(uniqueFiles(previous, x => x.path).map(x => [x.path, x]));
    const b = new Map(uniqueFiles(current, x => x.path).map(x => [x.path, x]));
    return [...new Set([...a.keys(), ...b.keys()])].sort().map(path => {
      const before = a.get(path), after = b.get(path);
      return { k: path, status: !before ? "added" : !after ? "removed" : before.hash === after.hash ? "same" : "changed" };
    });
  }

  return { normalizePath, uniqueFiles, validateIntegrity, validateManifest, compareFiles };
});
