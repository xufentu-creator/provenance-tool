# Provenance Tool v0.4.1

A free, local-first PWA for creating portable file-integrity records, verifying recorded files and package manifests, and comparing file-level changes.

- Source files remain on the user’s device.
- No analytics, account system, or remote application API is included.
- The packaged app can operate offline after installation.
- Generated packages retain factual tool-origin attribution.

## Use

Serve this folder through HTTPS or a local web server, then open `index.html`. The app provides three actions: create a record, verify files and a saved record, and compare two file versions.

## Security boundary

The tool calculates hashes and checks package consistency. It does not prove legal authorship, ownership, identity, originality, or certified time. Review `SECURITY.md` before high-risk use.

## Public scope

This repository contains only the public software, the minimum record schema needed for interoperability, and required licensing and attribution files.

## Attribution

Official reference implementation originated by **Xufen Tu**.

## License

Apache-2.0. See `LICENSE` and `NOTICE`.
