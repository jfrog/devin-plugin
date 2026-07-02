# Contributing to JFrog Devin Plugin

Thank you for your interest in contributing! This project is maintained by JFrog and licensed under the [Apache License 2.0](LICENSE).

## Contributor License Agreement (CLA)

All contributors must sign the [JFrog CLA](https://jfrog.com/cla/) before contributions can be merged into the official `jfrog/devin-plugin` repository. A CLA check runs automatically on pull requests when CI is enabled — follow the prompts to sign if you haven't already.

## How to Contribute

1. **Fork** the repository and create a feature branch from `main`.
2. Make your changes, ensuring they follow the existing code style and project conventions.
3. **Validate** locally (once `scripts/validate-devin-plugin.mjs` is added):

```bash
node scripts/validate-devin-plugin.mjs
```

This checks `.devin-plugin/plugin.json` and walks every `skills/*/SKILL.md` for required YAML frontmatter.

4. **Test** by installing the plugin from the repository root (the repo root **is** the plugin root):

```bash
devin plugins install . -y
devin plugins info jfrog
```

Exercise the skills you changed (for example `/jfrog:jfrog`). Restart the Devin session or re-install after editing plugin files.

5. **Commit** with a clear, descriptive message.
6. Open a **pull request** against `main` with a summary of what changed and why.

### Updating the vendored skills

The `skills/` tree is vendored from [jfrog/jfrog-skills](https://github.com/jfrog/jfrog-skills) and committed to `main` — see [`VENDOR.md`](VENDOR.md) for the full flow (added with the skills release). To regenerate the tree locally against the pin in [`.github/scripts/sync-skills-vendor.json`](.github/scripts/sync-skills-vendor.json):

```bash
node .github/scripts/sync-skills.mjs
```

This downloads the pinned upstream tarball and replaces the contents of `skills/`. Commit the result alongside any pin/version bumps.

## Pre-release checklist

- [ ] `node scripts/validate-devin-plugin.mjs` passes (when present).
- [ ] Version bumped in [`.devin-plugin/plugin.json`](.devin-plugin/plugin.json) when the plugin changes.
- [ ] No secrets, credentials, or files under `**/local-cache/` committed.
- [ ] If the skill tree changed: `pin` in `.github/scripts/sync-skills-vendor.json` matches the upstream tag the new tree was generated from.
- [ ] Smoke-test: `devin plugins install . -y` and `devin plugins info jfrog` from the repo root.

## Build order (AX-1635)

Releases follow a fixed sequence:

1. **Skills** — `skills/` bundle via `devin plugins install`
2. **JFrog MCP** — documented MCP configuration (`devin mcp`, Devin config files)
3. **Agent Guard** — hooks and governance template for catalog MCPs

Do not merge MCP or Agent Guard changes before the preceding layer is complete.

## Reporting Issues

Open a GitHub issue on this repository with:

- A clear title and description of the problem.
- Steps to reproduce (if applicable).
- Expected vs. actual behavior.
- Devin CLI version (`devin --version`).

## Code Guidelines

- Keep changes focused — one logical change per PR.
- Follow existing patterns and naming conventions in the codebase.
- Do not commit secrets, credentials, or API keys.
- Add copyright headers to new source files:

```
// Copyright (c) JFrog Ltd. 2026
// Licensed under the Apache License, Version 2.0
// https://www.apache.org/licenses/LICENSE-2.0
```

## Code of Conduct

Be respectful and constructive. We are committed to providing a welcoming and inclusive experience for everyone.

## Questions?

Reach out to the JFrog DevRel team at devrel@jfrog.com.
