// Google Apps Script for Nearlly Lead Capture Form
// This script handles form submissions and adds data to Google Sheets

function doPost(e) {
  try {
    console.log('Received POST request');
    console.log('Request parameters:', e.parameter);
    
    // Get the form data
    const formData = e.parameter;
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.city || !formData.gender) {
      console.log('Missing required fields');
      return ContentService
        .createTextOutput(JSON.stringify({ 
          'result': 'error', 
          'error': 'Missing required fields',
          'received': formData 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the active spreadsheet (you'll need to replace this with your sheet ID)
    // For now, let's use the active spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      console.log('No active spreadsheet found');
      return ContentService
        .createTextOutput(JSON.stringify({ 
          'result': 'error', 
          'error': 'No spreadsheet found. Please set up the spreadsheet first.' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
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
    
    console.log('Adding row data:', rowData);
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    console.log('Successfully added data to sheet');
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'success',
        'message': 'Data added successfully',
        'timestamp': timestamp.toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'error', 
        'error': error.toString(),
        'stack': error.stack
      }))
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
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      console.log('No active spreadsheet found. Please open a Google Sheet first.');
      return;
    }
    
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
    console.log('Spreadsheet ID:', spreadsheet.getId());
    console.log('Spreadsheet URL:', spreadsheet.getUrl());
    
  } catch (error) {
    console.error('Error setting up sheet:', error);
  }
}

// Function to test the API
function testAPI() {
  try {
    const testData = {
      name: 'Test User',
      phone: '+91 1234567890',
      city: 'Mumbai',
      gender: 'male',
      source: 'test_api',
      timestamp: new Date().toISOString()
    };
    
    console.log('Testing API with data:', testData);
    
    // Simulate a POST request
    const mockEvent = {
      parameter: testData
    };
    
    const result = doPost(mockEvent);
    console.log('Test result:', result.getContent());
    
  } catch (error) {
    console.error('Test failed:', error);
  }
} 