const express = require("express");
const fetch = require("node-fetch"); // for Telegram API
require('dotenv').config(); // Load environment variables
const app = express();

// Enable CORS for all origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json()); // parse JSON bodies

app.get("/", (req, res) => {
  res.send("Server is running! Visit /ping to test the backend.");
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

const PORT = process.env.PORT;  // dynamic port assigned by Render
const HOST = '0.0.0.0';         // must bind to all interfaces

// Environment validation
console.log("Environment check:", { BOT_TOKEN: process.env.BOT_TOKEN, CHAT_ID: process.env.CHAT_ID });

app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});