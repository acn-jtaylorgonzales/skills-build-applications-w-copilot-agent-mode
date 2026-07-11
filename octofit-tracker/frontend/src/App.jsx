import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';
import logo from '../../../docs/octofitapp-small.png';

const navItems = [
  { to: '/', label: 'Overview', end: true },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function Dashboard() {
  return (
    <div>
      <div className="card hero-card shadow-sm border-0 mb-4">
        <div className="card-body p-4 p-md-5">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div>
              <p className="text-uppercase fw-semibold text-primary mb-2">OctoFit Tracker</p>
              <h1 className="display-6 fw-bold mb-3">A polished view into your fitness community.</h1>
              <p className="lead text-muted mb-0">
                Explore members, teams, logged activities, and workout ideas from one dashboard.
              </p>
            </div>
            <img src={logo} alt="OctoFit tracker logo" className="hero-logo" />
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-3">
        {navItems.slice(1).map((item) => (
          <div key={item.to} className="col">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h2 className="h5">{item.label}</h2>
                <p className="text-muted mb-3">Browse the latest data for {item.label.toLowerCase()}.</p>
                <NavLink className="btn btn-outline-primary" to={item.to}>
                  Open {item.label}
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <main className="container py-4 py-md-5">
      <div className="card shadow-sm border-0 app-shell">
        <div className="card-body p-4 p-md-5">
          <header className="mb-4">
            <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
              <div>
                <p className="text-uppercase fw-semibold text-primary mb-1">OctoFit Tracker</p>
                <h1 className="h3 mb-0">Fitness tracking for modern teams</h1>
              </div>
              <nav className="nav nav-pills flex-wrap">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    end={item.end}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    to={item.to}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
