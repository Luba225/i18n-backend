"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectToDatabase() {
    try {
        await mongoose_1.default.connect('mongodb://localhost:27017/backend_db_2');
        console.log('🟢 Connected to MongoDB successful');
    }
    catch (error) {
        console.error('🔴 MongoDB connection error: ', error);
        process.exit(1);
    }
}
