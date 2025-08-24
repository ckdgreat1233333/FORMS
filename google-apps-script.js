// Google Apps Script for Nearlly Lead Capture Form
// This script handles form submissions and adds data to Google Sheets

function doPost(e) {
  try {
    // Get the form data
    const formData = e.parameter;
    
    // Get the active spreadsheet (you'll need to replace this with your sheet ID)
    const spreadsheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
    const sheet = spreadsheet.getSheetByName('Leads') || spreadsheet.getActiveSheet();
    
    // Prepare the data row
    const timestamp = new Date();
    const rowData = [
      timestamp,                    // Timestamp
      formData.name || '',          // Name
      formData.phone || '',         // Phone
      formData.city || '',          // City
      formData.gender || '',        // Gender
      formData.source || 'web_form', // Source
      formData.timestamp || ''      // Original timestamp
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (optional)
  return ContentService
    .createTextOutput('Nearlly Lead Capture API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Function to set up the spreadsheet headers (run this once)
function setupSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();
  
  // Set up headers
  const headers = [
    'Timestamp',
    'Name',
    'Phone',
    'City',
    'Gender',
    'Source',
    'Original Timestamp'
  ];
  
  // Clear existing data and set headers
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#4285f4')
    .setFontColor('white');
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
  
  console.log('Sheet setup complete!');
} 