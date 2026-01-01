const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Environment variables validation
if (!process.env.BOT_TOKEN || !process.env.CHAT_ID) {
  console.error('Missing required environment variables: BOT_TOKEN and CHAT_ID');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Validation middleware for application
const validateApplication = (req, res, next) => {
  const { name, phone, region, quantity, product } = req.body;
  
  if (!name || !phone || !region || !quantity || !product) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required fields: name, phone, region, quantity, product' 
    });
  }
  
  if (!['Maravilla', 'Enrasadera', 'Ikkalasi'].includes(product)) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid product. Must be: Maravilla, Enrasadera, or Ikkalasi' 
    });
  }
  
  next();
};

// Validation middleware for send-message
const validateMessage = (req, res, next) => {
  const { text } = req.body;
  
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing or invalid text field' 
    });
  }
  
  next();
};

// Send Telegram message function with detailed error logging
const sendTelegramMessage = async (text, isApplication = false, applicationData = null) => {
  try {
    let telegramMessage;
    
    if (isApplication && applicationData) {
      const { name, phone, region, quantity, product, message } = applicationData;
      telegramMessage = `📝 Yangi ariza!

👤 Ism: ${name}
📞 Telefon: ${phone}
📍 Viloyat: ${region}
📦 Nihollar soni: ${quantity}
🍓 Nav: ${product}
💬 Xabar: ${message || "Yo'q"}`;
    } else {
      telegramMessage = text;
    }

    const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
    
    console.log('Sending message to Telegram:', {
      chat_id: process.env.CHAT_ID,
      message_length: telegramMessage.length,
      timestamp: new Date().toISOString()
    });
    
    const response = await axios.post(url, {
      chat_id: process.env.CHAT_ID,
      text: telegramMessage
    });
    
    console.log('Telegram API success response:', {
      ok: response.data.ok,
      message_id: response.data.result?.message_id,
      timestamp: new Date().toISOString()
    });
    
    return { success: true, data: response.data };
    
  } catch (error) {
    // Log full error details
    console.error('Telegram API Error Details:', {
      timestamp: new Date().toISOString(),
      error_message: error.message,
      response_status: error.response?.status,
      response_data: error.response?.data,
      request_config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      },
      full_error: error.toJSON ? error.toJSON() : error
    });
    
    // Return structured error
    const telegramError = error.response?.data?.description || error.message || 'Unknown Telegram API error';
    return { 
      success: false, 
      error: telegramError,
      error_code: error.response?.data?.error_code,
      status_code: error.response?.status
    };
  }
};

// Routes
app.post('/apply', validateApplication, async (req, res) => {
  try {
    const result = await sendTelegramMessage(null, true, req.body);
    
    if (result.success) {
      res.json({ success: true });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error,
        error_code: result.error_code
      });
    }
  } catch (error) {
    console.error('Unexpected error in /apply:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// New endpoint for sending custom messages
app.post('/send-message', validateMessage, async (req, res) => {
  try {
    const { text } = req.body;
    const result = await sendTelegramMessage(text, false);
    
    if (result.success) {
      res.json({ success: true });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error,
        error_code: result.error_code
      });
    }
  } catch (error) {
    console.error('Unexpected error in /send-message:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    port: PORT,
    env_check: {
      bot_token: !!process.env.BOT_TOKEN,
      chat_id: !!process.env.CHAT_ID
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment check:', {
    BOT_TOKEN: process.env.BOT_TOKEN ? 'Set' : 'Missing',
    CHAT_ID: process.env.CHAT_ID ? 'Set' : 'Missing',
    PORT: PORT
  });
});