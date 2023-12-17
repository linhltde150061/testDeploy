import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Grid, Typography } from "@mui/material";

function DayChart({ detailOneEvent }) {
  return (
    <>
      <Grid item>
        <Typography variant="h5" fontWeight={600}>
          Total Buy Ticket
        </Typography>
      </Grid>
      <PieChart
        colors={["#337CCF", "#FF8551"]}
        series={[
          {
            data: [
              {
                id: 0,
                value: detailOneEvent.totalSoldChairs,
                label: "Tickets Solds",
              },
              {
                id: 1,
                value:
                  detailOneEvent.totalChairs - detailOneEvent.totalSoldChairs,
                label: "Unsold Tickets",
              },
            ],
          },
        ]}
        // width={580}
        height={175}
        sx={{ width: "100%" }}
      />
    </>
  );
}

export default DayChart;
