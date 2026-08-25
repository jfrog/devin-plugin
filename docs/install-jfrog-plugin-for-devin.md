# Install JFrog Agent Plugin for Devin

> **Web publication source.** Publish to `https://docs.jfrog.com/ai-ml/docs/devin` (and add to the JFrog Agent Plugins index).

Install and configure the JFrog Agent Plugin for [Devin](https://devin.ai/) CLI and Devin Local sessions, including JFrog Agent Skills and the bundled JFrog Platform MCP server.

## What's included

| Component | Description |
| --- | --- |
| **JFrog Skills** | Including `jfrog`, `jfrog-init`, `jfrog-mcp-management`, package safety, AI Catalog, package-manager setup, and reference architecture skills. |
| **JFrog Platform MCP** | Remote MCP entry (`https://${JFROG_PLATFORM_URL}/mcp`) with OAuth (`devin mcp login jfrog`). |

## Prerequisites

| Requirement | Notes |
| --- | --- |
| JFrog Platform instance | You can authenticate against it (URL + token or browser login). |
| Devin CLI | Plugins must be enabled for your organization (`devin plugins install` allowed). |
| `JFROG_PLATFORM_URL` | Platform host only (for example `mycompany.jfrog.io`, no scheme, no trailing slash) in the environment that **launches** Devin. |
| `jf`, `jq`, `curl` on `PATH` | Required for JFrog skills at runtime. Configure the CLI with `jf config add` or `jf login`. |
| JFrog AI Catalog (optional) | Required only for Agent Guard MCP catalog features. |

## Install the JFrog Agent Plugin for Devin

1. Install the plugin:

   ```bash
   devin plugins install jfrog/devin-plugin -y
   ```

2. Export the platform host for the bundled MCP (shell profile, Devin launch environment, or session env) **before** starting Devin:

   ```bash
   export JFROG_PLATFORM_URL=mycompany.jfrog.io
   ```

3. **Configure the JFrog CLI** for skills:

   ```bash
   jf config add
   ```

4. Start a Devin CLI or Devin Local session and run **`/jfrog:jfrog-init`**. It checks Node, the JFrog CLI, server reachability, the MCP file, project resolution, and AI Catalog entitlement, and walks you through anything missing.

5. **Restart Devin** after plugin install or MCP config changes.

6. Authenticate the platform MCP when prompted, or run:

   ```bash
   devin mcp login jfrog
   ```

`mcp.json` resolves `${env:JFROG_PLATFORM_URL}` at launch. Setting it mid-session, or setting other JFrog variables afterwards, does not repair a failed `/jfrog:jfrog-init` — fix the reported step and re-run the skill.

## Verify (required)

1. `devin plugins list` and `devin plugins info jfrog` — plugin installed; skills listed.
2. In session: `/mcp` — `jfrog` appears and shows Connected after OAuth.
3. Ask the agent to list tools for `jfrog` — at least one tool is returned.
4. `jf rt ping` — succeeds for your configured server.

## Devin notes

- Skills are invoked as `/jfrog:<skill-name>` (for example `/jfrog:jfrog-init`, `/jfrog:jfrog-mcp-management`).
- The plugin ships skills **and** declares MCP in-repo; Devin loads skills on install and resolves `${env:JFROG_PLATFORM_URL}` at MCP startup.
- If `/jfrog-init` cannot find helper scripts, invoke the namespaced skill (`/jfrog:jfrog-init`) so Devin resolves the vendored skill directory correctly.

## Recovery

| Symptom | Do this | Do **not** do this |
| --- | --- | --- |
| MCP missing after install | Confirm `JFROG_PLATFORM_URL` is set in the **launch** environment, re-run `/jfrog:jfrog-init`, complete `devin mcp login jfrog`, **restart Devin**, then `/mcp`. | Assume changing env vars mid-session will register MCP. |
| `/jfrog:jfrog-init` stopped at CLI/auth | Follow the skill prompt (`jf config add`, web login, or token path), then **re-run `/jfrog:jfrog-init`**. | Skip init and only export env vars. |
| Host placeholder unresolved | Set `JFROG_PLATFORM_URL` before starting Devin, restart, re-run `/jfrog:jfrog-init`. | Change the variable after Devin is already running and expect MCP to pick it up. |
| Init cannot find helper scripts | Invoke `/jfrog:jfrog-init` (namespaced), not a bare `/jfrog-init`. | Reinstall before checking the skill name. |

## Related topics

- [JFrog Agent Plugins](https://docs.jfrog.com/ai-ml/docs/jfrog-plugins)
- [Troubleshoot Plugins](https://docs.jfrog.com/ai-ml/docs/troubleshoot-plugins)
