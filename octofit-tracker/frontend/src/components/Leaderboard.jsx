import { useEffect, useState } from 'react';
import { buildApiUrl, extractCollection } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const codespaceApiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
        const response = await fetch(import.meta.env.VITE_CODESPACE_NAME ? codespaceApiUrl : buildApiUrl('leaderboard'));
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const payload = await response.json();
        setEntries(extractCollection(payload, 'leaderboard'));
      } catch (err) {
        setError(err.message || 'Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading leaderboard…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <div className="list-group">
        {entries.map((entry, index) => (
          <div key={entry._id || entry.userId || `${entry.name}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-bold">#{index + 1} {entry.name || entry.userName || 'Anonymous'}</div>
              <div className="text-muted small">Score: {entry.score || entry.totalPoints || 0}</div>
            </div>
            <span className="badge bg-primary rounded-pill">{entry.badge || 'Active'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
