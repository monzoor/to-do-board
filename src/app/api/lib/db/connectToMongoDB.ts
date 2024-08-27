import mongoose, { Connection, ConnectOptions } from "mongoose";
import { ErrorHandler } from "../../utils";

const DB_URI = process.env.MONGO_DB_URI;

if (!DB_URI) {
  throw new Error(
    "Please define the MONGO_DB_URI environment variable inside .env.local",
  );
}

let cachedConnection: Connection | null = null;

export const connectToMongoDB = async (): Promise<void> => {
  if (cachedConnection) {
    console.log("Using cached db connection");
    return;
  }

  try {
    const options: ConnectOptions = {}; // Add any additional options if needed
    await mongoose.connect(DB_URI, options);
    cachedConnection = mongoose.connection;
    console.log("New MongoDB connection established");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new ErrorHandler("DB connection fail", 500);
  }
};
