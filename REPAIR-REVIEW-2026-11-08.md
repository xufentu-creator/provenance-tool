# Provenance Tool — isolated repair review (2026-11-08)

## Scope and preservation

- Source: `xufentu-creator/provenance-tool`, baseline commit `65671f075c564c6e8a78b0ce1039525e0b9aaf9c`.
- Candidate changes exist only in this review copy. No push, merge, domain change, service purchase or production deployment was performed.
- Existing personal attribution, historical notices, research content, images and public routes are retained.

## Repairs in this candidate

1. Added a reusable integrity/path-validation module (`assets/integrity-core.js`). Paths are normalized to NFC and forward slashes; empty, absolute, traversal, ambiguous and duplicate paths are rejected instead of silently overwriting prior files.
2. Hardened the Create, Verify and Compare page logic against duplicate paths, malformed records, missing integrity records, unlisted ZIP content, changed file bytes, bad size/hash metadata and invalid package identifiers.
3. Fixed a PWA precache entry pointing to a nonexistent `.well-known/security.txt`; precache now includes the new integrity module. Navigation fallback no longer masks failed JavaScript/asset requests as HTML.
4. Aligned the published provenance JSON Schema with the generator's actual `tool_originator` field.
5. Added reproducible Node.js unit and real ZIP verification tests.
6. Added a unified visual design layer (`assets/product-ui.css`) with restrained research-product typography, clear layout hierarchy, accessible focus states, desktop/mobile layouts and reduced-motion support. Added visible navigation to existing resource pages; no original public URL or page was removed.
7. Added bilingual labels for the new navigation, process assurances and footer; updated workflow tab `aria-pressed` state. Included the stylesheet in the PWA precache.
8. Prevented stale generated ZIP/record information from remaining downloadable after files or declared metadata are changed. The user must regenerate the package after any such edit.

## Verified checks

Run `node --test tests/*.test.cjs` from the project root. On 2026-11-08: **18 tests passed, 0 failed**. The checks include parsing the main JavaScript, confirming referenced local routes/assets exist, and guarding against stale generated packages.

Additional read-only route inventory covered 11 HTML pages and 112 local links/assets; all 112 resolved inside the candidate source tree. Public host checks returned HTTP 200 for the existing pages and HTTP 404 for the **new, not-yet-deployed** `assets/integrity-core.js` and `assets/product-ui.css`, which is expected before release. These two files must accompany `index.html` in an approved deployment.

Additional checks: `git diff --check`, `node --check assets/integrity-core.js`, `node --check service-worker.js` passed.

## Remaining manual acceptance gates (not claimed as passed)

- Chrome/Safari browser interaction: select files, Create, download ZIP, re-open and Verify, edit a file and observe failure, Compare and review the displayed statuses.
- Visual review in desktop and mobile browsers. Automated headless Chromium could not launch in the restricted workspace (`socket() failed: Operation not permitted`); no screenshot-based PASS is claimed.
- iPhone Safari and desktop PWA install, service-worker update and offline opening.
- Verify the published host serves every new asset and respects the intended cache policy after a separately approved release.
- Human review of ZIP file names/metadata and any publishing/indexing settings before deploying.

These are real-world environment checks, not proof of a code failure. They remain **NOT VERIFIED**, so production release status is **HOLD**, pending the owner's acceptance and approval.

## How to apply without losing history

Keep the original repository and its history; make a new review branch from the baseline commit. Copy the changed `index.html`, `service-worker.js`, `schemas/provenance-package.schema.json` plus the new `assets/integrity-core.js`, `assets/product-ui.css` and `tests/` files from this package. Keep other files unchanged. Run tests, visually review, then create a review PR. Do not replace the repository with a ZIP upload or force-push. The public file inventory and release records should be regenerated during a later, explicitly approved release rather than rewriting historical evidence now.
