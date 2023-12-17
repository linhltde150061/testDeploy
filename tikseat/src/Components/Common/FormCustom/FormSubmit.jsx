import { Box } from "@mui/material";
import React from "react";

const FormSubmit = ({ onSubmit, children, ...rest }) => {
  return (
    <Box
      {...rest}
      autoComplete="off"
      component={"form"}
      onSubmit={onSubmit}
      style={{ marginTop: "20px" }}
    >
      {children}
    </Box>
  );
};

export default FormSubmit;
