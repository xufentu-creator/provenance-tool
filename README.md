# Provenance Tool v0.4.2

A free, local-first PWA for creating portable file-integrity records, verifying recorded files and package manifests, and comparing file-level changes.

- Source files remain on the user’s device.
- No account is required.
- No analytics or automatic source-file upload is included.
- The application can operate offline after installation.
- Generated packages retain factual tool-origin attribution.

## Use

Serve this folder through HTTPS or a local web server, then open `index.html`.

The application provides three actions:

- Create a record
- Verify files or a saved record package
- Compare file versions

Selected file names and modification dates may be suggested automatically and remain editable.

## Boundaries

The tool calculates hashes and checks package consistency. It does not independently establish legal authorship, ownership, identity, originality, or certified time.

## Attribution

Official reference implementation originated by **Xufen Tu**.

Canonical tool: https://research-tools.xufentu.com  
Source repository: https://github.com/xufentu-creator/provenance-tool

## License

Apache-2.0. See `LICENSE` and `NOTICE`.
