import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useContent = (sectionId) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API_BASE}/sections/${sectionId}`);
                setData(res.data);
            } catch (err) {
                console.error(`Error fetching section ${sectionId}:`, err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sectionId]);

    // Helper to get image URL with base
    const getImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        // If it starts with /uploads, it's a legacy local file, otherwise just return as is or with prefix if needed
        if (path.startsWith('/uploads')) {
            const domain = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace('/api', '');
            return `${domain}${path}`;
        }
        return path;
    };

    return { data, loading, error, getImageUrl };
};
