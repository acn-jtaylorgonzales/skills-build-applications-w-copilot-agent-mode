import { useEffect, useState } from 'react';
import { buildApiUrl, extractCollection } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const codespaceApiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
        const response = await fetch(import.meta.env.VITE_CODESPACE_NAME ? codespaceApiUrl : buildApiUrl('users'));
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const payload = await response.json();
        setUsers(extractCollection(payload, 'users'));
      } catch (err) {
        setError(err.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading users…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Users</h2>
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {users.map((user) => (
          <div key={user._id || user.id || user.email} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h6">{user.name || user.username || 'Unknown user'}</h3>
                <p className="mb-1"><strong>Email:</strong> {user.email || 'N/A'}</p>
                <p className="mb-1"><strong>Goal:</strong> {user.fitnessGoal || user.goal || 'N/A'}</p>
                <p className="mb-0"><strong>Level:</strong> {user.level || user.skillLevel || 'N/A'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Users;
