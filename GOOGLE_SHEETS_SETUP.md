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
3. **Save the project** (Ctrl+S or Cmd+S)
4. **Name the project** "Nearlly Lead Capture API"

### Step 3: Set Up Your Spreadsheet Headers

1. **In the Apps Script editor**, run the `setupSheet` function:
   - Click on the function dropdown (top right)
   - Select `setupSheet`
   - Click the play button ▶️
2. **Check the execution log** to see if it worked
3. **Go back to your Google Sheet** - you should see headers now

### Step 4: Deploy the Script

1. **Click "Deploy"** → **"New deployment"**
2. **Choose type**: "Web app"
3. **Set up the deployment**:
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. **Click "Deploy"**
5. **Authorize the app** when prompted (click "Continue" and "Allow")
6. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/ABC123.../exec`)

### Step 5: Test the Integration

1. **Open `test-google-sheets.html`** in your browser
2. **Paste your Web App URL** in the input field
3. **Click "Test Submit to Google Sheets"**
4. **Check your Google Sheet** - you should see a new row with test data

### Step 6: Update Your Main Form

1. **Open `index-google-sheets.html`**
2. **Replace the script URL** on line 107:
   ```javascript
   const GOOGLE_SHEETS_URL = 'YOUR_ACTUAL_WEB_APP_URL_HERE';
   ```
3. **Save the file**

### Step 7: Deploy Your Updated Form

1. **Commit and push** the changes:
   ```bash
   git add .
   git commit -m "Update Google Sheets integration"
   git push
   ```

2. **Deploy to your hosting platform** (Vercel, Netlify, etc.)

## 🎯 What You'll Get

✅ **All form submissions** automatically added to Google Sheets  
✅ **Real-time data** - see leads as they come in  
✅ **Easy to export** and analyze data  
✅ **Professional setup** for Instagram ads  
✅ **Backup logging** to browser console  

## 📊 Your Google Sheet Will Have

| Timestamp | Name | Phone | City | Gender | Source | Original Timestamp |
|-----------|------|-------|------|--------|--------|-------------------|
| 2024-01-01 10:30:00 | John Doe | +91 1234567890 | Mumbai | male | instagram_ad | 2024-01-01T10:30:00.000Z |

## 🔧 Troubleshooting

### If the form doesn't submit to Google Sheets:

1. **Check the script URL** is correct and ends with `/exec`
2. **Verify the script is deployed** as a web app with "Anyone" access
3. **Check the browser console** for errors (F12 → Console)
4. **Test with the test page** first (`test-google-sheets.html`)

### If you get authorization errors:

1. **Make sure the script is deployed** with "Anyone" access
2. **Check that you authorized** the app when deploying
3. **Try redeploying** the script
4. **Clear browser cache** and try again

### If data doesn't appear in Google Sheets:

1. **Check the Apps Script execution log**:
   - Go to Apps Script editor
   - Click "Executions" in the left sidebar
   - Check for any errors
2. **Verify the spreadsheet is open** when testing
3. **Run the `setupSheet` function** again
4. **Check if the sheet name is "Leads"** or use the active sheet

### Common Error Messages:

- **"No spreadsheet found"**: Make sure you have a Google Sheet open
- **"Missing required fields"**: Check that all form fields are being sent
- **"Network Error"**: Check your internet connection and script URL
- **"CORS Error"**: This is normal for Google Apps Script, the form should still work

## 📱 For Instagram Ads

Once set up, use your form URL in Instagram ads. Every submission will automatically appear in your Google Sheet!

## 🎉 Benefits

- **No server needed** - Google handles everything
- **Free to use** - Google Sheets is free
- **Easy to access** - View data anywhere
- **Export options** - Download as CSV, Excel, etc.
- **Real-time updates** - See leads instantly
- **Mobile friendly** - Works on all devices

## 🔄 Alternative: Use the Test Page

If you're having trouble with the main form, you can use `test-google-sheets.html` as a temporary solution. It has better error handling and will help you debug any issues.

## 📞 Need Help?

1. **Check the browser console** for detailed error messages
2. **Use the test page** to isolate issues
3. **Verify each step** in the setup process
4. **Check the Apps Script execution logs** for backend errors 