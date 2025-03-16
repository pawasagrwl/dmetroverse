import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  const theme = useTheme();
  const isDarkMode = theme.mode === "dark";

  return (
    <Box
      component="footer"
      sx={{
        py: 1, // Padding Y-axis
        px: 2, // Padding X-axis
        mt: "auto", // Margin top auto for pushing it to the bottom of the layout
        backgroundColor: isDarkMode ? "grey.800" : "grey.100", // Background color changes with theme
        color: isDarkMode ? "grey.300" : "grey.800", // Text color changes with theme
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky", // Make the footer sticky
        bottom: 0, // Stick the footer to the bottom
        height: "auto", // Set height to auto for flexibility
        lineHeight: "normal", // Align text vertically in the center
        flexWrap: "wrap", // Allow flex items to wrap on smaller screens
      }}
    >
      <Link
        href="https://github.com/dmetroverse/dmetroverse-code"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          color: isDarkMode ? "blue.500" : "blue.700", // Adjusting link color based on theme
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        <GitHubIcon fontSize="small" sx={{ mr: 0.5 }} /> {/* Reduced icon size */}
      </Link>
      <Typography
        variant="body2"
        sx={{
          textAlign: "center", // Center the text
        }}
      >
        &copy; {new Date().getFullYear()} DMetroVerse
      </Typography>
    </Box>
  );
};

export default Footer;
