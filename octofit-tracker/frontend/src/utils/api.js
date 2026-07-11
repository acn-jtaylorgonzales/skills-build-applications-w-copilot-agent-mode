export function buildApiUrl(path) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const host = codespaceName ? `${codespaceName}-8000.app.github.dev` : 'localhost';
  const protocol = codespaceName ? 'https' : 'http';
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const apiPath = normalizedPath.startsWith('/api') ? normalizedPath : `/api${normalizedPath}`;
  return `${protocol}://${host}${apiPath}`;
}
