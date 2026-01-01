const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // for Telegram API
require('dotenv').config(); // Load environment variables
const app = express();

// ✅ PRODUCTION CORS CONFIG
const allowedOrigins = [
  'http://localhost:3000',  // Local development
  'https://oltin-rejalari.onrender.com',  // Your frontend URL
  'https://oltin-rejalari.vercel.app',    // Alternative frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,  // Allow cookies/sessions
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // parse JSON bodies

app.get("/", (req, res) => {
  res.send("Server is running! Visit /ping to test the backend.");
});

// Health check endpoint (Render monitors this)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'oltin-rejalari-backend',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test endpoint to verify connection
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Backend is connected!',
    frontend: req.get('origin') || 'Unknown',
    time: new Date().toISOString()
  });
});

app.get("/ping", (req, res) => {
  console.log("Ping received from frontend!");
  res.json({ success: true, message: "Backend reachable" });
});

app.post("/send-message", async (req, res) => {
  console.log("Request received:", req.body);
  try {
    const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: process.env.CHAT_ID, text: req.body.text })
    });
    const data = await response.json();
    if (!data.ok) {
      console.error("Telegram API error:", data);
      throw new Error(data.description);
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Telegram error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ FIX PORT BINDING (CRITICAL FOR RENDER)
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';  // '0.0.0.0' allows external connections

// Environment validation
console.log("Environment check:", { BOT_TOKEN: process.env.BOT_TOKEN, CHAT_ID: process.env.CHAT_ID });

app.listen(PORT, HOST, () => {
  console.log(`✅ Backend running on port ${PORT}`);
  console.log(`🌍 Accessible at: http://${HOST}:${PORT}`);
});