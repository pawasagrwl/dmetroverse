import React, { useContext, useState, useEffect } from "react";
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
  Box,
  IconButton,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    setIsSubmitting(false);
    setSubmitMessage("");
  }, [localOrigin, localDestination, localJourneyType]);

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
    setIsSubmitting(true);
    setSubmitMessage("Form submitted. Please wait...");
  };

  const handleSwap = () => {
    const temp = localOrigin;
    setLocalOrigin(localDestination);
    setLocalDestination(temp);
  };

  const mobileStyles = {
    autocomplete: {
      width: isMobile ? "100%" : 180,
      margin: theme.spacing(1, 0),
    },
    swapButton: {
      margin: theme.spacing(isMobile ? 0 : 0.5),
      display: "flex",
      alignItems: "center",
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
      <Toolbar
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 0.5,
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

        <Button
          onClick={handleSwap}
          sx={mobileStyles.swapButton}
          size="small"
          color="primary"
          startIcon={<SwapHorizIcon />} // This will place the icon on the left
        >
          Swap
        </Button>

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
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </Toolbar>
      {submitMessage && (
        <Box sx={{ textAlign: "center", mt: 1 }}>
          <Typography variant="body2" color="textSecondary">
            {submitMessage}
          </Typography>
        </Box>
      )}
    </AppBar>
  );
};

export default JourneyForm;
