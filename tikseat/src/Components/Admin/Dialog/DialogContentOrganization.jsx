import React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { Typography } from "@mui/material";

const StyledOtherText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

function DialogContentOrganization({ listContent, selectedDetail }) {
  return (
    <>
      {listContent.map((content, index) => (
        <StyledOtherText variant="body2" color="textSecondary" key={index}>
          {content.label}{" "}
          {content.field === "organizer_type" ? (
            selectedDetail[content.field].map((value, index) => (
              <StyledChip
                key={index}
                label={value}
                variant="outlined"
                color="primary"
              />
            ))
          ) : content.field === "isActive" ? (
            <StyledChip
              color={selectedDetail[content.field] ? "success" : "error"}
              label={selectedDetail[content.field] ? "Active" : "Inactive"}
              variant="outlined"
            />
          ) : (
            selectedDetail[content.field]
          )}
        </StyledOtherText>
      ))}
    </>
  );
}

export default DialogContentOrganization;
