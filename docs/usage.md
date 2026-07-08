# Usage

Provenance Tool is a local browser-based workspace for creating, verifying, and comparing portable provenance records.

The tool has three working modes:

| Mode | Purpose |
|---|---|
| Create | Create a portable provenance package for selected files or folders. |
| Verify | Check current files against a previously saved provenance ZIP or integrity record. |
| Compare | Compare two file sets and identify unchanged, changed, added, or removed files. |

---

## Create Mode

Use Create mode before publishing, archiving, sharing, or transferring a work.

Typical use:

1. Enter basic record information.
2. Select record visibility.
3. Add related files or folders.
4. Generate provenance records.
5. Download the portable ZIP package.

Create mode may generate:

```text
metadata.json
provenance.json
file-integrity-records.json
release-manifest.json
citation.txt
README.md
```

---

## Verify Mode

Use Verify mode when you want to check whether current files match a previously saved provenance record.

Typical use:

1. Select a saved provenance ZIP or integrity record.
2. Select the current files.
3. Run verification.
4. Review matched, changed, missing, or unexpected files.

Verification supports file-integrity review, but it does not prove originality or legal ownership.

---

## Compare Mode

Use Compare mode when you want to compare two versions of a project, folder, archive, or file set.

Typical use:

1. Select the previous version.
2. Select the current version.
3. Run comparison.
4. Review unchanged, changed, added, and removed files.

Compare mode is useful for version review before public release, internal archive, delivery, or handoff.

---

## Record Visibility

| Visibility | Intended Use |
|---|---|
| Public | Public release, citation, archive, or reference record |
| Internal | Internal project or working record |
| Confidential | Sensitive file record with controlled access |
| Restricted | Limited-access record |

Suggested citation text is generated only for Public records.

---

## Local Processing

> [!IMPORTANT]
> Selected files are processed locally in the browser.  
> They are not automatically uploaded to a website server.

The user controls whether generated records are saved, shared, archived, or published.

---

## Boundary

This tool supports provenance documentation, file-integrity records, verification, and version comparison.

It does not prove originality, determine legal ownership, provide an independently trusted timestamp, resolve authorship disputes, create copyright registration, or replace human judgment.

---

## Public Provenance Anchor

`TUX-133.144~`
