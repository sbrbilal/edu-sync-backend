// Importing necessary modules for MongoDB connection and environment variable management
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Loading environment variables from a .env file
dotenv.config();

// Creating a new instance of MongoClient with the provided MongoDB connection URI
const client = new MongoClient(process.env.MONGODB_URI);

// Async function to establish a connection to the MongoDB database
const connectDB = async () => {
  try {
    // Attempting to connect to the MongoDB database
    await client.connect();

    // Returning the database instance for further use
    return client.db(process.env.DB_NAME);
  } catch (error) {
    // Handling errors in case the MongoDB connection fails
    console.error('MongoDB connection failed:', error.message);

    // Exiting the process with a non-zero status code to indicate failure
    process.exit(1);
  }
};

// Exporting the connectDB function to be used in other parts of the application
export default connectDB;
