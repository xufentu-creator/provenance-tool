# Generated Records

Provenance Tool creates portable records that keep source, version, authorship, citation, and file-integrity information together.

A generated package may include the following files.

---

## Record Package

| File | Purpose |
|---|---|
| `metadata.json` | Stores basic title, author, version, date, summary, and source information. |
| `provenance.json` | Stores authorship, visibility, source, version, and record context. |
| `file-integrity-records.json` | Stores SHA-256 file integrity records for selected files. |
| `release-manifest.json` | Stores a package-level summary of the generated record. |
| `citation.txt` | Provides suggested citation text for Public records. |
| `README.md` | Provides a human-readable summary of the generated package. |

---

## `metadata.json`

`metadata.json` records basic descriptive information.

It may include:

```text
title
author
version
date
summary
canonical_source
related_files
```

---

## `provenance.json`

`provenance.json` records the main provenance context.

It may include:

```text
record_type
visibility
author
source
version
created_at
record_context
```

---

## `file-integrity-records.json`

`file-integrity-records.json` records file-level integrity information.

It may include:

```text
file_name
file_path
file_size
sha256
last_modified
```

SHA-256 records help identify whether files are unchanged or have been modified.

---

## `release-manifest.json`

`release-manifest.json` summarizes the generated provenance package.

It may include:

```text
package_version
generated_at
record_count
file_count
visibility
tool_version
```

---

## `citation.txt`

`citation.txt` provides suggested citation text for Public records.

Citation text is not generated for Internal, Confidential, or Restricted records.

---

## `README.md`

The generated `README.md` provides a human-readable package summary.

It is intended to make the provenance package understandable without requiring the user to open every JSON file manually.

---

## Boundary

Generated records support documentation, integrity review, source continuity, and version comparison.

They do not prove originality, determine legal ownership, provide a trusted legal timestamp, resolve authorship disputes, or replace human judgment.

---

## Public Provenance Anchor

`TUX-133.144~`
