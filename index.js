// Importing necessary modules and dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.js';
import loggerMiddleware from './middleware/logger.js';

// Loading environment variables from a .env file
dotenv.config();

// Creating an instance of Express
const app = express();

// Setting the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Enabling Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: true
  })
);

// Applying the loggerMiddleware for logging incoming requests
app.use(loggerMiddleware);

// Parsing incoming JSON requests
app.use(express.json());

// Serving static files from the 'public' directory
app.use(express.static('public'));

// Routing API requests through the defined router
app.use('/api', router);

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
