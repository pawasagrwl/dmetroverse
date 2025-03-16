require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const fePort = process.env.FE_PORT;
const feUrl = process.env.FE_URL; // Default to an empty string if FE_PATH is not defined

// Configure CORS options dynamically
const corsOptions = {
  origin: [`http://localhost:${fePort}`, feUrl],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// app.use(cors(corsOptions));
// app.use(express.json());

// Utility function to calculate the current time in IST and remove timezone info
const getCurrentTimeInIST = () => {
  let now = new Date();
  now = new Date(now.getTime() + (5 * 60 + 30) * 60000); // Offset by 5 hours and 30 minutes
  return now.toISOString().split('Z')[0]; // Remove 'Z' to make it naive
};

app.get('/', (req, res) => {
  res.redirect(`${feUrl}`);
});

// Validate parameters before proceeding
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

// app.get('/:origin/:destination/:type?', validateParams, async (req, res) => {
//   const { origin, destination, type } = req.params;
//   const routeType = type === 'mi' ? 'minimum-interchange' : 'least-distance';
//   const currentTime = getCurrentTimeInIST();
//   const apiEndpoint = `https://backend.delhimetrorail.com/api/v2/en/station_route/${origin}/${destination}/${routeType}/${currentTime}`;

//   try {
//     const response = await fetch(apiEndpoint, {
//       headers: {
//         Referer: 'https://www.delhimetrorail.com/',
//         Origin: 'https://www.delhimetrorail.com',
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch data: ${response.statusText}`);
//     }

//     const data = await response.text();
//     res.send(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

const cloudscraper = require('cloudscraper');

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  next();
});

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
      headers: {
        Referer: 'https://www.delhimetrorail.com/',
        Origin: 'https://www.delhimetrorail.com',
      },
    });

    console.log('Response received successfully');
    res.send(response); // Send the fetched data to the client
  } catch (error) {
    console.error('Error during fetch:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

