import { Box } from "@mui/material";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function BoxLoading() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}>
      <CircularProgress size={64} />
    </Box>
  );
}

export default BoxLoading;
