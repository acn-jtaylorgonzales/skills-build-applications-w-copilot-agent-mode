"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            models_1.UserModel.deleteMany({}),
            models_1.TeamModel.deleteMany({}),
            models_1.ActivityModel.deleteMany({}),
            models_1.LeaderboardModel.deleteMany({}),
            models_1.WorkoutModel.deleteMany({}),
        ]);
        const users = await models_1.UserModel.insertMany([
            { name: 'Avery Chen', email: 'avery@example.com', fitnessGoal: 'Marathon prep', level: 'Intermediate' },
            { name: 'Jordan Lee', email: 'jordan@example.com', fitnessGoal: 'Strength gain', level: 'Advanced' },
            { name: 'Sam Rivera', email: 'sam@example.com', fitnessGoal: 'Weight loss', level: 'Beginner' },
        ]);
        const teams = await models_1.TeamModel.insertMany([
            { name: 'Rocket Squad', sport: 'Running', captain: users[0]._id, members: [users[0]._id, users[1]._id] },
            { name: 'Peak Performance', sport: 'CrossFit', captain: users[2]._id, members: [users[2]._id, users[1]._id] },
        ]);
        await models_1.ActivityModel.insertMany([
            { user: users[0]._id, type: 'Run', durationMinutes: 45, distanceKm: 8.4, calories: 520 },
            { user: users[1]._id, type: 'Strength', durationMinutes: 60, distanceKm: 0, calories: 480 },
            { user: users[2]._id, type: 'Yoga', durationMinutes: 30, distanceKm: 0, calories: 220 },
        ]);
        await models_1.LeaderboardModel.insertMany([
            { user: users[0]._id, points: 1420, streak: 6 },
            { user: users[1]._id, points: 1380, streak: 4 },
            { user: users[2]._id, points: 1210, streak: 3 },
        ]);
        await models_1.WorkoutModel.insertMany([
            { name: 'HIIT Burst', category: 'Cardio', durationMinutes: 25, difficulty: 'Intermediate', equipment: ['mat'] },
            { name: 'Core Strength', category: 'Strength', durationMinutes: 35, difficulty: 'Beginner', equipment: ['dumbbells'] },
            { name: 'Trail Recovery', category: 'Recovery', durationMinutes: 20, difficulty: 'Beginner', equipment: ['foam roller'] },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
