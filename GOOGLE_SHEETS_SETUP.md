# 🚀 Google Sheets Integration Setup Guide

## Step-by-Step Instructions to Connect Your Form to Google Sheets

### Step 1: Create a Google Sheet

1. **Go to [sheets.google.com](https://sheets.google.com)**
2. **Click "Blank"** to create a new spreadsheet
3. **Name it** "Nearlly Lead Capture" or something similar
4. **Copy the Spreadsheet ID** from the URL:
   - URL looks like: `https://docs.google.com/spreadsheets/d/1ABC123.../edit`
   - Copy the ID: `1ABC123...` (the long string between `/d/` and `/edit`)

### Step 2: Set Up Google Apps Script

1. **In your Google Sheet**, go to **Extensions → Apps Script**
2. **Delete the default code** and paste the code from `google-apps-script.js`
3. **Replace `YOUR_SPREADSHEET_ID`** with your actual spreadsheet ID
4. **Save the project** (Ctrl+S or Cmd+S)
5. **Name the project** "Nearlly Lead Capture API"

### Step 3: Deploy the Script

1. **Click "Deploy"** → **"New deployment"**
2. **Choose type**: "Web app"
3. **Set up the deployment**:
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. **Click "Deploy"**
5. **Authorize the app** when prompted
6. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/ABC123.../exec`)

### Step 4: Set Up Your Spreadsheet

1. **Go back to your Google Sheet**
2. **Go to Extensions → Apps Script**
3. **Run the `setupSheet` function**:
   - Click on the function dropdown
   - Select `setupSheet`
   - Click the play button
4. **This will create headers** and format your sheet

### Step 5: Update Your Form

1. **Open `index-google-sheets.html`**
2. **Replace `YOUR_SCRIPT_ID`** with your actual script ID from the Web App URL
3. **The line should look like**:
   ```javascript
   const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec';
   ```

### Step 6: Deploy the Updated Form

1. **Commit and push** the changes:
   ```bash
   git add index-google-sheets.html
   git commit -m "Add Google Sheets integration"
   git push
   ```

2. **Deploy to Vercel**:
   ```bash
   npx vercel --prod --force
   ```

## 🎯 What You'll Get

✅ **All form submissions** automatically added to Google Sheets
✅ **Real-time data** - see leads as they come in
✅ **Easy to export** and analyze data
✅ **Backup logging** to browser console
✅ **Professional setup** for Instagram ads

## 📊 Your Google Sheet Will Have

| Timestamp | Name | Phone | City | Gender | Source | Original Timestamp |
|-----------|------|-------|------|--------|--------|-------------------|
| 2024-01-01 10:30:00 | John Doe | +91 1234567890 | Mumbai | male | instagram_ad | 2024-01-01T10:30:00.000Z |

## 🔧 Troubleshooting

### If the form doesn't submit to Google Sheets:
1. **Check the script URL** is correct
2. **Verify the script is deployed** as a web app
3. **Check the browser console** for errors
4. **The form will still work** with console logging as backup

### If you get authorization errors:
1. **Make sure the script is deployed** with "Anyone" access
2. **Check that you authorized** the app when deploying
3. **Try redeploying** the script

## 📱 For Instagram Ads

Once set up, use your form URL in Instagram ads. Every submission will automatically appear in your Google Sheet!

## 🎉 Benefits

- **No server needed** - Google handles everything
- **Free to use** - Google Sheets is free
- **Easy to access** - View data anywhere
- **Export options** - Download as CSV, Excel, etc.
- **Real-time updates** - See leads instantly 