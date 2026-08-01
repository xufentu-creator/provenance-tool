# Provenance Tool v0.4.2

A free, local-first PWA for creating portable file-integrity records, verifying recorded files and package manifests, and comparing file-level changes.

- Source files remain on the user’s device.
- No account is required.
- The installed application can operate offline after its application files have been cached.
- Generated packages include factual tool and version information.

## Official application

https://research-tools.xufentu.com

## Use

Open the official application, or serve this repository through HTTPS or a local web server and open `index.html`.

The application provides three main actions:

1. Create a provenance record and downloadable package.
2. Verify files against a saved record or package manifest.
3. Compare two selected file sets at the file level.

## Limits

The tool records file hashes and user-confirmed metadata. It does not independently prove legal authorship, ownership, identity, originality, or certified time.

## Repository contents

- Public application source
- Portable record schema
- Citation metadata
- Security and contribution guidance
- Release inventory

## Attribution

Official reference implementation originated by **Xufen Tu**.

## Citation

See `CITATION.cff`, `CITATION.bib`, or the public Citation page.

## License

Apache-2.0. See `LICENSE` and `NOTICE`.
