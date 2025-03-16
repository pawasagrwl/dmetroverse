require('dotenv').config();

const express = require('express');
const cloudscraper = require('cloudscraper');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const fePort = process.env.FE_PORT;
const feUrl = process.env.FE_URL || ''; // default to empty string if not defined

// Optional: Configure CORS options if needed
const corsOptions = {
  origin: [`http://localhost:${fePort}`, feUrl],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Uncomment these if you wish to enable CORS or JSON parsing
// app.use(cors(corsOptions));
// app.use(express.json());

// Utility function to compute the current time in IST (without timezone info)
const getCurrentTimeInIST = () => {
  let now = new Date();
  now = new Date(now.getTime() + ((5 * 60 + 30) * 60000)); // Offset by 5 hours and 30 minutes
  return now.toISOString().split('Z')[0]; // Remove the 'Z' to make it naive
};

app.get('/', (req, res) => {
  res.redirect(`${feUrl}`);
});

// Middleware to validate incoming URL parameters for the dynamic route
const validateParams = (req, res, next) => {
  const { origin, destination, type } = req.params;
  if (!origin || !destination) {
    return res.status(400).send('Origin and destination parameters are required.');
  }
  if (type && !['least-distance', 'minimum-interchange'].includes(type)) {
    return res.status(400).send('Invalid type parameter.');
  }
  next();
};

// Create a persistent cookie jar so that Cloudflare clearance cookies persist across requests
const jar = cloudscraper.jar();

// Log incoming requests for debugging purposes
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  next();
});

// Endpoint to fetch data from the Delhi Metro Rail API using cloudscraper
app.get('/:origin/:destination/:type?', validateParams, async (req, res) => {
  const { origin, destination, type } = req.params;
  const routeType = type === 'mi' ? 'minimum-interchange' : 'least-distance';
  const currentTime = getCurrentTimeInIST();
  const apiEndpoint = `https://backend.delhimetrorail.com/api/v2/en/station_route/${origin}/${destination}/${routeType}/${currentTime}`;

  console.log(`Outgoing request to: ${apiEndpoint}`);

  try {
    const response = await cloudscraper({
      method: 'GET',
      url: apiEndpoint,
      jar, // use the persistent cookie jar for Cloudflare clearance cookies
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
        'Referer': 'https://www.delhimetrorail.com/',
        'Origin': 'https://www.delhimetrorail.com'
      },
    });
    console.log('Response received successfully');
    res.send(response);
  } catch (error) {
    console.error('Error during fetch:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// New /test route that uses node-fetch with current time + 50 minutes instead of a hardcoded time
app.get('/test', (req, res) => {
  const now = new Date();
  const futureTime = new Date(now.getTime() + 50 * 60000); // add 50 minutes
  // Format the time as ISO string without the trailing "Z"
  const isoTime = futureTime.toISOString().split('Z')[0];
  
  const apiUrl = `https://backend.delhimetrorail.com/api/v2/en/station_route/JIEE/SP/least-distance/${isoTime}`;
  console.log(`Fetching from /test endpoint with URL: ${apiUrl}`);
  
  fetch(apiUrl, {
    headers: {
      'Referer': 'https://www.delhimetrorail.com/',
      'Origin': 'https://www.delhimetrorail.com'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
    });
});

app.get("/reddit-posts", async (req, res) => {
  const url =
    "https://www.reddit.com/r/delhi/search.json?q=title:metro&restrict_sr=1&sort=new&limit=100";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching Reddit posts:", error);
    res.status(500).json({ error: "Failed to fetch Reddit posts" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
