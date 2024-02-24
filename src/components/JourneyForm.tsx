import React, { useContext, useState } from "react";
import { station_list } from "../data/en/station_list";
import { JourneyContext } from "../context/JourneyContext";

const JourneyForm: React.FC = () => {
  const {
    origin,
    setOrigin,
    destination,
    setDestination,
    journeyType,
    setJourneyType,
  } = useContext(JourneyContext);

  const [localOrigin, setLocalOrigin] = useState(origin);
  const [localDestination, setLocalDestination] = useState(destination);
  const [localJourneyType, setLocalJourneyType] = useState('least-distance');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (localOrigin === localDestination) {
      alert("Origin and destination cannot be the same.");
      return;
    }
    setOrigin(localOrigin);
    setDestination(localDestination);
    setJourneyType(localJourneyType);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto px-4 py-2 flex flex-col space-y-4"
    >
      <div className="flex space-x-4 items-center">
        <div className="flex-1">
          <label
            htmlFor="origin"
            className="block text-sm font-medium text-gray-700"
          >
            Origin
          </label>
          <select
            id="origin"
            name="origin"
            value={localOrigin}
            onChange={(e) => setLocalOrigin(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Origin</option>
            {station_list.map((station) => (
              <option key={station.station_code} value={station.station_code}>
                {station.station_name}
              </option>
            ))}
          </select>
        </div>
        <div className="text-xl font-semibold"></div>
        <div className="flex-1">
          <label
            htmlFor="destination"
            className="block text-sm font-medium text-gray-700"
          >
            Destination
          </label>
          <select
            id="destination"
            name="destination"
            value={localDestination}
            onChange={(e) => setLocalDestination(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Destination</option>
            {station_list.map((station) => (
              <option key={station.station_code} value={station.station_code}>
                {station.station_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="text-center font-medium text-gray-700 mb-2">
        Route Type
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        <label>
          <input
            type="radio"
            name="journeyType"
            value="least-distance"
            checked={localJourneyType === 'least-distance'}
            onChange={(e) => setLocalJourneyType(e.target.value)}
          />
          Least Distance
        </label>
        <label>
          <input
            type="radio"
            name="journeyType"
            value="minimum-interchange"
            checked={localJourneyType === 'minimum-interchange'}
            onChange={(e) => setLocalJourneyType(e.target.value)}
          />
          Minimum Interchange
        </label>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default JourneyForm;
