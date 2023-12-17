import { Button, Stack, Typography } from "@mui/material";
import React from "react";

function StackBookNow({ itemEvent, setShowEvent }) {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      style={{
        padding: "10px",
        border: "1px solid black",
      }}>
      <Typography variant="h6" fontSize={"16px"}>
        Event date: {new Date(itemEvent.date).toLocaleDateString()}
      </Typography>
      <Button
        onClick={() => setShowEvent(() => itemEvent._id)}
        variant="outlined"
        color="error">
        Book now
      </Button>
    </Stack>
  );
}

export default StackBookNow;
