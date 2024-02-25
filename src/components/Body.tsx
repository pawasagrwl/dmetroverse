import React, { useState } from "react";
import FoodFacilities from "./foodFacilities/FoodFacilities";
import RedditPostGallery from "./redditPosts/RedditPostGallery";
import JourneyForm from "./foodFacilities/JourneyForm";
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
          {showFoodFacilities && (
            <>
              <JourneyForm />
              <FoodFacilities />
            </>
          )}
        </JourneyContext.Provider>
      </div>
      {showRedditPosts && <RedditPostGallery />}
    </div>
  );
};

export default Body;
