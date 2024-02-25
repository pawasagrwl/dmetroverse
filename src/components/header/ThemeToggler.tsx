import React from 'react';
import { IconButton } from '@mui/material';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useTheme as useAppTheme } from "../../context/ThemeContext";

const ThemeToggler = () => {
  const { toggleTheme, mode } = useAppTheme();

  return (
    <IconButton color="inherit" onClick={toggleTheme}>
      {mode === 'dark' ? <NightsStayIcon /> : <WbSunnyIcon />}
    </IconButton>
  );
};

export default ThemeToggler;
