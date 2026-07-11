"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME?.trim();
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', baseUrl });
});
app.get('/api/users', async (_req, res) => {
    try {
        const users = await models_1.UserModel.find().lean();
        res.json({ message: 'Users route', endpoint: '/api/users', baseUrl, users });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load users', error });
    }
});
app.post('/api/users', async (req, res) => {
    try {
        const user = await models_1.UserModel.create(req.body);
        res.status(201).json({ message: 'User created', data: user, baseUrl });
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create user', error });
    }
});
app.get('/api/teams', async (_req, res) => {
    try {
        const teams = await models_1.TeamModel.find().populate('captain').populate('members').lean();
        res.json({ message: 'Teams route', endpoint: '/api/teams', baseUrl, teams });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load teams', error });
    }
});
app.post('/api/teams', async (req, res) => {
    try {
        const team = await models_1.TeamModel.create(req.body);
        res.status(201).json({ message: 'Team created', data: team, baseUrl });
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create team', error });
    }
});
app.get('/api/activities', async (_req, res) => {
    try {
        const activities = await models_1.ActivityModel.find().populate('user').lean();
        res.json({ message: 'Activities route', endpoint: '/api/activities', baseUrl, activities });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load activities', error });
    }
});
app.post('/api/activities', async (req, res) => {
    try {
        const activity = await models_1.ActivityModel.create(req.body);
        res.status(201).json({ message: 'Activity logged', data: activity, baseUrl });
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to log activity', error });
    }
});
app.get('/api/leaderboard', async (_req, res) => {
    try {
        const leaderboard = await models_1.LeaderboardModel.find().populate('user').lean();
        res.json({ message: 'Leaderboard route', endpoint: '/api/leaderboard', baseUrl, leaderboard });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load leaderboard', error });
    }
});
app.get('/api/workouts', async (_req, res) => {
    try {
        const workouts = await models_1.WorkoutModel.find().lean();
        res.json({ message: 'Workouts route', endpoint: '/api/workouts', baseUrl, workouts });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load workouts', error });
    }
});
app.post('/api/workouts', async (req, res) => {
    try {
        const workout = await models_1.WorkoutModel.create(req.body);
        res.status(201).json({ message: 'Workout suggestion created', data: workout, baseUrl });
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create workout', error });
    }
});
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
});
