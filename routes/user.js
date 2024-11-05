import express from 'express';
import sql from 'mssql'; // Microsoft SQL Server client for Node.js

const router = express.Router();

// GET /api/users - Retrieve all users
router.get('/', async (req, res) => {
  try {
    const request = new Request();
    request.query('SELECT * FROM [dbo].[User]', async (err, result) => {
      res.status(200).json(result.recordset); // Return the result recordset as JSON
    })
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;