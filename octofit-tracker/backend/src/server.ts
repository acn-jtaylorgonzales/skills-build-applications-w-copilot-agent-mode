import express, { Request, Response } from 'express';
import './config/database';
import { ActivityModel, LeaderboardModel, TeamModel, UserModel, WorkoutModel } from './models';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME?.trim();
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', baseUrl });
});

app.get('/api/users', async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find().lean();
    res.json({ message: 'Users route', endpoint: '/api/users', baseUrl, users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load users', error });
  }
});

app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json({ message: 'User created', data: user, baseUrl });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create user', error });
  }
});

app.get('/api/teams', async (_req: Request, res: Response) => {
  try {
    const teams = await TeamModel.find().populate('captain').populate('members').lean();
    res.json({ message: 'Teams route', endpoint: '/api/teams', baseUrl, teams });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load teams', error });
  }
});

app.post('/api/teams', async (req: Request, res: Response) => {
  try {
    const team = await TeamModel.create(req.body);
    res.status(201).json({ message: 'Team created', data: team, baseUrl });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create team', error });
  }
});

app.get('/api/activities', async (_req: Request, res: Response) => {
  try {
    const activities = await ActivityModel.find().populate('user').lean();
    res.json({ message: 'Activities route', endpoint: '/api/activities', baseUrl, activities });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load activities', error });
  }
});

app.post('/api/activities', async (req: Request, res: Response) => {
  try {
    const activity = await ActivityModel.create(req.body);
    res.status(201).json({ message: 'Activity logged', data: activity, baseUrl });
  } catch (error) {
    res.status(400).json({ message: 'Failed to log activity', error });
  }
});

app.get('/api/leaderboard', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await LeaderboardModel.find().populate('user').lean();
    res.json({ message: 'Leaderboard route', endpoint: '/api/leaderboard', baseUrl, leaderboard });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load leaderboard', error });
  }
});

app.get('/api/workouts', async (_req: Request, res: Response) => {
  try {
    const workouts = await WorkoutModel.find().lean();
    res.json({ message: 'Workouts route', endpoint: '/api/workouts', baseUrl, workouts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load workouts', error });
  }
});

app.post('/api/workouts', async (req: Request, res: Response) => {
  try {
    const workout = await WorkoutModel.create(req.body);
    res.status(201).json({ message: 'Workout suggestion created', data: workout, baseUrl });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create workout', error });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  console.log(`API base URL: ${baseUrl}`);
});
