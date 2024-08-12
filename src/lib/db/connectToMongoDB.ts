// Importing mongoose library along with Connection type from it
import mongoose, { Connection, ConnectOptions } from "mongoose";

const DB_URI = process.env.MONGO_DB_URI;
// const DB_URI = "mongodb://localhost:27017";
// const DB_URI = "mongodb://mongo:27017/todo_board";

console.log("=====", process.env.MONGO_DB_URI);

if (!DB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

// Declaring a variable to store the cached database connection
let cachedConnection: Connection | null = null;

// Function to establish a connection to MongoDB
export const connectToMongoDB = async (): Promise<Connection> => {
  // If a cached connection exists, return it
  if (cachedConnection) {
    console.log("Using cached db connection");
    return cachedConnection;
  }
  try {
    // If no cached connection exists, establish a new connection to MongoDB
    const cnx = await mongoose.connect(DB_URI);
    // Cache the connection for future use
    cachedConnection = cnx.connection;
    // Log message indicating a new MongoDB connection is established
    console.log("New mongodb connection established");
    // Return the newly established connection
    return cachedConnection;
  } catch (error) {
    // If an error occurs during connection, log the error and throw it
    console.log(error);
    throw error;
  }
};
