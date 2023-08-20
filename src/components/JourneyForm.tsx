import React, { useContext, useState } from "react";
import { station_list } from "../data/en/station_list";
import { JourneyContext } from "../context/JourneyContext";

const JourneyForm: React.FC = () => {
  const { origin, setOrigin, destination, setDestination } =
    useContext(JourneyContext);
  const [journeyType, setJourneyType] = useState("least-distance");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (origin === destination) {
      alert("Origin and destination cannot be the same.");
      return;
    }

    // Call the API with the origin and destination codes...
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex space-x-4 max-w-md mx-auto px-4 py-2"
    >
      <div>
        <label
          htmlFor="origin"
          className="block text-sm font-medium text-gray-700"
        >
          Origin
        </label>
        <select
          id="origin"
          name="origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {station_list.map((station) => (
            <option key={station.station_code} value={station.station_code}>
              {station.station_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="destination"
          className="block text-sm font-medium text-gray-700"
        >
          Destination
        </label>
        <select
          id="destination"
          name="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {station_list.map((station) => (
            <option key={station.station_code} value={station.station_code}>
              {station.station_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Journey Type
        </label>
        <div className="mt-1">
          <label>
            <input
              type="radio"
              name="journeyType"
              value="least-distance"
              checked={journeyType === "least-distance"}
              onChange={(e) => setJourneyType(e.target.value)}
            />
            Least Distance
          </label>
          <br/>
          <label>
            <input
              type="radio"
              name="journeyType"
              value="minimum-interchange"
              checked={journeyType === "minimum-interchange"}
              onChange={(e) => setJourneyType(e.target.value)}
            />
            Minimum Interchange
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default JourneyForm;
