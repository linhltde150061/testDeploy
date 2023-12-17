import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Grid, Typography } from "@mui/material";

export default function BasicArea() {
  return (
    <>
      <Grid item>
        <Typography variant="h5" fontWeight={600}>
          Tickets are sold daily
        </Typography>
      </Grid>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            area: true,
          },
        ]}
        height={400}
      />
    </>
  );
}
