import React, { useState } from "react";
import GalleryContainer from "./body/redditPosts/GalleryContainer";
import FacilitiesContainer from "./body/foodFacilities/FacilitiesContainer";
import { JourneyContext } from "../context/JourneyContext";

const Body: React.FC<{
  showFoodFacilities: boolean;
  showRedditPosts: boolean;
}> = ({ showFoodFacilities, showRedditPosts }) => {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [journeyType, setJourneyType] = useState<string>("");

  return (
    <div>
      <JourneyContext.Provider
        value={{
          origin,
          setOrigin,
          destination,
          setDestination,
          journeyType,
          setJourneyType,
        }}
      >
        {showFoodFacilities && <FacilitiesContainer />}
      </JourneyContext.Provider>
      {showRedditPosts && <GalleryContainer />}
    </div>
  );
};

export default Body;
