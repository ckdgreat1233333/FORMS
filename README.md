# Nearlly Lead Capture System

A complete lead capture system with a beautiful form interface and backend data storage. Perfect for Instagram ads and other marketing campaigns.

## Features

- 🎨 **Beautiful UI**: Modern, responsive design with Tailwind CSS
- 📱 **Mobile Optimized**: Works perfectly on all devices
- 💾 **Data Storage**: Backend API with JSON file storage
- 📊 **Admin Dashboard**: View leads and statistics
- 🔒 **Form Validation**: Client-side validation with error handling
- 📈 **Real-time Stats**: Live statistics and lead tracking

## Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Access the application**
   - Main form: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin.html
   - API endpoints:
     - View all leads: http://localhost:3000/api/leads
     - View statistics: http://localhost:3000/api/stats

## File Structure

```
├── index.html          # Main lead capture form
├── admin.html          # Admin dashboard
├── api/index.js        # API handler (Vercel serverless)
├── package.json        # Dependencies
├── leads.json          # Data storage (created automatically)
└── README.md           # This file
```

## API Endpoints

### POST /api/submit-lead
Submit a new lead
```json
{
  "name": "John Doe",
  "phone": "+91 1234567890",
  "city": "Mumbai",
  "gender": "male",
  "source": "instagram_ad"
}
```

### GET /api/leads
Get all captured leads

### GET /api/stats
Get lead statistics

## Deployment Options

### Option 1: Local Development
Perfect for testing and development
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Option 2: Heroku Deployment
1. Create a Heroku account
2. Install Heroku CLI
3. Run these commands:
   ```bash
   heroku create your-app-name
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

### Option 3: Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Option 4: Netlify Deployment
1. Create a `netlify.toml` file:
   ```toml
   [build]
     command = "npm start"
     publish = "."
   
   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/api/:splat"
     status = 200
   ```

## Customization

### Adding New Cities
Edit the `datalist` in `index.html`:
```html
<datalist id="cities-list">
    <option value="Your City"></option>
    <!-- Add more cities here -->
</datalist>
```

### Changing Form Fields
Modify the form in `index.html` and update the validation in both frontend and backend.

### Styling
The form uses Tailwind CSS. You can customize colors, fonts, and layout by modifying the CSS classes.

## Data Storage

Leads are stored in `leads.json` with the following structure:
```json
{
  "leads": [
    {
      "id": "1234567890",
      "name": "John Doe",
      "phone": "+91 1234567890",
      "city": "Mumbai",
      "gender": "male",
      "timestamp": "2024-01-01T00:00:00.000Z",
      "source": "instagram_ad",
      "submittedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## Security Considerations

- The current setup is for prototyping
- For production, consider:
  - Adding authentication to admin dashboard
  - Using a proper database (MongoDB, PostgreSQL)
  - Implementing rate limiting
  - Adding HTTPS
  - Input sanitization and validation

## Troubleshooting

### Port Already in Use
If port 3000 is busy, change it in `server.js`:
```javascript
const PORT = process.env.PORT || 3001;  // Change to 3001 or another port
```

### CORS Issues
The server includes CORS middleware. If you're still having issues, check your browser's developer console.

### Data Not Saving
Ensure the `leads.json` file is writable and the server has proper permissions.

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure the server is running
4. Check file permissions

## License

MIT License - feel free to use this for your projects!

---

**Latest Update**: Simplified API structure for better Vercel compatibility 