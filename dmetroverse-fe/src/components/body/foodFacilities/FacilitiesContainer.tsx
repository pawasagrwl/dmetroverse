import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import JourneyForm from "./JourneyForm";
import FoodFacilities from "./FoodFacilities";

const FacilitiesContainer: React.FC = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        margin: "10px auto", // Minimal margin to avoid touching the header
        padding: 1,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.7)", // This adds a dark semi-transparent background
        color: "white", // White text for contrast
        borderRadius: "4px", // Optional: Rounds the corners of the container
        border: "1px solid white", // Add border to create a lined box effect
        width: "95%", // Ensures the width is more uniform and reduces side space
        maxWidth: "600px", // Optional: Max width to maintain readability
      }}
    >
      <Typography
        variant="h6"
        component="h6"
        sx={{
          fontWeight: "bold",
          fontSize: "1.5rem", // Larger font size
          textShadow: "2px 2px 8px rgba(0,0,0,0.5)", // Text shadow for pop-out effect
          color: "primary.main",
        }}
      >
        Food Facilities Finder
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Select your origin and destination to find food facilities along your
        route.
      </Typography>
      <Box sx={{ width: "100%", maxWidth: "600px", mx: "auto" }}>
        <JourneyForm />

        <Box sx={{ width: "100%", mt: 2 }}>
          <FoodFacilities />
        </Box>
      </Box>
    </Paper>
  );
};

export default FacilitiesContainer;
