import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

function InformationEvent({ dataEventDetail, organizer }) {
  return (
    <Stack
      direction={"column"}
      flex={1}
      padding={"20px 0"}
      color={"white"}
      margin={"auto"}>
      <Typography variant="h3" textAlign={"center"} marginTop={"20px"}>
        {dataEventDetail?.event_name}
      </Typography>

      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={"10px"}
        marginTop={"10px"}>
        <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
          <span>
            <LocationOnIcon />
          </span>
          <Typography>
            {dataEventDetail?.event_location?.specific_address}
          </Typography>
          -<Typography>{dataEventDetail?.event_location?.ward}</Typography>-
          <Typography>{dataEventDetail?.event_location?.district}</Typography>-
          <Typography>{dataEventDetail?.event_location?.city}</Typography>
        </Stack>
      </Stack>
      <Typography
        variant="h5"
        fontStyle={"italic"}
        color={"white"}
        margin={"20px 0"}
        style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ display: "flex" }}>
          <AccountBoxIcon />
        </span>
        <Typography fontWeight={700}> Organizer: {organizer}</Typography>
      </Typography>

      <Box margin={"20px 0"}>
        {dataEventDetail?.type_of_event.map((item) => (
          <Chip
            sx={{
              color: "white",
              fontStyle: "italic",
              fontSize: "1.5em",
              height: "40px",
              padding: "4px 13px",
              backgroundColor: "#3b82f6",
              marginLeft: "8px",
            }}
            label={item}
          />
        ))}
      </Box>
    </Stack>
  );
}

export default InformationEvent;
