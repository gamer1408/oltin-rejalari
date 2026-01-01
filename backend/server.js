const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Validation middleware
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

// Send Telegram message
const sendTelegramMessage = async (data) => {
  const { name, phone, region, quantity, product, message } = data;
  
  const telegramMessage = `📝 Yangi ariza!

👤 Ism: ${name}
📞 Telefon: ${phone}
📍 Viloyat: ${region}
📦 Nihollar soni: ${quantity}
🍓 Nav: ${product}
💬 Xabar: ${message || "Yo'q"}`;

  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
  
  await axios.post(url, {
    chat_id: process.env.CHAT_ID,
    text: telegramMessage
  });
};

// Routes
app.post('/apply', validateApplication, async (req, res) => {
  try {
    await sendTelegramMessage(req.body);
    res.json({ success: true });
  } catch (error) {
    console.error('Telegram error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send notification' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});