import React, { useState, useEffect, useContext } from "react";
import useFetch from "../../../common/hooks/useFetch";
import { StationData, RouteData } from "../../../common/types";
import StationFacilitiesWindow from "./StationFacilitiesWindow";
import { JourneyContext } from "../../../context/JourneyContext";
import { Typography, Paper, Box, CircularProgress } from "@mui/material";

const FoodFacilities: React.FC = () => {
  const { origin, destination, journeyType } = useContext(JourneyContext);

  const be_port = process.env.REACT_APP_BE_PORT ?? 3000;
  const be_url = process.env.REACT_APP_BE_URL ?? `http://localhost:${be_port}`;
  const apiURL =
    origin && destination && origin !== destination
      ? `${be_url}/${origin}/${destination}/${journeyType}`
      : "";

  const [stationsData, setStationsData] = useState<StationData[][]>([]);
  const [isDone, setIsDone] = useState(false);
  const { response: routeData, error, isPending } = useFetch<RouteData>(apiURL);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const fetchStationsData = async () => {
      const allMapPathsData: StationData[][] = [];
      setIsDone(false);
      setLoadingProgress(0);
      if (routeData && routeData.route.length > 0) {
        for (const routeObj of routeData.route) {
          const stationCodesSet: Set<string> = new Set();
          routeObj["map-path"].forEach((path: string) => {
            const [station1, station2] = path.split("-");
            stationCodesSet.add(station1);
            stationCodesSet.add(station2);
          });

          const stationCodes = Array.from(stationCodesSet);
          const stationDataArr: StationData[] = [];
          const totalStations = stationCodes.length;
          let stationsFetched = 0;

          // Fetch each station's data
          for (const stationCode of stationCodes) {
            const stationResponse = await fetch(
              `https://backend.delhimetrorail.com/api/v2/en/station/${stationCode}`
            );

            if (!stationResponse.ok) {
              throw new Error(`HTTP error! status: ${stationResponse.status}`);
            }

            const stationData = await stationResponse.json();
            const foodFacilities = stationData.stations_facilities.filter(
              (facility: any) =>
                facility.detail_list.some(
                  (detail: any) =>
                    detail.purpose &&
                    ["coffee", "snacks", "eatables"].some((item) =>
                      detail.purpose.toLowerCase().includes(item)
                    )
                )
            );
            stationDataArr.push({
              stationCode: stationCode,
              stationName: stationData.station_name,
              facilities: foodFacilities,
            });
            // Update progress
            stationsFetched += 1;
            setLoadingProgress((prevProgress) => {
              const newProgress = (stationsFetched / totalStations) * 100;
              return Math.max(prevProgress, newProgress);
            });
          }
          allMapPathsData.push(stationDataArr);
        }
      }
      setStationsData(allMapPathsData);
      setIsDone(true);
    };
    if (apiURL) {
      // Only start fetching if there is a valid URL
      fetchStationsData();
    }
  }, [routeData, apiURL]);

  if (error)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  if (!routeData || !routeData.route[0]["map-path"]) return <></>;
  if (isPending || !isDone)
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress variant="determinate" value={loadingProgress} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading Food Facilities... {loadingProgress.toFixed(0)}%
        </Typography>
      </Box>
    );
  return (
    <Box sx={{ width: "100%", maxWidth: "600px", mx: "auto" }}>
      <Paper
        elevation={3}
        sx={{
          margin: 0,
          padding: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.7)", // This adds a dark semi-transparent background
          color: "white", // White text for contrast
          borderRadius: "4px", // Optional: Rounds the corners of the container
        }}
      >
        {origin && destination ? (
          <StationFacilitiesWindow stations={stationsData} />
        ) : (
          <Typography>Please choose a journey.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default FoodFacilities;
