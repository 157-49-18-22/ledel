import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database setup
let db;
(async () => {
    db = await open({
        filename: path.join(__dirname, 'database.sqlite'),
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS sections (
            id TEXT PRIMARY KEY,
            data TEXT
        )
    `);
    
    // Initialize default data if empty
    const count = await db.get('SELECT COUNT(*) as count FROM sections');
    if (count.count === 0) {
        console.log('Initializing default data...');
        // We'll populate this later or on first request
    }
})();

// Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Routes
app.get('/api/sections/:id', async (req, res) => {
    try {
        const section = await db.get('SELECT * FROM sections WHERE id = ?', req.params.id);
        if (section) {
            res.json(JSON.parse(section.data));
        } else {
            res.status(404).json({ error: 'Section not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/sections/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = JSON.stringify(req.body);
        await db.run(
            'INSERT OR REPLACE INTO sections (id, data) VALUES (?, ?)',
            id, data
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/sections/:id', async (req, res) => {
    try {
        await db.run('DELETE FROM sections WHERE id = ?', req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});

// Get all sections at once for initial load
app.get('/api/sections', async (req, res) => {
    try {
        const rows = await db.all('SELECT * FROM sections');
        const sections = {};
        rows.forEach(row => {
            sections[row.id] = JSON.parse(row.data);
        });
        res.json(sections);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
