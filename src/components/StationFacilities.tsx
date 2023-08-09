import React from 'react';
import { Facility, StationData } from '../common/types';

interface StationFacilitiesProps {
  station: StationData;
}

const StationFacilities: React.FC<StationFacilitiesProps> = ({ station }) => (
  <div className="station-card bg-blue-200 rounded-lg p-4 m-4">
    <h3 className="text-xl font-bold">{station.stationName}</h3>
    <ul className="list-disc ml-5">
      {station.facilities.map((facility: Facility, index: number) => (
        <li key={index}>{facility.kind}</li>
      ))}
    </ul>
  </div>
);

export default StationFacilities;
