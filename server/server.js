import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api.js'; // Import other routes if you have them
import userRoutes from './routes/user.js'; // Import the user routes
import songRoutes from './routes/songs.js';
import { getConnectionPool } from './database.js';
import corsOptions from './config/corsOptions.js';

dotenv.config(); // Load environment variables

const app = express();
const port = 5001; // The port for the server

app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); // Middleware to parse incoming JSON requests

app.use('/api/users', userRoutes); // Register the users route
app.use('/api/songs', songRoutes); // Use /api/songs route for song operations

// Connect to the database
getConnectionPool().catch((err) => {
  console.error('Failed to connect to DB', err);
  process.exit(1); // Exit if the database connection fails
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});