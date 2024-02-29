import { Box, Typography, Link } from '@mui/material';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const theme = useTheme();
  const isDarkMode = theme.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{
        py: 2, // Padding Y-axis
        px: 3, // Padding X-axis
        mt: 'auto', // Margin top auto for pushing it to the bottom of the layout
        backgroundColor: isDarkMode ? 'grey.800' : 'grey.100', // Background color changes with theme
        color: isDarkMode ? 'grey.300' : 'grey.800', // Text color changes with theme
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        
      }}
    >
      <Link
        href="https://github.com/pawasagrwl/dmetroverse-code"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          color: isDarkMode ? 'blue.500' : 'blue.700', // Adjusting link color based on theme
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        View source on Github
      </Link>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Pawas Aggarwal
      </Typography>
    </Box>
  );
};

export default Footer;
