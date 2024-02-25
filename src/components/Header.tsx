import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LanguageSelector from "./header/LanguageSelector";
import ThemeToggleButton from "./header/ThemeToggler";
import FeatureToggleButton from "./header/FeatureToggler";
import { HeaderProps } from "../common/types";

const Header: React.FC<HeaderProps> = ({
  setShowFoodFacilities,
  setShowRedditPosts,
  showFoodFacilities,
  showRedditPosts,
}) => {
  const [language, setLanguage] = useState("en");
  const [mobileOpen, setMobileOpen] = useState(false);
  const muiTheme = useTheme();
  const isLargeScreen = useMediaQuery(muiTheme.breakpoints.up("lg"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        <ListItem>
          <LanguageSelector language={language} setLanguage={setLanguage} />
        </ListItem>
        <ListItem>
          <FeatureToggleButton
            icon={<FastfoodIcon />}
            tooltip={
              showFoodFacilities
                ? "Hide Food Facilities"
                : "Show Food Facilities"
            }
            onClick={() => setShowFoodFacilities(!showFoodFacilities)}
          />
          <Typography>
            {showFoodFacilities
              ? "Hide Food Facilities"
              : "Show Food Facilities"}
          </Typography>
        </ListItem>
        <ListItem>
          <FeatureToggleButton
            icon={<PostAddIcon />}
            tooltip={
              showRedditPosts ? "Hide Reddit Posts" : "Show Reddit Posts"
            }
            onClick={() => setShowRedditPosts(!showRedditPosts)}
          />
          <Typography>
            {showRedditPosts ? "Hide Reddit Posts" : "Show Reddit Posts"}
          </Typography>
        </ListItem>

        <ListItem>
          <ThemeToggleButton />
          <Typography>
            Switch Theme
          </Typography>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            DMetroVerse
          </Typography>
          {isLargeScreen ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LanguageSelector language={language} setLanguage={setLanguage} />
              <FeatureToggleButton
                icon={<FastfoodIcon />}
                tooltip={
                  showFoodFacilities
                    ? "Hide Food Facilities"
                    : "Show Food Facilities"
                }
                onClick={() => setShowFoodFacilities(!showFoodFacilities)}
              />
              <FeatureToggleButton
                icon={<PostAddIcon />}
                tooltip={
                  showRedditPosts ? "Hide Reddit Posts" : "Show Reddit Posts"
                }
                onClick={() => setShowRedditPosts(!showRedditPosts)}
              />
              <ThemeToggleButton />
            </Box>
          ) : (
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          )}
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "flex", lg: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
