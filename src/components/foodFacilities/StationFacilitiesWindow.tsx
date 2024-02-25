import React from "react";
import StationFacilities from "./StationFacilities";
import { StationData } from "../../common/types";

interface StationFacilitiesWindowProps {
  stations: StationData[][];
}

const StationFacilitiesWindow: React.FC<StationFacilitiesWindowProps> = ({
  stations,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      {" "}
      {/* Update this class */}
      {stations.map((line: StationData[], index: number) => (
        <div key={index} className="stations-window">
          <div className="flex flex-nowrap space-x-4">
            {line.map((station: StationData, idx: number) => (
              <StationFacilities key={idx} station={station} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StationFacilitiesWindow;
