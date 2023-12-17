import { Stack, Typography } from "@mui/material";
import React from "react";

function StackBuyTicket({ index, item, handleOpenBuyTick }) {
  return (
    <Stack
      key={index}
      direction={"row"}
      justifyContent={"space-between"}
      style={{
        cursor: "pointer",
        width: "100%",
        alignItems: "center",
      }}
      onClick={() => {
        handleOpenBuyTick(item, index);
      }}>
      <Typography variant="h4">{item.name_areas}</Typography>
      <Stack
        style={{
          border: "2px solid orange",
          borderRadius: "5px",
          padding: "7px 10px",
          color: "orange",
          width: "250px",
        }}
        justifyContent={"center"}
        direction={"row"}
        gap={"10px"}
        alignItems={"center"}>
        <Typography style={{ fontWeight: "900" }}>Buy ticket</Typography>-
        <Typography
          style={{
            fontWeight: "500",
            color: "gray",
          }}>
          {String(item.ticket_price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          <sup>vnd</sup>
        </Typography>
      </Stack>
    </Stack>
  );
}

export default StackBuyTicket;
