import React, { useState, useEffect, useContext } from "react";
import useFetch from "../common/hooks/useFetch";
import { StationData, RouteData } from "../common/types";
import StationFacilitiesWindow from "./StationFacilitiesWindow";
import { JourneyContext } from "../context/JourneyContext";

const FoodFacilities: React.FC = () => {
  const { origin, destination } = useContext(JourneyContext);

  const be_port = process.env.REACT_APP_BE_PORT ?? 3000;
  const be_url = process.env.REACT_APP_BE_URL ?? `http://localhost:${be_port}`;
  const apiURL = `${be_url}/KE/KG/`
  // const apiURL = `${be_url}/${origin}/${destination}/`

  const [stationsData, setStationsData] = useState<StationData[]>([]);
  const { response: routeData, error, isPending } = useFetch<RouteData>(apiURL);

  useEffect(() => {
    const fetchStationsData = async () => {
      if (routeData && routeData.route[0]["map-path"].length > 0) {
        const stationCodes: string[] = [];
        routeData.route[0]["map-path"].forEach((path: String) => {
          const [station1, station2] = path.split("-");
          if (!stationCodes.includes(station1)) stationCodes.push(station1);
          if (!stationCodes.includes(station2)) stationCodes.push(station2);
        });

        // Create an array to temporarily store station data
        const stationDataArr: StationData[] = [];

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
              facility.detail_list.some((detail: any) =>
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
        }

        // Call setStationsData once with all station data
        setStationsData(stationDataArr);
      }
    };
    fetchStationsData();
  }, [routeData]);

  if (isPending) return <div className="text-lg">Loading...</div>;
  if (error) return <div className="text-red-500 text-lg">Error: {error}</div>;
  if (!routeData || !routeData.route[0]["map-path"]) return null;

  return (
    <div>
      {origin && destination ? (
        <>
          <h2 className="text-2xl font-bold">Food Facilities:</h2>
          <StationFacilitiesWindow stations={stationsData} />
        </>
      ) : (
        <p className="text-lg">Please choose a journey.</p>
      )}
    </div>
  );
};

export default FoodFacilities;
