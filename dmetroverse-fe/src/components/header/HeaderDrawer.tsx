import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ButtonBase,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ThemeToggler from "./ThemeToggler";
import FeatureToggleButton from "./FeatureToggler";

interface HeaderDrawerProps {
  handleDrawerToggle: () => void;
  setShowFoodFacilities: (show: boolean) => void;
  setShowRedditPosts: (show: boolean) => void;
  toggleTheme: () => void;
  showFoodFacilities: boolean;
  showRedditPosts: boolean;
  mode: string;
}

const HeaderDrawer: React.FC<HeaderDrawerProps> = ({
  handleDrawerToggle,
  setShowFoodFacilities,
  setShowRedditPosts,
  showFoodFacilities,
  showRedditPosts,
  toggleTheme,
  mode,
}) => {
  return (
    <Box sx={{ width: "auto", padding: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 0.5,
          ml: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "1rem" }}>
          Options
        </Typography>
        <IconButton size="small" onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <List sx={{ padding: 0 }}>
        <ButtonBase
          onClick={() => setShowFoodFacilities(!showFoodFacilities)}
          sx={{ width: "100%", display: "flex", justifyContent: "flex-start" }}
        >
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              padding: "6px 16px",
            }}
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
            <Typography sx={{ ml: 1 }}>
              {showFoodFacilities
                ? "Hide Food Facilities"
                : "Show Food Facilities"}
            </Typography>
          </ListItem>
        </ButtonBase>
        <ButtonBase
          onClick={() => setShowRedditPosts(!showRedditPosts)}
          sx={{ width: "100%", display: "flex", justifyContent: "flex-start" }}
        >
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              padding: "6px 16px",
            }}
          >
            <FeatureToggleButton
              icon={<PostAddIcon />}
              tooltip={
                showRedditPosts ? "Hide Reddit Posts" : "Show Reddit Posts"
              }
              active={showRedditPosts}
            />
            <Typography sx={{ ml: 1 }}>
              {showRedditPosts ? "Hide Reddit Posts" : "Show Reddit Posts"}
            </Typography>
          </ListItem>
        </ButtonBase>
        <ButtonBase
          sx={{ width: "100%", display: "flex", justifyContent: "flex-start" }}
          onClick={toggleTheme}
        >
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              padding: "6px 16px",
            }}
          >
            <ThemeToggler mode={mode} />
            <Typography sx={{ ml: 1 }}>Switch Theme</Typography>
          </ListItem>
        </ButtonBase>
      </List>
    </Box>
  );
};

export default HeaderDrawer;
