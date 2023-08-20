import React, { useState } from "react";
import FoodFacilities from "./FoodFacilities";
import RedditPostGallery from "./RedditPostGallery";
import JourneyForm from "./JourneyForm";
import { JourneyContext } from "../context/JourneyContext";

const Body: React.FC = () => {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [journeyType, setJourneyType] = useState<string>("");
  return (
    <div>
      <JourneyContext.Provider
        value={{ origin, setOrigin, destination, setDestination, journeyType, setJourneyType }}
      >
        <JourneyForm />
        <FoodFacilities />
      </JourneyContext.Provider>
      <RedditPostGallery />
    </div>
  );
};

export default Body;
