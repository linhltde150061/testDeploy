import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Grid, Typography } from "@mui/material";


function CheckinOneChart({detailOneEvent}) {
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
              { id: 0, value: detailOneEvent.totalCheckedInChairs, label: "Checked in" },
              { id: 1, value: detailOneEvent.totalSoldChairs - detailOneEvent.totalCheckedInChairs, label: "No check in" },
            ],
          },
        ]}
        height={175}
        sx={{ width: "100%" }}
      />
    </>
  )
}

export default CheckinOneChart