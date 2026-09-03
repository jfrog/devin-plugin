# JFrog Plugin for Devin

JFrog plugin for [Devin](https://devin.ai/): JFrog Platform skills for artifact management, security scanning, and supply-chain workflows, plus the JFrog Platform MCP server (remote HTTP + OAuth).

> **Current version:** `0.3.0` — skills from [jfrog/jfrog-skills](https://github.com/jfrog/jfrog-skills) (pinned at `v0.25.0`) and a bundled JFrog MCP entry.

## Skills

| Skill | Description |
| --- | --- |
| `jfrog` | JFrog Platform operations via CLI and APIs (Artifactory, Xray, access, projects, and more). |
| `jfrog-init` | Plugin readiness / setup (detect CLI, config, MCP, and related bootstrap steps). |
| `jfrog-mcp-management` | Install, list, and remove MCP servers through JFrog Agent Guard; browse the JFrog MCP catalog. |
| `jfrog-ai-catalog-skills` | Discover, install, manage, and publish agent skills from the JFrog AI Catalog via `jf skills` and Agent Guard. |
| `jfrog-setup-package-managers` | Bind package managers (npm, pip, Maven, Go, and more) to JFrog Artifactory via `jf setup`. |
| `jfrog-reference-architecture` | JFrog Platform topology, sizing, deployment patterns, and multi-site guidance. |
| `jfrog-package-curation` | Check package safety and download via Artifactory. |

After install, Devin exposes them as `/jfrog:<skill-name>` (for example `/jfrog:jfrog-mcp-management`).

Skill content is vendored under `skills/` — see [VENDOR.md](VENDOR.md).

## JFrog MCP

The plugin registers this MCP server (declared in `mcp.json` and referenced from `.devin-plugin/plugin.json`):

```json
{
  "mcpServers": {
    "jfrog": {
      "url": "https://${env:JFROG_PLATFORM_URL}/mcp"
    }
  }
}
```

- Auth is **OAuth** against your JFrog Platform — no access token is stored in the plugin.
- Set `JFROG_PLATFORM_URL` (host only, for example `mycompany.jfrog.io`) in the environment that launches Devin CLI / Devin Local so `${env:JFROG_PLATFORM_URL}` resolves.
- On first use, authenticate if prompted, or run: `devin mcp login jfrog`
- Plugin MCP tools are available in-session; they may not appear in the MCP settings UI yet.

## Prerequisites

- **Devin CLI** — see [Devin docs](https://docs.devin.ai/)
- **Devin CLI plugins enabled** for your organization (`devin plugins install` must be allowed)
- **`JFROG_PLATFORM_URL`** — JFrog platform host only (no `https://`, no trailing `/`). Required for the bundled MCP entry.
- **Skill runtime** (when using the skills) — `jf` CLI, `jq`, and `curl` on `PATH`, plus a configured JFrog instance (`jf config add`). See [jfrog-skills requirements](https://github.com/jfrog/jfrog-skills/blob/v0.25.0/README.md#requirements).

## Installation

```bash
devin plugins install jfrog/devin-plugin -y
```

Then, in a Devin session, run initialization:

```text
/jfrog:jfrog-init
```

`jfrog-init` checks the JFrog CLI, server config, MCP registration, project
resolution, and AI Catalog entitlement, and walks you through anything missing.
Restart Devin afterwards so the MCP entry reloads.

`JFROG_PLATFORM_URL` must be set in the environment that launches Devin **before**
you start the session, because `mcp.json` resolves `${env:JFROG_PLATFORM_URL}` at
launch. Setting it mid-session, or setting other JFrog variables afterwards, does
not repair a failed initialization — fix the reported step and re-run
`/jfrog:jfrog-init`.

## Verify

```bash
devin plugins list
devin plugins info jfrog
```

`devin plugins info jfrog` should list the skills above and an MCP server named `jfrog`.

In a Devin CLI or Devin Local session:

```text
/mcp
```

Confirm `jfrog` is listed (and Connected after OAuth). Ask the agent to list tools for `jfrog` — it should expose at least one tool.

Verification is a required install step, not a troubleshooting fallback.

## Recovery

If a check above fails, re-run `/jfrog:jfrog-init` after fixing the step it
reports, then restart Devin.

| Symptom | Do this | Do **not** do this |
| --- | --- | --- |
| MCP missing after install | Confirm `JFROG_PLATFORM_URL` is set in the **launch** environment, re-run `/jfrog:jfrog-init`, complete `devin mcp login jfrog`, restart Devin, then `/mcp`. | Assume changing env vars mid-session will register MCP. |
| `/jfrog:jfrog-init` stopped at CLI/auth | Follow the skill prompt, then **re-run `/jfrog:jfrog-init`**. | Skip init and only export env vars. |
| Host placeholder unresolved | Set `JFROG_PLATFORM_URL` before starting Devin, restart, re-run init. | Change the variable after Devin is already running. |

## Repository layout

```
devin-plugin/
├── .devin-plugin/plugin.json
├── mcp.json                  # JFrog Platform MCP (remote HTTP + OAuth)
├── skills/
│   ├── jfrog/
│   ├── jfrog-init/
│   ├── jfrog-mcp-management/
│   ├── jfrog-ai-catalog-skills/
│   ├── jfrog-setup-package-managers/
│   ├── jfrog-reference-architecture/
│   └── jfrog-package-curation/
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

Bump `version` in [`.devin-plugin/plugin.json`](.devin-plugin/plugin.json) when you publish a new release, then tag (for example `v0.3.0`).

## License

Apache License 2.0 — see [LICENSE](LICENSE).
