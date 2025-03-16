require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cloudscraper = require("cloudscraper");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const feUrl = process.env.FE_URL || "";

// Configure CORS
app.use(
  cors({
    origin: [feUrl, `http://localhost:${process.env.FE_PORT || 3000}`],
    credentials: true,
  })
);
app.use(express.json());

// Serve static files (for the HTML page)
app.use(express.static(path.join(__dirname, "views")));

// Utility: Get current time in IST (without timezone info)
const getCurrentTimeInIST = () =>
  new Date(Date.now() + (5 * 60 + 30) * 60000).toISOString().split("Z")[0];

// Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Root Redirect
app.get("/", (_, res) => res.redirect(feUrl));

// Metro Route API
app.get('/:origin/:destination/:type?', async (req, res) => {
  const { origin, destination, type } = req.params;
  if (!origin || !destination) return res.status(400).json({ error: 'Origin and destination are required.' });

  const routeType = type === 'mi' ? 'minimum-interchange' : 'least-distance';
  const apiEndpoint = `https://backend.delhimetrorail.com/api/v2/en/station_route/${origin}/${destination}/${routeType}/${getCurrentTimeInIST()}`;

  console.log(`Fetching Metro Route: ${apiEndpoint}`);

  try {
    const response = await fetch(apiEndpoint, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://www.delhimetrorail.com/',
        'Origin': 'https://www.delhimetrorail.com',
        'Accept': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Metro API Response Received');
    res.json(data);

  } catch (error) {
    console.error('❌ Metro API Fetch Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch metro data' });
  }
});


// Reddit Posts API
app.get("/reddit-posts", async (_, res) => {
  const redditApi =
    "https://www.reddit.com/r/delhi/search.json?q=title:metro&restrict_sr=1&sort=new&limit=100";

  try {
    const response = await fetch(redditApi);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    res.json(await response.json());
  } catch (error) {
    console.error("Reddit API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch Reddit posts" });
  }
});

// Test Endpoint (Future Time Handling)
app.get("/test", async (_, res) => {
  const futureTime = new Date(Date.now() + 50 * 60000)
    .toISOString()
    .split("Z")[0];
  const apiUrl = `https://backend.delhimetrorail.com/api/v2/en/station_route/JIEE/SP/least-distance/${futureTime}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Referer: "https://www.delhimetrorail.com/",
        Origin: "https://www.delhimetrorail.com",
      },
    });
    res.json(await response.json());
  } catch (error) {
    console.error("Test API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch test data" });
  }
});

// Serve /main as an HTML page
app.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "main.html"));
});

// Start Server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
