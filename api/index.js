const fs = require('fs-extra');
const path = require('path');

// Data file path for Vercel
const dataFilePath = path.join(process.cwd(), 'leads.json');

// Initialize data file if it doesn't exist
async function initializeDataFile() {
    try {
        const exists = await fs.pathExists(dataFilePath);
        if (!exists) {
            await fs.writeJson(dataFilePath, { leads: [] });
            console.log('Created leads.json file');
        }
    } catch (error) {
        console.error('Error initializing data file:', error);
    }
}

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        await initializeDataFile();

        // Handle different API routes based on the request path
        const url = new URL(req.url, `http://${req.headers.host}`);
        const pathname = url.pathname;

        console.log('Request pathname:', pathname);
        console.log('Request method:', req.method);

        // Handle different API routes
        if (pathname === '/api/submit-lead' && req.method === 'POST') {
            // Handle lead submission
            const { name, phone, city, gender, timestamp, source } = req.body;

            // Validate required fields
            if (!name || !phone || !city || !gender) {
                return res.status(400).json({ 
                    error: 'Missing required fields' 
                });
            }

            // Create lead object
            const lead = {
                id: Date.now().toString(),
                name: name.trim(),
                phone: phone.trim(),
                city: city.trim(),
                gender: gender.trim(),
                timestamp: timestamp || new Date().toISOString(),
                source: source || 'web_form',
                submittedAt: new Date().toISOString()
            };

            // Read existing data
            let data = { leads: [] };
            try {
                data = await fs.readJson(dataFilePath);
            } catch (error) {
                console.log('No existing data file, starting fresh');
            }

            // Add new lead
            data.leads.push(lead);

            // Write back to file
            await fs.writeJson(dataFilePath, data, { spaces: 2 });

            console.log('New lead captured:', lead);

            // Send success response
            return res.status(200).json({ 
                success: true, 
                message: 'Lead captured successfully',
                leadId: lead.id
            });

        } else if (pathname === '/api/leads' && req.method === 'GET') {
            // Handle getting all leads
            const data = await fs.readJson(dataFilePath);
            return res.json(data);

        } else if (pathname === '/api/stats' && req.method === 'GET') {
            // Handle getting statistics
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

            return res.json(stats);

        } else {
            // Handle unknown routes
            return res.status(404).json({ 
                error: 'API endpoint not found',
                pathname: pathname,
                method: req.method
            });
        }

    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            details: error.message
        });
    }
}; 