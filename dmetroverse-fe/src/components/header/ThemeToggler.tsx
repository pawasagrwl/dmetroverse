import { IconButton, ButtonBase } from "@mui/material";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";


const ThemeToggler: React.FC<{mode: string}> = ({mode}) => {
  return (
    <ButtonBase>
      <IconButton color="inherit">
        {mode === "dark" ? <NightsStayIcon /> : <WbSunnyIcon />}
      </IconButton>
    </ButtonBase>
  );
};

export default ThemeToggler;
