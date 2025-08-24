const fs = require('fs-extra');
const path = require('path');

// Data file path for Vercel
const dataFilePath = path.join(process.cwd(), 'leads.json');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const data = await fs.readJson(dataFilePath);
        res.json(data);
    } catch (error) {
        console.error('Error reading leads:', error);
        res.status(500).json({ error: 'Failed to read leads' });
    }
}; 