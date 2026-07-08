# Provenance Tool v0.3.1

> A local browser-based workspace for creating, verifying, and comparing portable provenance records.

<p align="left">
  <img src="https://img.shields.io/badge/version-0.3.1-111111?style=for-the-badge" alt="Version 0.3.1">
  <img src="https://img.shields.io/badge/processing-local_browser-f2f2f2?style=for-the-badge" alt="Local browser processing">
  <img src="https://img.shields.io/badge/integrity-SHA--256-f2f2f2?style=for-the-badge" alt="SHA-256 integrity">
  <img src="https://img.shields.io/badge/modes-create_verify_compare-f2f2f2?style=for-the-badge" alt="Create Verify Compare">
</p>

**Provenance Tool** is a public browser-based tool by **Xufen Tu（涂绪芬）** for creating portable records around authorship, source, version, citation, file integrity, and release continuity.

Selected files are processed locally in the browser and are not automatically uploaded to a website server.

---

## Workspace

| Mode | What it does |
|---|---|
| **Create** | Creates one portable provenance ZIP package for selected files or project folders. |
| **Verify** | Checks current files against a previously saved provenance ZIP or integrity record. |
| **Compare** | Compares previous and current versions and identifies unchanged, changed, added, and removed files. |

---

## What the tool creates

A generated provenance package may include:

```text
metadata.json
provenance.json
file-integrity-records.json
release-manifest.json
citation.txt
README.md
```

Each package is designed to keep the main record information together instead of forcing users to manage separate files manually.

---

## Designed for

| Use Context | Example |
|---|---|
| Research records | Preserve paper, file, version, and release information. |
| Creative works | Keep source, authorship, and public citation records together. |
| Project folders | Record source files, media files, archives, and delivery folders. |
| Internal records | Keep controlled records for non-public files. |
| Version review | Compare what changed between two file sets. |

---

## Record visibility

| Visibility | Intended Use |
|---|---|
| **Public** | Public release, citation, archive, or reference record |
| **Internal** | Internal project or working record |
| **Confidential** | Sensitive file record with controlled access |
| **Restricted** | Limited-access record |

Suggested citation text is generated only for Public records.

---

## Local processing

> [!IMPORTANT]
> Files selected inside the tool are processed locally in the browser.  
> They are not automatically uploaded to a website server.

The user controls whether generated records are saved, shared, archived, or published.

---

## Boundary

This tool supports provenance documentation, file-integrity records, verification, and version comparison.

It does not prove originality, determine legal ownership, provide an independently trusted timestamp, resolve authorship disputes, create copyright registration, or replace human judgment.

---

## Public record

| Item | Record |
|---|---|
| Tool | Provenance Tool |
| Version | `0.3.1` |
| Author | Xufen Tu（涂绪芬） |
| Processing | Local browser |
| Integrity | SHA-256 |
| Package format | Portable ZIP |
| Public provenance anchor | `TUX-133.144~` |

---

## Related research identity

| Reference | Link |
|---|---|
| Research Website | https://xufentu.com/ |
| GitHub Profile | https://github.com/xufentu-creator |
| ORCID | https://orcid.org/0009-0007-5265-964X |
| Public Research Identity Repository | https://github.com/xufentu-creator/xufentu-human-judgment |

---

## Repository separation

Early provenance tool records were created during the stage when tool materials and public research identity materials were maintained together.

Current and future Provenance Tool releases are maintained in this dedicated repository.

---

## Version history

| Version | Status |
|---|---|
| `v0.3.1` | Public browser-based provenance workspace with Create, Verify, and Compare modes |

---

<p align="center">
  <code>TUX-133.144~</code>
</p>
