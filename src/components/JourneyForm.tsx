import React, { useContext, useState } from "react";
import { JourneyContext } from "../context/JourneyContext";
import { station_list } from "../data/en/station_list";
import { AppBar, Toolbar, Button, RadioGroup, FormControlLabel, Radio, Autocomplete, TextField } from '@mui/material';

interface Station {
  station_code: string;
  station_name: string;
}

const JourneyForm: React.FC = () => {
  const {
    origin,
    setOrigin,
    destination,
    setDestination,
    journeyType,
    setJourneyType,
  } = useContext(JourneyContext);

  const [localOrigin, setLocalOrigin] = useState<Station | null>(
    station_list.find((station) => station.station_code === origin) || null
  );
  const [localDestination, setLocalDestination] = useState<Station | null>(
    station_list.find((station) => station.station_code === destination) || null
  );
  const [localJourneyType, setLocalJourneyType] = useState(journeyType || 'least-distance');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!localOrigin || !localDestination || localOrigin.station_code === localDestination.station_code) {
      alert("Origin and destination cannot be the same.");
      return;
    }
    setOrigin(localOrigin.station_code);
    setDestination(localDestination.station_code);
    setJourneyType(localJourneyType);
  };

  return (
    <AppBar position="sticky" color="default" elevation={0}>
      <Toolbar component="form" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        
        <Autocomplete
          options={station_list}
          getOptionLabel={(option) => option.station_name}
          value={localOrigin}
          onChange={(event, newValue) => {
            setLocalOrigin(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Origin" />}
          sx={{ width: 240 }}
          size="small"
        />
        
        <Autocomplete
          options={station_list}
          getOptionLabel={(option) => option.station_name}
          value={localDestination}
          onChange={(event, newValue) => {
            setLocalDestination(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Destination" />}
          sx={{ width: 240 }}
          size="small"
        />

        <RadioGroup
          value={localJourneyType}
          onChange={(e) => setLocalJourneyType(e.target.value)}
          sx={{ flexDirection: 'column' }}
        >
          <FormControlLabel value="least-distance" control={<Radio size="small" />} label="Least Distance" />
          <FormControlLabel value="minimum-interchange" control={<Radio size="small" />} label="Minimum Interchange" />
        </RadioGroup>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Submit</Button>
      </Toolbar>
    </AppBar>
  );
};

export default JourneyForm;
