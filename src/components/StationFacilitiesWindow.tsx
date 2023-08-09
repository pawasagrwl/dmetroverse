import React from "react";
import StationFacilities from "./StationFacilities";
import { StationData } from "../common/types";

interface StationFacilitiesWindowProps {
  stations: StationData[];
}

const StationFacilitiesWindow: React.FC<StationFacilitiesWindowProps> = ({
  stations,
}) => {
  console.log(stations);
  return (
    <div className="stations-window flex flex-nowrap overflow-x-auto space-x-4">
      {stations.map((station: StationData, index: number) => (
        <StationFacilities key={index} station={station} />
      ))}
    </div>
  );
};

export default StationFacilitiesWindow;
