// Copyright (c) JFrog Ltd. 2026
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateInstallDocs } from './validate-install-docs.mjs';

function writeReadme(root, body) {
  writeFileSync(join(root, 'README.md'), body);
}

function withWebDoc(root) {
  mkdirSync(join(root, 'docs'), { recursive: true });
  writeFileSync(join(root, 'docs', 'install-jfrog-plugin-for-devin.md'), '# web doc\n');
}

test('validateInstallDocs passes when README has Verify and no other-plugin links', () => {
  const root = mkdtempSync(join(tmpdir(), 'devin-docs-'));
  writeReadme(root, '# Devin\n\n## Verify\n\n1. list plugins\n');
  withWebDoc(root);
  assert.deepEqual(validateInstallDocs({ repoRoot: root, harness: 'devin' }), []);
});

test('validateInstallDocs flags missing Verify section', () => {
  const root = mkdtempSync(join(tmpdir(), 'devin-docs-'));
  writeReadme(root, '# Devin\n\nInstall the plugin.\n');
  withWebDoc(root);
  const errors = validateInstallDocs({ repoRoot: root, harness: 'devin' });
  assert.ok(errors.some((e) => e.includes('## Verify')));
});

test('validateInstallDocs requires Devin web doc source file', () => {
  const root = mkdtempSync(join(tmpdir(), 'devin-docs-'));
  writeReadme(root, '# Devin\n\n## Verify\n');
  const errors = validateInstallDocs({ repoRoot: root, harness: 'devin' });
  assert.ok(errors.some((e) => e.includes('install-jfrog-plugin-for-devin.md')));
});

test('validateInstallDocs rejects contradictory failed-init env-var recovery claims', () => {
  const root = mkdtempSync(join(tmpdir(), 'devin-docs-'));
  writeReadme(
    root,
    '# x\n## Verify\nSetting environment variables after a failed init may repair MCP registration.'
  );
  withWebDoc(root);
  const errors = validateInstallDocs({ repoRoot: root, harness: 'devin' });
  assert.ok(errors.some((e) => e.includes('env vars repair failed init')));
});

test('validateInstallDocs rejects the legacy JFROG_URL env var', () => {
  const root = mkdtempSync(join(tmpdir(), 'devin-docs-'));
  writeReadme(root, '# Devin\n## Verify\nSet `JFROG_URL` to your platform.\n');
  withWebDoc(root);
  const errors = validateInstallDocs({ repoRoot: root, harness: 'devin' });
  assert.ok(errors.some((e) => e.includes('JFROG_URL')));
});

test('validateInstallDocs rejects links to other plugin GitHub repos', () => {
  const root = mkdtempSync(join(tmpdir(), 'devin-docs-'));
  writeReadme(
    root,
    '# Devin\n## Verify\nSee https://github.com/jfrog/claude-plugin/blob/main/docs/install-and-verify.md\n'
  );
  withWebDoc(root);
  const errors = validateInstallDocs({ repoRoot: root, harness: 'devin' });
  assert.ok(errors.some((e) => e.includes('claude-plugin')));
});

test('validateInstallDocs rejects Jira URLs and ticket keys', () => {
  const root = mkdtempSync(join(tmpdir(), 'devin-docs-'));
  const host = ['jfrog-int', 'atlassian', 'net'].join('.');
  const key = ['AX', '1780'].join('-');
  writeReadme(root, `# Devin\n## Verify\nSee [${key}](https://${host}/browse/${key}).\n`);
  withWebDoc(root);
  const errors = validateInstallDocs({ repoRoot: root, harness: 'devin' });
  assert.ok(errors.some((e) => e.includes('atlassian.net')));
  assert.ok(errors.some((e) => e.includes('Jira ticket keys')));
});
