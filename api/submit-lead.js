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

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        await initializeDataFile();

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
        res.status(200).json({ 
            success: true, 
            message: 'Lead captured successfully',
            leadId: lead.id
        });

    } catch (error) {
        console.error('Error processing lead submission:', error);
        res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
}; 