import React, { useState } from "react";
import { Drawer } from "@mui/material";
import HeaderBar from "./header/HeaderBar";
import HeaderDrawer from "./header/HeaderDrawer";
import { HeaderProps } from "../common/types";
import { useTheme as useAppTheme } from "../context/ThemeContext";

const Header: React.FC<HeaderProps> = ({
  setShowFoodFacilities,
  setShowRedditPosts,
  showFoodFacilities,
  showRedditPosts,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleTheme, mode } = useAppTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <HeaderBar
        handleDrawerToggle={handleDrawerToggle}
        setShowFoodFacilities={setShowFoodFacilities}
        setShowRedditPosts={setShowRedditPosts}
        showFoodFacilities={showFoodFacilities}
        showRedditPosts={showRedditPosts}
        toggleTheme={toggleTheme}
        mode={mode}
      />
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxShadow: 3,
            borderRadius: 2,
            width: { xs: "80%", sm: "60%", md: "40%", lg: "30%", xl: "25%" },
            maxWidth: 240,
          },
        }}
      >
        <HeaderDrawer
          handleDrawerToggle={handleDrawerToggle}
          setShowFoodFacilities={setShowFoodFacilities}
          setShowRedditPosts={setShowRedditPosts}
          showFoodFacilities={showFoodFacilities}
          showRedditPosts={showRedditPosts}
          toggleTheme={toggleTheme}
          mode={mode}
        />
      </Drawer>
    </>
  );
};

export default Header;
