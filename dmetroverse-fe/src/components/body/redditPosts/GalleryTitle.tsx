import React from "react";
import { Typography } from "@mui/material";

const GalleryTitle: React.FC = () => {
  return (
    <Typography
      variant="h6"
      component="h6"
      sx={{
        fontWeight: "bold",
        fontSize: "1.5rem", // Matches font size with FacilitiesContainer
        textShadow: "2px 2px 8px rgba(0,0,0,0.5)", // Text shadow for pop-out effect
        color: "primary.main",
        margin: 0, // Removed margin
        padding: "5px 0", // Adjusted padding to maintain spacing
      }}
    >
      Posts about Delhi Metro from <br></br>
      <a
        href="https://www.reddit.com/r/delhi"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "red", textDecoration: "none" }}
      >
        r/Delhi
      </a>
    </Typography>
  );
};

export default GalleryTitle;
