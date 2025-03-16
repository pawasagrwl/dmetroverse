import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { ButtonBase } from "@mui/material";

interface FeatureTogglerProps {
  icon: React.ReactElement;
  tooltip: string;
  active: boolean;
}

const FeatureToggler: React.FC<FeatureTogglerProps> = ({
  icon,
  tooltip,
  active,
}) => (
  <Tooltip title={tooltip}>
    <ButtonBase sx={{ color: active ? "inherit" : "action.disabled" }}>
      <IconButton color="inherit">{icon}</IconButton>
    </ButtonBase>
  </Tooltip>
);

export default FeatureToggler;
