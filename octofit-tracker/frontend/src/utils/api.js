export function buildApiUrl(path) {
  // Vite uses import.meta.env for browser-side environment variables.
  // Define VITE_CODESPACE_NAME in .env.local when running in GitHub Codespaces.
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const apiPath = normalizedPath.startsWith('/api') ? normalizedPath : `/api${normalizedPath}`;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev${apiPath}`;
  }

  // Safe fallback for local development so we never build https://undefined-8000...
  return `http://127.0.0.1:8000${apiPath}`;
}
