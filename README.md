# JFrog Plugin for Devin

JFrog plugin for [Devin](https://devin.ai/).

> **Current version:** `0.0.1` — scaffold only (plugin manifest and repository layout). Skills will be added in a future release.

## Prerequisites

- **Devin CLI** — see [Devin docs](https://docs.devin.ai/)
- **Devin CLI plugins enabled** for your organization (`devin plugins install` must be allowed)

## Installation

### From GitHub

```bash
devin plugins install YOUR_GITHUB_USER/devin-plugin -y
```

Replace `YOUR_GITHUB_USER` with your GitHub username or org.

### Local path

```bash
devin plugins install /path/to/devin-plugin -y
```

## Verify

```bash
devin plugins list
devin plugins info jfrog
```

## Repository layout

```
devin-plugin/
├── .devin-plugin/plugin.json
├── skills/
├── LICENSE
├── README.md
└── CONTRIBUTING.md
```

The repository root is the plugin root. Skills live under `skills/` (empty in `v0.0.1`).

## Versioning

Bump `version` in [`.devin-plugin/plugin.json`](.devin-plugin/plugin.json) when you publish a new release.

## License

Apache License 2.0 — see [LICENSE](LICENSE).
