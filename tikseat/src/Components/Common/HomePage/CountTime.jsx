import { Typography, Stack } from "@mui/material";
import React from "react";

function CountTime({ timeLeft, statusTime }) {
  return (
    <Stack direction={"row"} gap={"10px"}>
      <Stack
        direction={"column"}
        style={{
          width: "60px",
          height: "60px",
          background: "green",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Typography variant="h6">{timeLeft.days}</Typography>
        <Typography variant="body2">Day</Typography>
      </Stack>
      <Stack
        direction={"column"}
        style={{
          width: "60px",
          height: "60px",
          background: "green",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Typography variant="h6">{timeLeft.hours}</Typography>
        <Typography variant="body2">hours</Typography>
      </Stack>
      <Stack
        direction={"column"}
        style={{
          width: "60px",
          height: "60px",
          background: "green",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Typography variant="h6">{timeLeft.minutes}</Typography>
        <Typography variant="body2">minutes</Typography>
      </Stack>
      <Stack
        direction={"column"}
        style={{
          width: "60px",
          height: "60px",
          background: "green",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Typography variant="h6">{timeLeft.seconds}</Typography>
        <Typography variant="body2">seconds</Typography>
      </Stack>
    </Stack>
  );
}

export default CountTime;
