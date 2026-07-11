import { useEffect, useState } from 'react';
import { buildApiUrl, extractCollection } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(buildApiUrl('teams'));
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }
        const payload = await response.json();
        setTeams(extractCollection(payload, 'teams'));
      } catch (err) {
        setError(err.message || 'Failed to load teams');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading teams…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Teams</h2>
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {teams.map((team) => (
          <div key={team._id || team.id || team.name} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h6">{team.name || 'Unnamed team'}</h3>
                <p className="mb-1"><strong>Sport:</strong> {team.sport || 'N/A'}</p>
                <p className="mb-0"><strong>Members:</strong> {team.members?.length || team.memberCount || 0}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
