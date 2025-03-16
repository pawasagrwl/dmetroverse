import React from "react";
import { Paper } from "@mui/material";
import GalleryTitle from "./GalleryTitle";
import PostsGallery from "./PostsGallery";

const GalleryContainer: React.FC = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        margin: "10px auto", // Minimal margin to avoid touching other components
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
      <GalleryTitle />
      <PostsGallery />
    </Paper>
  );
};

export default GalleryContainer;
