"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModel = exports.LeaderboardModel = exports.ActivityModel = exports.TeamModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessGoal: { type: String, required: true },
    level: { type: String, required: true },
}, { timestamps: true });
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    sport: { type: String, required: true },
    captain: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
const activitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
}, { timestamps: true });
const leaderboardSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true },
    streak: { type: Number, default: 0 },
}, { timestamps: true });
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    equipment: [{ type: String }],
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
exports.TeamModel = (0, mongoose_1.model)('Team', teamSchema);
exports.ActivityModel = (0, mongoose_1.model)('Activity', activitySchema);
exports.LeaderboardModel = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
exports.WorkoutModel = (0, mongoose_1.model)('Workout', workoutSchema);
