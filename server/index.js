import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';

dotenv.config({ path: './server/.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors({
    origin: ['https://ledel.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());

// Multer for temporary file handling in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes

// Get a specific section
app.get('/api/sections/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('sections')
            .select('data')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                console.log(`Section ${id} not found in DB, returning empty.`);
                return res.status(404).json({ error: 'Section not found' });
            }
            console.error('Supabase GET Error:', error);
            throw error;
        }

        res.json(typeof data.data === 'string' ? JSON.parse(data.data) : data.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update or Create a section
app.post('/api/sections/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sectionData = req.body;

        const { error } = await supabase
            .from('sections')
            .upsert({ id, data: sectionData });

        if (error) {
            console.error('Supabase UPSERT Error:', error);
            throw error;
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a section
app.delete('/api/sections/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('sections')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch all sections
app.get('/api/sections', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('sections')
            .select('*');

        if (error) throw error;

        const sections = {};
        data.forEach(row => {
            sections[row.id] = typeof row.data === 'string' ? JSON.parse(row.data) : row.data;
        });
        res.json(sections);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Upload image to Supabase Storage
app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const file = req.file;
        const fileName = `${Date.now()}-${file.originalname}`;
        
        console.log(`Attempting to upload ${fileName} to Supabase...`);

        // Upload to Supabase Storage bucket named 'images'
        const { data, error } = await supabase.storage
            .from('images')
            .upload(fileName, file.buffer, {
                contentType: file.mimetype,
                upsert: false
            });

        if (error) {
            console.error('Supabase Storage Upload Error:', error);
            return res.status(500).json({ error: error.message, details: error });
        }

        // Get Public URL
        const { data: publicUrlData } = supabase.storage
            .from('images')
            .getPublicUrl(fileName);

        console.log('Upload successful! Public URL:', publicUrlData.publicUrl);
        res.json({ imageUrl: publicUrlData.publicUrl });
    } catch (err) {
        console.error('Global Upload Error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running with Supabase on port ${PORT}`);
});
