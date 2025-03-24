import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env");
}

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to MongoDB - Database: ${conn.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
