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
        const leads = data.leads || [];
        
        const stats = {
            totalLeads: leads.length,
            cities: {},
            genders: {},
            sources: {},
            recentLeads: leads.slice(-10) // Last 10 leads
        };

        // Calculate statistics
        leads.forEach(lead => {
            // City stats
            stats.cities[lead.city] = (stats.cities[lead.city] || 0) + 1;
            
            // Gender stats
            stats.genders[lead.gender] = (stats.genders[lead.gender] || 0) + 1;
            
            // Source stats
            stats.sources[lead.source] = (stats.sources[lead.source] || 0) + 1;
        });

        res.json(stats);
    } catch (error) {
        console.error('Error calculating stats:', error);
        res.status(500).json({ error: 'Failed to calculate stats' });
    }
}; 