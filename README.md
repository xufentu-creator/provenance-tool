# Provenance Tool v0.4.2

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

- Automatic editable title and date suggestions from selected file metadata.

## Research discussion

The public tool remains open and local-first. An invitation-based research discussion channel may be used separately for researchers and practitioners working on provenance, human judgment, version continuity, and responsibility boundaries. Access is optional and is not required to use the tool.


## Public discovery surfaces

The official website includes public, machine-readable discovery files and concise explanatory pages:

- `robots.txt` and `sitemap.xml`
- `llms.txt` containing only public tool facts and limitations
- Schema.org `SoftwareApplication` structured data
- `codemeta.json`, `CITATION.cff`, and `CITATION.bib`
- About, How it works, Use cases, FAQ, Citation, and Privacy pages

These surfaces describe only the public reference implementation. They do not disclose private research reasoning, governance methods, scoring systems, organizational workflows, or commercial implementation methods.

## Search and training boundary

The included `robots.txt` allows general search indexing, OAI-SearchBot, and user-requested ChatGPT retrieval while disallowing GPTBot training crawl. Crawler behavior remains subject to each operator's policies and cannot guarantee indexing or recommendation.
