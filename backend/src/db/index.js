import mongoose from "mongoose";
import { DB_NAME } from "../utils/constance.js";

const mongodbUri = process.env.MONGODB_URI;

export default async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(mongodbUri, {
            dbName: DB_NAME,
        });

        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (e) {
        console.error("MongoDB connection failed:", e.message);
        process.exit(1);
    }
}
