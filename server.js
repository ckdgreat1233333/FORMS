const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// Data file path
const dataFilePath = path.join(__dirname, 'leads.json');

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

// API endpoint to handle form submissions
app.post('/api/submit-lead', async (req, res) => {
    try {
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
});

// API endpoint to view all leads (for admin purposes)
app.get('/api/leads', async (req, res) => {
    try {
        const data = await fs.readJson(dataFilePath);
        res.json(data);
    } catch (error) {
        console.error('Error reading leads:', error);
        res.status(500).json({ error: 'Failed to read leads' });
    }
});

// API endpoint to get lead statistics
app.get('/api/stats', async (req, res) => {
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
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
async function startServer() {
    await initializeDataFile();
    
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📊 View leads: http://localhost:${PORT}/api/leads`);
        console.log(`📈 View stats: http://localhost:${PORT}/api/stats`);
    });
}

// For Vercel serverless deployment
if (process.env.NODE_ENV !== 'production') {
    startServer().catch(console.error);
}

// Initialize data file for Vercel
initializeDataFile().catch(console.error);

// Export for Vercel
module.exports = app; 