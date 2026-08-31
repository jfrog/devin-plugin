# Vendored skills

The skill packages under `skills/` are vendored from **[jfrog/jfrog-skills](https://github.com/jfrog/jfrog-skills)** and committed to `main`.

| | |
| --- | --- |
| **Repository** | https://github.com/jfrog/jfrog-skills |
| **Pinned release** | see `pin` in [`.github/scripts/sync-skills-vendor.json`](.github/scripts/sync-skills-vendor.json) |
| **Plugin version** | see `version` in [`.devin-plugin/plugin.json`](.devin-plugin/plugin.json) |

Included directories (as of the pinned release): `jfrog/`, `jfrog-init/`, `jfrog-ai-catalog-skills/`, `jfrog-mcp-management/`, `jfrog-package-safety-and-download/`, `jfrog-reference-architecture/`, `jfrog-setup-package-managers/`.

The README deliberately omits release numbers. The manifest and GitHub tags/releases are the authoritative plugin-version sources; the vendor configuration is the authoritative skills pin.

## Refreshing

When the upstream repo publishes a new release, refresh the vendored tree via a PR that:

1. Bumps `pin` in [`.github/scripts/sync-skills-vendor.json`](.github/scripts/sync-skills-vendor.json) to the new tag.
2. Re-syncs and commits the refreshed `skills/` tree.
3. Bumps `version` in [`.devin-plugin/plugin.json`](.devin-plugin/plugin.json) so the published plugin version reflects the new skills bundle (users reinstall or refresh to pick up changes).

To regenerate the tree locally before opening the PR:

```bash
node .github/scripts/sync-skills.mjs
```

The script reads its sibling [`sync-skills-vendor.json`](.github/scripts/sync-skills-vendor.json), downloads the pinned upstream tarball from `codeload.github.com`, and replaces the directories listed in `paths` (today: `skills/`).
