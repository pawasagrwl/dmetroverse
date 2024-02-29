import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { ButtonBase } from "@mui/material";

interface FeatureTogglerProps {
  icon: React.ReactElement;
  onClick: () => void;
  tooltip: string;
  active: boolean;
}

const FeatureToggler: React.FC<FeatureTogglerProps> = ({
  icon,
  onClick,
  tooltip,
  active,
}) => (
  <Tooltip title={tooltip}>
    <ButtonBase
      onClick={onClick}
      sx={{ color: active ? "inherit" : "action.disabled" }}
    >
      <IconButton color="inherit" onClick={onClick}>
        {icon}
      </IconButton>
    </ButtonBase>
  </Tooltip>
);

export default FeatureToggler;
