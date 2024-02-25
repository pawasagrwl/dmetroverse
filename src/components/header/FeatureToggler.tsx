import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

interface FeatureTogglerProps {
  icon: React.ReactElement;
  onClick: () => void;
  tooltip: string;
}

const FeatureToggler: React.FC<FeatureTogglerProps> = ({ icon, onClick, tooltip }) => (
  <Tooltip title={tooltip}>
    <IconButton color="inherit" onClick={onClick}>
      {icon}
    </IconButton>
  </Tooltip>
);

export default FeatureToggler;
