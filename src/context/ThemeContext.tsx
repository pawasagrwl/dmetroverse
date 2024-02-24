import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Type for the context value
type ThemeContextType = {
  toggleTheme: () => void;
};

// Creating the context with a default value
const ThemeContext = createContext<ThemeContextType>({ toggleTheme: () => {} });

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
