import React from "react";
import { Facility, StationData } from "../common/types";

interface StationFacilitiesProps {
  station: StationData;
}

const StationFacilities: React.FC<StationFacilitiesProps> = ({ station }) => (
  <div className="station-card bg-blue-200 rounded-lg p-4 m-4 flex flex-col">
    <h3
      className={`text-xl font-bold ${
        station.facilities.length === 0 ? "text-red-500" : "text-green-500"
      }`}
    >
      {station.stationName}
    </h3>
    <div className="overflow-y-auto flex-grow">
      {" "}
      {/* Update this class */}
      {station.facilities.length > 0
        ? station.facilities.flatMap((facility: Facility, facilityIndex) =>
            facility.detail_list.map((detail, index) => (
              <div key={index} style={{ whiteSpace: "nowrap" }}>
                <strong>
                  {detail.facility_name}
                </strong>
                <div className="flex flex-wrap">
                  <strong>Purpose: </strong> {detail.purpose || "Not Found"}
                </div>
                <div className="flex flex-row flex-wrap">
                  <strong>Location: </strong>{" "}
                  {detail.location_description || "Not Found"}
                </div>
                <br />
              </div>
            ))
          )
        : "No food facilities found"}
    </div>
  </div>
);
export default StationFacilities;
