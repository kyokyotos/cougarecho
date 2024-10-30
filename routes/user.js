import express from 'express';
import { getConnectionPool } from '../database.js'; // Import the database connection function
import sql from 'mssql'; // Microsoft SQL Server client for Node.js

const router = express.Router();

// GET /api/users - Retrieve all users
router.get('/', async (req, res) => {
  try {
    const pool = await getConnectionPool(); // Get a connection pool
    const result = await pool.request().query('SELECT * FROM [dbo].[User]'); // Execute query to get all users
    res.status(200).json(result.recordset); // Return the result recordset as JSON
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;