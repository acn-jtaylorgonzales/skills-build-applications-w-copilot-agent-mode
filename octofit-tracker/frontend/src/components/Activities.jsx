import { useEffect, useState } from 'react';
import { buildApiUrl, extractCollection } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(buildApiUrl('activities'));
        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }
        const payload = await response.json();
        setActivities(extractCollection(payload, 'activities'));
      } catch (err) {
        setError(err.message || 'Failed to load activities');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading activities…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Activities</h2>
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {activities.map((activity) => (
          <div key={activity._id || activity.id || activity.type} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h6">{activity.type || 'Activity'}</h3>
                <p className="mb-1"><strong>Duration:</strong> {activity.durationMinutes || activity.duration || 'N/A'} min</p>
                <p className="mb-1"><strong>Distance:</strong> {activity.distanceKm || activity.distance || 0} km</p>
                <p className="mb-0"><strong>Calories:</strong> {activity.calories || 0}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;
