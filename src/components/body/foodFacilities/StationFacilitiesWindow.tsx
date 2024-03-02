import React from 'react';
import StationFacilities from './StationFacilities';
import { StationData } from '../../../common/types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

interface StationFacilitiesWindowProps {
  stations: StationData[][];
}

const StationFacilitiesWindow: React.FC<StationFacilitiesWindowProps> = ({ stations }) => {

  return (
    <Box style={{ padding: '0.5rem', maxHeight: '100vh', overflow: 'auto' }}>
      {stations.map((line: StationData[], index: number) => (
        <Paper key={index} elevation={4} style={{ margin: '1rem', overflow: 'hidden' }}>
          <Box display="flex" flexDirection="row" flexWrap="nowrap" overflow="auto" padding="0.5rem">
            {line.map((station: StationData, idx: number) => (
              <StationFacilities key={idx} station={station} />
            ))}
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default StationFacilitiesWindow;
