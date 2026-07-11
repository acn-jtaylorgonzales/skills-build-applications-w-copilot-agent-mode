export function buildApiUrl(path) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const apiPath = normalizedPath.startsWith('/api') ? normalizedPath : `/api${normalizedPath}`;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev${apiPath}`;
  }

  return `http://127.0.0.1:8000${apiPath}`;
}
