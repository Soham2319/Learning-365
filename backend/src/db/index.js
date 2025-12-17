import mongoose from "mongoose";
import { DB_NAME } from "../utils/constance.js";

const mongodbUri = process.env.MONGODB_URI;

export default async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${mongodbUri}/${DB_NAME}`);
        console.log(`\nMongoDB connected: ${connectionInstance.connection.host}`);
    } catch (e) {
        console.log(`Mongodb connection faild: ${e.message}`);
        process.exit();
    }
}
