import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://Moise1:Moussa%4075%23%2A@cluster1.ec73eu8.mongodb.net/fgvej?retryWrites=true&w=majority&appName=Cluster1";

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return mongoose.connection;
  }

  try {
    console.log("Attempting to connect to MongoDB...");

    const conn = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });

    isConnected = true;
    console.log("MongoDB connection established successfully");

    return conn.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return null;
  }
}
