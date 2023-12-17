import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Grid, Typography } from "@mui/material";

function CheckinChart({dataAllEventDetail}) {
  return (
    <>
      <Grid item>
        <Typography variant="h5" fontWeight={600}>
          Total Check in
        </Typography>
      </Grid>
      <PieChart
      colors={["#337CCF", "#FF8551"]}
        series={[
          {
            data: [
              { id: 0, value: dataAllEventDetail.totalCheckedInChairs, label: "Checked in" },
              { id: 1, value: dataAllEventDetail.totalSoldChairs - dataAllEventDetail.totalCheckedInChairs, label: "No check in" },
            ],
          },
        ]}
        height={200}
        sx={{ width: "100%" }}
      />
    </>
  )
}

export default CheckinChart