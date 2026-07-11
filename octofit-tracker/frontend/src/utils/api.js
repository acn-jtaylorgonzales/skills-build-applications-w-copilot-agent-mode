export function resolveBackendOrigin(hostname, codespaceName) {
  const trimmedCodespace = codespaceName?.trim();

  if (trimmedCodespace) {
    return `https://${trimmedCodespace}-8000.app.github.dev`;
  }

  if (hostname?.includes('.app.github.dev')) {
    return `https://${hostname.replace(/-(\d+)(?=\.app\.github\.dev)/, '-8000')}`;
  }

  if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1' && hostname !== '0.0.0.0') {
    return `http://${hostname}:8000`;
  }

  return 'http://127.0.0.1:8000';
}

export function buildApiUrl(path) {
  // Vite uses import.meta.env for browser-side environment variables.
  // Define VITE_CODESPACE_NAME in .env.local when running in GitHub Codespaces.
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const apiPath = normalizedPath.startsWith('/api') ? normalizedPath : `/api${normalizedPath}`;
  const slashSuffixedPath = apiPath.endsWith('/') ? apiPath : `${apiPath}/`;

  if (typeof window !== 'undefined') {
    const origin = resolveBackendOrigin(window.location.hostname, codespaceName);
    return `${origin}${slashSuffixedPath}`;
  }

  return `${resolveBackendOrigin('', codespaceName)}${slashSuffixedPath}`;
}

export function extractCollection(payload, fallbackKey) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.results)) {
      return payload.results;
    }

    if (Array.isArray(payload.items)) {
      return payload.items;
    }

    if (Array.isArray(payload[fallbackKey])) {
      return payload[fallbackKey];
    }

    if (Array.isArray(payload.data)) {
      return payload.data;
    }
  }

  return [];
}
