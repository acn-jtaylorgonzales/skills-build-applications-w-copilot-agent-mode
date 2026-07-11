import { useEffect, useState } from 'react';
import { buildApiUrl, extractCollection } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const codespaceApiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        const response = await fetch(import.meta.env.VITE_CODESPACE_NAME ? codespaceApiUrl : buildApiUrl('workouts'));
        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }
        const payload = await response.json();
        setWorkouts(extractCollection(payload, 'workouts'));
      } catch (err) {
        setError(err.message || 'Failed to load workouts');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading workouts…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Workouts</h2>
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {workouts.map((workout) => (
          <div key={workout._id || workout.id || workout.name} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h6">{workout.name || 'Workout'}</h3>
                <p className="mb-1"><strong>Focus:</strong> {workout.focus || 'N/A'}</p>
                <p className="mb-1"><strong>Duration:</strong> {workout.durationMinutes || workout.duration || 'N/A'} min</p>
                <p className="mb-0"><strong>Difficulty:</strong> {workout.difficulty || 'N/A'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
