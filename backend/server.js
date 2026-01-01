const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // for Telegram API
require('dotenv').config(); // Load environment variables
const app = express();

// ✅ SIMPLE & PERMISSIVE CORS
app.use(cors({
  origin: '*', // Allow ALL origins temporarily
  credentials: false, // Set to false when origin is '*'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());

// Handle preflight OPTIONS requests for specific route
app.options('/send-message', cors());

// Add request logging to see what's coming
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Origin:', req.headers.origin);
  console.log('User-Agent:', req.headers['user-agent']?.substring(0, 50));
  next();
});

app.get("/", (req, res) => {
  res.send("Server is running! Visit /ping to test the backend.");
});

// Health check endpoint (Render monitors this)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    backend: 'running',
    timestamp: new Date().toISOString(),
    service: 'oltin-rejalari-backend',
    environment: process.env.NODE_ENV || 'development',
    cors: 'enabled',
    allowedOrigins: 'all (*)',
    env: {
      hasBotToken: !!process.env.BOT_TOKEN,
      hasChatId: !!process.env.CHAT_ID,
      port: process.env.PORT || 10000
    }
  });
});

// Test Telegram connection
app.get("/test-telegram", async (req, res) => {
  try {
    const testResponse = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getMe`
    );
    const data = await testResponse.json();
    
    res.json({
      telegramConnection: data.ok ? "✅ Connected" : "❌ Failed",
      botName: data.result?.first_name,
      error: data.description
    });
  } catch (error) {
    res.json({
      telegramConnection: "❌ Failed",
      error: error.message
    });
  }
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
  console.log("📨 Telegram request received from:", req.headers.origin);
  console.log("📨 [BACKEND] Request received:", {
    body: req.body,
    hasText: !!req.body?.text,
    textLength: req.body?.text?.length || 0,
    timestamp: new Date().toISOString()
  });

  // CRITICAL: Check if text exists
  if (!req.body?.text?.trim()) {
    console.error("❌ [BACKEND] Empty message text received");
    return res.status(400).json({ 
      success: false, 
      error: "Message text is empty" 
    });
  }

  // CRITICAL: Check environment variables
  if (!process.env.BOT_TOKEN || !process.env.CHAT_ID) {
    console.error("❌ [BACKEND] Missing environment variables:", {
      hasBotToken: !!process.env.BOT_TOKEN,
      hasChatId: !!process.env.CHAT_ID
    });
    return res.status(500).json({ 
      success: false, 
      error: "Server configuration error" 
    });
  }

  try {
    console.log("📤 [BACKEND] Sending to Telegram API...");
    
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text: req.body.text,
          parse_mode: "HTML"  // Changed from Markdown for better formatting
        })
      }
    );

    const telegramData = await telegramResponse.json();
    
    console.log("📩 [BACKEND] Telegram API response:", {
      ok: telegramData.ok,
      description: telegramData.description,
      errorCode: telegramData.error_code
    });

    if (!telegramData.ok) {
      // SPECIFIC ERROR HANDLING
      let userError = "Telegram xabar yuborilmadi";
      
      if (telegramData.error_code === 404) {
        userError = "Bot token noto'g'ri (404)";
      } else if (telegramData.error_code === 400) {
        userError = "Chat topilmadi yoki bot bloklangan";
      } else if (telegramData.description?.includes("chat not found")) {
        userError = "Chat ID noto'g'ri";
      }
      
      throw new Error(userError);
    }

    console.log("✅ [BACKEND] Telegram message sent successfully!");
    res.json({ success: true });

  } catch (err) {
    console.error("💥 [BACKEND] Telegram error details:", {
      message: err.message,
      stack: err.stack,
      tokenPreview: process.env.BOT_TOKEN ? 
        process.env.BOT_TOKEN.substring(0, 10) + "..." : 
        "MISSING"
    });
    
    res.status(500).json({ 
      success: false, 
      error: err.message || "Telegram xabar yuborilmadi"
    });
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