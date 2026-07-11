import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveBackendOrigin } from './api.js';

test('replaces any Vite port on GitHub Codespaces hosts', () => {
  assert.equal(
    resolveBackendOrigin('octofit-5174.app.github.dev', ''),
    'https://octofit-8000.app.github.dev',
  );
});

test('uses the explicit codespace name when provided', () => {
  assert.equal(
    resolveBackendOrigin('ignored-5173.app.github.dev', 'my-codespace'),
    'https://my-codespace-8000.app.github.dev',
  );
});
