import React, { useState, useEffect, useContext } from "react";
import useFetch from "../../common/hooks/useFetch";
import { StationData, RouteData } from "../../common/types";
import StationFacilitiesWindow from "./StationFacilitiesWindow";
import { JourneyContext } from "../../context/JourneyContext";

const FoodFacilities: React.FC = () => {
  const { origin, destination, journeyType  } = useContext(JourneyContext);
  
  const be_port = process.env.REACT_APP_BE_PORT ?? 3000;
  const be_url = process.env.REACT_APP_BE_URL ?? `http://localhost:${be_port}`;
  const apiURL =
    (origin && destination) && (origin !== destination)
      ? `${be_url}/${origin}/${destination}/${journeyType}`
      : "";

  const [stationsData, setStationsData] = useState<StationData[][]>([]);
  const [isDone, setIsDone] = useState(false);
  const { response: routeData, error, isPending } = useFetch<RouteData>(apiURL);
  useEffect(() => {
    const fetchStationsData = async () => {
      const allMapPathsData: StationData[][] = [];
      setIsDone(false)
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
          }
          allMapPathsData.push(stationDataArr);
        }
      }
      setStationsData(allMapPathsData);
      setIsDone(true)
    };
    fetchStationsData();
  }, [routeData]);

  if (isPending || !isDone) return <div className="text-lg">Loading Food Facilities...</div>;
  if (error) return <div className="text-red-500 text-lg">Error: {error}</div>;
  if (!routeData || !routeData.route[0]["map-path"]) return <div className="text-lg">Please choose a journey</div>;

  return (
    <div>
      {(origin && destination)? (
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
