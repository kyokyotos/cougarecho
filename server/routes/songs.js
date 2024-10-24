import express from 'express';
import { getConnectionPool } from '../database.js'; // Import the database connection
import sql from 'mssql';

const router = express.Router();


router.get('/', async (req, res) => {
    const { keyword = '' } = req.query;
  
    try {
      const pool = await getConnectionPool(); // Get a connection pool
      const result = await pool.request()
        .input('keyword', sql.NVarChar, `%${keyword}%`) // Use keyword with wildcards
        .query(`
          SELECT 
            s.song_id, 
            s.song_name, 
            s.duration, 
            s.plays, 
            s.created_at, 
            s.isAvailable, 
            a.album_name, 
            u.display_name AS artist_name, -- Fetch artist's display name from User table
            g.genre_name 
          FROM [dbo].[Song] s
          JOIN [dbo].[Artist] ar ON s.artist_id = ar.artist_id
          JOIN [dbo].[User] u ON ar.user_id = u.user_id -- Join Artist with User to get artist's name
          JOIN [dbo].[Album] a ON s.album_id = a.album_id
          LEFT JOIN [dbo].[Genre] g ON s.genre_id = g.genre_id
          WHERE s.song_name LIKE @keyword
        `); // Search for songs with the keyword, joining related tables to get artist, album, and genre names
  
      res.status(200).json(result.recordset); // Return the matching songs
    } catch (error) {
      console.error('Error fetching songs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

export default router;
