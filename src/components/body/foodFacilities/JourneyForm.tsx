import React, { useContext, useState } from "react";
import { JourneyContext } from "../../../context/JourneyContext";
import { station_list } from "../../../data/en/station_list";
import {
  AppBar,
  Toolbar,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  TextField,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
interface Station {
  station_code: string;
  station_name: string;
}

const JourneyForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
  const [localJourneyType, setLocalJourneyType] = useState(
    journeyType || "least-distance"
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !localOrigin ||
      !localDestination ||
      localOrigin.station_code === localDestination.station_code
    ) {
      alert("Origin and destination cannot be the same.");
      return;
    }
    setOrigin(localOrigin.station_code);
    setDestination(localDestination.station_code);
    setJourneyType(localJourneyType);
  };
  const mobileStyles = {
    autocomplete: {
      width: isMobile ? "100%" : 240,
      margin: theme.spacing(1, 0),
    },
    radioGroup: {
      flexDirection: isMobile ? "row" : "column",
      margin: theme.spacing(0.5, 0),
    },
    submitButton: {
      width: isMobile ? "100%" : "auto",
      margin: theme.spacing(1, 0),
    },
    formToolbar: {
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "stretch" : "center",
      gap: theme.spacing(1),
      flexWrap: "wrap",
    },
  };
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Typography variant="h6" align="center" gutterBottom>
        Food Facilities Finder
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Select your origin and destination to find food facilities along your
        route.
      </Typography>
      <Toolbar
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 0.1,
          flexWrap: "wrap",
        }}
      >
        <Autocomplete
          options={station_list}
          getOptionLabel={(option) => option.station_name}
          value={localOrigin}
          onChange={(event, newValue) => {
            setLocalOrigin(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Origin" />}
          sx={mobileStyles.autocomplete}
          size={isMobile ? "medium" : "small"}
        />

        <Autocomplete
          options={station_list}
          getOptionLabel={(option) => option.station_name}
          value={localDestination}
          onChange={(event, newValue) => {
            setLocalDestination(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Destination" />
          )}
          sx={mobileStyles.autocomplete}
          size={isMobile ? "medium" : "small"}
        />

        <RadioGroup
          value={localJourneyType}
          onChange={(e) => setLocalJourneyType(e.target.value)}
          sx={mobileStyles.radioGroup}
        >
          <FormControlLabel
            value="least-distance"
            control={<Radio size="small" />}
            label="Least Distance"
          />
          <FormControlLabel
            value="minimum-interchange"
            control={<Radio size="small" />}
            label="Minimum Interchange"
          />
        </RadioGroup>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={mobileStyles.submitButton}
        >
          Submit
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default JourneyForm;
