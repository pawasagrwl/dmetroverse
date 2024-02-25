import React, { useState } from "react";
import { useTheme as useAppTheme } from "../context/ThemeContext"; // Adjust the import path as necessary
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  MenuItem,
  Select,
  Box,
  Container,
  useMediaQuery,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useTheme } from "@mui/material/styles";
import { HeaderProps } from "../common/types";

const CustomToggleButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

// Apply the interface here
const Header: React.FC<HeaderProps> = ({
  setShowFoodFacilities,
  setShowRedditPosts,
  showFoodFacilities,
  showRedditPosts,
}) => {
  const [language, setLanguage] = useState("en");
  const { toggleTheme } = useAppTheme(); // Your ThemeContext hook
  const muiTheme = useTheme();
  const isDarkMode = muiTheme.palette.mode === "dark"; // Determine theme mode using MUI's theme
  const isLargeScreen = useMediaQuery(muiTheme.breakpoints.up("lg"));

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        backgroundColor: muiTheme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, display: isLargeScreen ? "none" : "flex" }}
            onClick={() => {
              /* Toggle sidebar logic here */
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", gap: 2 }}>
            {isLargeScreen && (
              <>
                <Button
                  color="inherit"
                  variant={showFoodFacilities ? "contained" : "outlined"}
                  onClick={() => setShowFoodFacilities(!showFoodFacilities)}
                >
                  Food Facilities
                </Button>
                <Button
                  color="inherit"
                  variant={showRedditPosts ? "contained" : "outlined"}
                  onClick={() => setShowRedditPosts(!showRedditPosts)}
                >
                  Reddit Posts
                </Button>
              </>
            )}
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            DMetroVerse
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              sx={{ mr: 2, minWidth: 120 }}
              size="small"
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="hi">Hindi</MenuItem>
              <MenuItem value="fr">French</MenuItem>
            </Select>
            <CustomToggleButton color="inherit" onClick={toggleTheme}>
              {isDarkMode ? <NightsStayIcon /> : <WbSunnyIcon />}
            </CustomToggleButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
