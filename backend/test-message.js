const axios = require('axios');

// Test the /send-message endpoint
async function testSendMessage() {
  try {
    console.log('Testing /send-message endpoint...');
    
    const response = await axios.post('http://localhost:3001/send-message', {
      text: 'Test message from backend - ' + new Date().toISOString()
    });
    
    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
  }
}

// Test the health endpoint
async function testHealth() {
  try {
    console.log('Testing /health endpoint...');
    
    const response = await axios.get('http://localhost:3001/health');
    console.log('Health check:', response.data);
  } catch (error) {
    console.error('Health check failed:', error.message);
  }
}

async function runTests() {
  await testHealth();
  await testSendMessage();
}

runTests();