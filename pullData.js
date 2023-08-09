const axios = require("axios");
const fs = require("fs");
const path = require("path");

const API_BASE = "https://backend.delhimetrorail.com/api/v2/";

const LANGUAGES = ["en", "hi"];

// Function to write data to file
function writeDataToFile(endpointName, data, language) {
  let newFilePath = path.join(
    __dirname,
    "src",
    "data",
    `${language}`,
    `${endpointName}.ts`,
  );

  // Create directory if it does not exist
  let newFileDir = path.dirname(newFilePath);
  if (!fs.existsSync(newFileDir)) {
    fs.mkdirSync(newFileDir, { recursive: true });
  }

  let dataString = `export const ${endpointName} = ${JSON.stringify(data)};`;

  fs.writeFileSync(newFilePath, dataString);
}

function downloadStationDetails(station, language) {
  return axios
    .get(`${API_BASE}${language}/station/${station.station_code}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(
        `Failed to fetch station details for station code ${station.station_code} in ${language}: ${error.message}`,
      );
      return null;
    });
}

function downloadStationsByLine(line, language) {
  return axios
    .get(`${API_BASE}${language}/station_by_line/${line.line_code}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(
        `Failed to fetch station by line data for line code ${line.line_code} in ${language}: ${error.message}`,
      );
      return null;
    });
}

// Execute fetching and writing for both languages
LANGUAGES.forEach((language) => {
  axios
    .get(`${API_BASE}${language}/line_list`)
    .then((response) => {
      let linePromises = response.data.map((line) =>
        downloadStationsByLine(line, language).then((lineData) => {
          line.line_data = lineData; // Add line_data to line
          return line;
        }),
      );
      Promise.all(linePromises).then((linesData) => {
        let dataToWrite = linesData.filter((item) => item !== null);
        writeDataToFile("line_list", dataToWrite, language);
      });
    })
    .catch((error) => {
      console.error(
        `Failed to fetch line list data in ${language}: ${error.message}`,
      );
    });

  axios
    .get(`${API_BASE}${language}/station_list`)
    .then((response) => {
      let stationPromises = response.data.map((station) =>
        downloadStationDetails(station, language).then((stationData) => {
          station.station_data = stationData; // Add station_data to station
          return station;
        }),
      );
      Promise.all(stationPromises).then((stationsData) => {
        let dataToWrite = stationsData.filter((item) => item !== null);
        writeDataToFile("station_list", dataToWrite, language);
      });
    })
    .catch((error) => {
      console.error(
        `Failed to fetch station list data in ${language}: ${error.message}`,
      );
    });
});
