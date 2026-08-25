# Install JFrog Agent Plugin for Devin

> **Web publication source.** Publish to `https://docs.jfrog.com/ai-ml/docs/devin` (and add to the JFrog Agent Plugins index). Canonical shared flow: [Shared install, verify, and recovery](https://github.com/jfrog/claude-plugin/blob/main/docs/shared-install-and-verify.md).

Install and configure the JFrog Agent Plugin for [Devin](https://devin.ai/) CLI and Devin Local sessions, including JFrog Agent Skills and the bundled JFrog Platform MCP server.

## What's included

| Component | Description |
| --- | --- |
| **JFrog Skills** | Including `jfrog`, `jfrog-init`, `jfrog-mcp-management`, package safety, AI Catalog, package-manager setup, and reference architecture skills. |
| **JFrog Platform MCP** | Remote MCP entry (`https://${JFROG_PLATFORM_URL}/mcp`) with OAuth (`devin mcp login jfrog`). |

## Prerequisites

See the [shared prerequisites](https://github.com/jfrog/claude-plugin/blob/main/docs/shared-install-and-verify.md#common-prerequisites-all-harnesses). Devin-specific additions:

- **Devin CLI** with plugins enabled for your organization (`devin plugins install` allowed).
- **`JFROG_PLATFORM_URL`** — platform host only (for example `mycompany.jfrog.io`, no scheme, no trailing slash) in the environment that launches Devin.

## Install the JFrog Agent Plugin for Devin

1. Install the plugin:

   ```bash
   devin plugins install jfrog/devin-plugin -y
   ```

2. Export the platform host for the bundled MCP (shell profile, Devin launch environment, or session env):

   ```bash
   export JFROG_PLATFORM_URL=mycompany.jfrog.io
   ```

3. **Configure the JFrog CLI** for skills:

   ```bash
   jf config add
   ```

4. Start a Devin CLI or Devin Local session and run **`/jfrog:jfrog-init`** to walk the shared readiness checklist (Node, CLI, server, MCP file, project, AI Catalog).

5. **Restart Devin** after plugin install or MCP config changes.

6. Authenticate the platform MCP when prompted, or run:

   ```bash
   devin mcp login jfrog
   ```

## Verify (required)

1. `devin plugins list` and `devin plugins info jfrog` — plugin installed; skills listed.
2. In session: `/mcp` — `jfrog` appears and shows Connected after OAuth.
3. Ask the agent to list tools for `jfrog` — at least one tool is returned.
4. `jf rt ping` — succeeds for your configured server.

## Devin-specific notes

- Skills are invoked as `/jfrog:<skill-name>` (for example `/jfrog:jfrog-init`, `/jfrog:jfrog-mcp-management`).
- The plugin ships skills **and** declares MCP in-repo; Devin loads skills on install and resolves `${env:JFROG_PLATFORM_URL}` at MCP startup — the host env var must be set **before** Devin starts.
- If `/jfrog-init` cannot find helper scripts, ensure you invoke the namespaced skill (`/jfrog:jfrog-init`) so Devin resolves the vendored skill directory correctly.

## Recovery

Follow the [shared recovery playbook](https://github.com/jfrog/claude-plugin/blob/main/docs/shared-install-and-verify.md#recovery-playbook). After a failed `/jfrog-init`, fix the reported step and **re-run `/jfrog:jfrog-init`** — do not assume exporting `JFROG_URL` alone repairs MCP registration.

## Related topics

- [JFrog Agent Plugins](https://docs.jfrog.com/ai-ml/docs/jfrog-plugins)
- [Claude Code](https://docs.jfrog.com/ai-ml/docs/claude-code)
- [VS Code](https://docs.jfrog.com/ai-ml/docs/vs-code)
- [Cursor](https://docs.jfrog.com/ai-ml/docs/cursor)
- [OpenCode](https://docs.jfrog.com/ai-ml/docs/opencode)
- [Codex web source](https://github.com/jfrog/codex-plugin/blob/main/docs/install-jfrog-plugin-for-codex.md)
- [Troubleshoot Plugins](https://docs.jfrog.com/ai-ml/docs/troubleshoot-plugins)
