import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Grid, Typography } from "@mui/material";

function DayChart({ dataAllEventDetail }) {
  return (
    <>
      <Grid>
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
                value: dataAllEventDetail.totalSoldChairs,
                label: "Tickets purchased",
              },
              {
                id: 1,
                value:
                  dataAllEventDetail.totalChairs -
                  dataAllEventDetail.totalSoldChairs,
                label: "Remaining tickets",
              },
            ],
          },
        ]}
        height={200}
        sx={{ width: "100%" }}
      />
    </>
  );
}

export default DayChart;
