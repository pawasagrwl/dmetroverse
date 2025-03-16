import React, { useState } from "react";
import { Facility, StationData } from "../../../common/types";
import { useTheme } from "../../../context/ThemeContext"; // Update with the correct path
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import StationFacilitiesModal from "./StationFacilitiesModal"; // Import the new modal component

interface StationFacilitiesProps {
  station: StationData;
}

const StationFacilities: React.FC<StationFacilitiesProps> = ({ station }) => {
  const { mode } = useTheme();
  const hasNoFacilities = station.facilities.length === 0;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Paper
        elevation={3}
        style={{
          minWidth: "30vh",
          width: "30vw",
          maxHeight: "30vh",
          margin: "0.5rem",
          position: "relative",
          overflow: "hidden",
          border: "1px solid #ddd", // Added border
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: hasNoFacilities ? "red" : "green",
            color: "white",
            padding: "0.5rem",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" component="h3" style={{ flexGrow: 1 }}>
            {station.stationName}
          </Typography>
          {!hasNoFacilities && (
            <IconButton onClick={handleOpen} style={{ color: "white" }}>
              <OpenWithIcon />
            </IconButton>
          )}
        </Box>
        <Box
          style={{
            overflow: "scroll",
            maxHeight: "calc(100% - 3rem)",
            padding: "1rem",
          }}
        >
          {station.facilities.length > 0 ? (
            station.facilities.flatMap((facility: Facility, facilityIndex) =>
              facility.detail_list.map((detail, index) => (
                <Box key={index} marginBottom={2}>
                  <Typography fontWeight="bold">
                    {detail.facility_name}
                  </Typography>
                  <Typography>
                    Purpose: {detail.purpose || "Not Found"}
                  </Typography>
                  <Typography>
                    Location: {detail.location_description || "Not Found"}
                  </Typography>
                </Box>
              ))
            )
          ) : (
            <Typography variant="body1">No food facilities found</Typography>
          )}
        </Box>
      </Paper>

      <StationFacilitiesModal
        open={open}
        handleClose={handleClose}
        stationName={station.stationName}
        facilities={station.facilities}
      />
    </>
  );
};

export default StationFacilities;
