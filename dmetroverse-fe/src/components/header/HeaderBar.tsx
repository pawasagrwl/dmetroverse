import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  ButtonBase,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ThemeToggler from "./ThemeToggler";
import FeatureToggleButton from "./FeatureToggler";

interface HeaderBarProps {
  handleDrawerToggle: () => void;
  setShowFoodFacilities: (show: boolean) => void;
  setShowRedditPosts: (show: boolean) => void;
  showFoodFacilities: boolean;
  showRedditPosts: boolean;
  toggleTheme: () => void;
  mode: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  handleDrawerToggle,
  setShowFoodFacilities,
  setShowRedditPosts,
  showFoodFacilities,
  showRedditPosts,
  toggleTheme,
  mode,
}) => {
  const muiTheme = useTheme();
  const isLargeScreen = useMediaQuery(muiTheme.breakpoints.up("lg"));

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <DirectionsTransitIcon sx={{ mr: 2 }} />
          </Box>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontWeight: "bold",
              background:
                "linear-gradient(90deg, #0000FF, #008000, #FFFF00, #FFA500, #FF0000, #EE82EE, #FF00FF, #FFC0CB)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            DMetroVerse
          </Typography>

          {isLargeScreen ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ButtonBase
                onClick={() => setShowFoodFacilities(!showFoodFacilities)}
                sx={{ width: "100%" }}
              >
                <FeatureToggleButton
                  icon={<FastfoodIcon />}
                  tooltip={
                    showFoodFacilities
                      ? "Hide Food Facilities"
                      : "Show Food Facilities"
                  }
                  active={showFoodFacilities}
                />
              </ButtonBase>
              <ButtonBase
                onClick={() => setShowRedditPosts(!showRedditPosts)}
                sx={{ width: "100%" }}
              >
                <FeatureToggleButton
                  icon={<PostAddIcon />}
                  tooltip={
                    showRedditPosts ? "Hide Reddit Posts" : "Show Reddit Posts"
                  }
                  active={showRedditPosts}
                />
              </ButtonBase>
              <ButtonBase onClick={toggleTheme} sx={{ width: "100%" }}>
                <ThemeToggler mode={mode} />
              </ButtonBase>
            </Box>
          ) : (
            <IconButton
              size="large"
              edge="end"
              aria-label="menu"
              sx={{ ml: 2, display: { xs: "flex", lg: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderBar;
