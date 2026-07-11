import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(buildApiUrl('leaderboard'));
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.results || payload.leaderboard || [];
        setEntries(items);
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
