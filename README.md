# JFrog Plugin for Devin

JFrog plugin for [Devin](https://devin.ai/): JFrog Platform skills for artifact management, security scanning, and supply-chain workflows.

> **Current version:** `0.1.0` — includes the official JFrog skills bundle from [jfrog/jfrog-skills](https://github.com/jfrog/jfrog-skills).

## Skills

| Skill | Description |
| --- | --- |
| `jfrog` | JFrog Platform operations via CLI and APIs (Artifactory, Xray, access, projects, and more). |
| `jfrog-package-safety-and-download` | Check package safety and download via Artifactory. |

After install, Devin exposes them as `/jfrog:jfrog` and `/jfrog:jfrog-package-safety-and-download`.

Skill content is vendored under `skills/` — see [VENDOR.md](VENDOR.md).

## Prerequisites

- **Devin CLI** — see [Devin docs](https://docs.devin.ai/)
- **Devin CLI plugins enabled** for your organization (`devin plugins install` must be allowed)
- **Skill runtime** (when using the skills) — `jf` CLI, `jq`, and `curl` on `PATH`, plus `JFROG_URL` and `JFROG_ACCESS_TOKEN` (or `jf config add`). See [jfrog-skills requirements](https://github.com/jfrog/jfrog-skills/blob/v0.11.0/README.md#requirements).

## Installation

### Local path

```bash
devin plugins install /path/to/devin-plugin -y
```

### From GitHub

```bash
devin plugins install https://github.jfrog.info/asalaz/devin-plugin.git -y
```

Private GitHub Enterprise hosts may require SSH, stored credentials, or a local path install.

## Verify

```bash
devin plugins list
devin plugins info jfrog
```

`devin plugins info jfrog` should list the skills above.

## Repository layout

```
devin-plugin/
├── .devin-plugin/plugin.json
├── skills/
│   ├── jfrog/
│   └── jfrog-package-safety-and-download/
├── .github/scripts/          # sync-skills vendoring
├── LICENSE
├── README.md
└── VENDOR.md
```

## Validate locally

```bash
node scripts/validate-devin-plugin.mjs
```

## Versioning

Bump `version` in [`.devin-plugin/plugin.json`](.devin-plugin/plugin.json) when you publish a new release, then tag (for example `v0.1.0`).

## License

Apache License 2.0 — see [LICENSE](LICENSE).
