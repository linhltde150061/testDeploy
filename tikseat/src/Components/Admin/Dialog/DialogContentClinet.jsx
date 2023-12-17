import { CardContent } from "@mui/material";
import React from "react";
import {
  StyledAvatar,
  StyledName,
  StyledOtherText,
  StyledChip,
} from "./DialogDetail";

function DialogContentClinet({
  LIST_NAME_CONTENT_DAILOG_CLIENT,
  selectedDetail,
}) {
  return (
    <>
      <CardContent>
        <StyledAvatar src={selectedDetail?.avatarImage} />
        <StyledName variant="h6" gutterBottom>
          {selectedDetail?.full_name}
        </StyledName>
        <StyledOtherText variant="body2" color="textSecondary">
          {LIST_NAME_CONTENT_DAILOG_CLIENT[0]} {selectedDetail?.email}
        </StyledOtherText>
        <StyledOtherText variant="body2" color="textSecondary">
          {LIST_NAME_CONTENT_DAILOG_CLIENT[1]} {selectedDetail?.phone}
        </StyledOtherText>
        <StyledOtherText variant="body2" color="textSecondary">
          {LIST_NAME_CONTENT_DAILOG_CLIENT[2]} {selectedDetail?.birthday}
        </StyledOtherText>
        <StyledOtherText variant="body2" color="textSecondary">
          {LIST_NAME_CONTENT_DAILOG_CLIENT[3]} {selectedDetail?.age}
        </StyledOtherText>
        <StyledOtherText variant="body2" color="textSecondary">
          {LIST_NAME_CONTENT_DAILOG_CLIENT[4]} {selectedDetail?.gender}
        </StyledOtherText>
        <StyledOtherText variant="body2" color="textSecondary">
          {LIST_NAME_CONTENT_DAILOG_CLIENT[5]}
          {selectedDetail?.favorit_enres?.map((value, index) => {
            return (
              <StyledChip label={value} variant="outlined" color="primary" />
            );
          })}
        </StyledOtherText>
      </CardContent>
    </>
  );
}

export default DialogContentClinet;
