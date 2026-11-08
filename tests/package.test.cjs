const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const JSZip = require('../vendor/jszip.min.js');
const core = require('../assets/integrity-core.js');

const source = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const start = source.indexOf('async function readIntegrity(file){');
const end = source.indexOf('\n$("runVerify").onclick', start);
assert.ok(start > 0 && end > start);
const readIntegrity = new Function('JSZip', 'ProvenanceIntegrity', 'crypto', `return (${source.slice(start, end)})`)(JSZip, core, crypto.webcrypto);
const sha = value => crypto.createHash('sha256').update(value).digest('hex');

async function fixture(mutate = () => {}) {
  const zip = new JSZip();
  const rec = { record_id: 'sample-123', algorithm: 'SHA-256', files: [{ relative_path: '作品/a.txt', size_bytes: 3, sha256: sha('abc') }] };
  const content = JSON.stringify(rec);
  zip.file('file-integrity-records.json', content);
  zip.file('README.md', 'Readable summary');
  const entries = [
    { path: 'file-integrity-records.json', size_bytes: Buffer.byteLength(content), sha256: sha(content) },
    { path: 'README.md', size_bytes: Buffer.byteLength('Readable summary'), sha256: sha('Readable summary') }
  ];
  const manifest = { record_id: rec.record_id, package_files: entries };
  zip.file('release-manifest.json', JSON.stringify(manifest));
  zip.file('MANIFEST.sha256', entries.map(x => `${x.sha256}  ${x.path}`).join('\n') + '\n');
  mutate(zip, manifest, entries);
  const bytes = await zip.generateAsync({ type: 'uint8array' });
  const buffer = Buffer.from(bytes);
  buffer.name = 'test.zip';
  return buffer;
}

test('valid portable ZIP passes manifest checks', async () => {
  const result = await readIntegrity(await fixture());
  assert.deepEqual(result.issues, []);
  assert.equal(result.rec.files[0].relative_path, '作品/a.txt');
});

test('changed file inside ZIP is rejected', async () => {
  const result = await readIntegrity(await fixture(zip => zip.file('README.md', 'Tampered text')));
  assert.ok(result.issues.includes('changed:README.md'));
});

test('unlisted file inside ZIP is rejected', async () => {
  const result = await readIntegrity(await fixture(zip => zip.file('unlisted.txt', 'surprise')));
  assert.ok(result.issues.includes('unlisted:unlisted.txt'));
});

test('missing checksum and wrong record identity are rejected', async () => {
  const result = await readIntegrity(await fixture((zip, manifest) => {
    zip.remove('MANIFEST.sha256');
    manifest.record_id = 'different';
    zip.file('release-manifest.json', JSON.stringify(manifest));
  }));
  assert.ok(result.issues.includes('missing-checksums'));
  assert.ok(result.issues.includes('record-id-mismatch'));
});

test('malformed manifest duplicate entries are rejected', async () => {
  await assert.rejects(readIntegrity(await fixture((zip, manifest, entries) => {
    manifest.package_files = [...entries, entries[0]];
    zip.file('release-manifest.json', JSON.stringify(manifest));
  })), /Duplicate/);
});

test('bad file size and modified checksums are rejected', async () => {
  const result = await readIntegrity(await fixture((zip, manifest) => {
    manifest.package_files[1].size_bytes = 1;
    zip.file('release-manifest.json', JSON.stringify(manifest));
    zip.file('MANIFEST.sha256', 'wrong');
  }));
  assert.ok(result.issues.includes('size:README.md'));
  assert.ok(result.issues.includes('changed-checksums'));
});
