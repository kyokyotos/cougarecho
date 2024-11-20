import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getConnectionPool } from './database.js';
import corsOptions from './config/corsOptions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const port = process.env.PORT || 8080;
const local_bool = process.env.NODE_ENV !== 'production';

const app = express();

if (!local_bool) {
    app.enable('trust proxy');
} else {
    app.use(cors(corsOptions));
}

app.use(express.json());
app.use('/api', apiRoutes);

if (!local_bool) {
    // Serve static files
    app.use(express.static(path.join(__dirname, 'client', 'dist')));
    
    // Handle all routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
    });
}

// Connect to the database
getConnectionPool().catch((err) => {
    console.error('Failed to connect to DB', err);
    process.exit(1);
});

// For Vercel, we export the app instead of listening
if (process.env.NODE_ENV === 'production') {
    export default app;
} else {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}