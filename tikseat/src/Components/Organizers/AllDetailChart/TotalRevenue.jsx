import React from "react";
import Grid from "@mui/material/Grid";
import AnalyticEcommerce from "../../Cards/AnalyticEcommerce";
import Typography from "@mui/material/Typography";

function TotalRevenue({ dataAllEventDetail }) {
  return (
    <>
      <Grid>
        <Grid style={{ marginBottom: "20px" }} item xs={12} sx={{ mb: 0 }}>
          <Typography variant="h4">Total Statistics</Typography>
        </Grid>
        <Grid style={{ display: "flex", justifyContent: "space-between" }}>
          <Grid sx={{ width: "24%", backgroundColor:"yellow" }}>
            <AnalyticEcommerce
              bgColor="linear-gradient(to right, #b10000, pink)"
              title="Actual money VNĐ"
              count={dataAllEventDetail?.totalRevenue?.toLocaleString()}
              // percentage={allDataEvent.percent}
              percentage={75}
              extra="8,900"
            />
          </Grid>
          <Grid sx={{ width: "24%" }}>
            <AnalyticEcommerce
              bgColor="linear-gradient(to right, #001b9f, #2ee1fd)"
              title="Total Ticket"
              count={dataAllEventDetail.totalChairs}
              percentage={70.5}
              extra="8,900"
            />
          </Grid>
          <Grid sx={{ width: "24%" }}>
            <AnalyticEcommerce
              bgColor="linear-gradient(to right, #eb9c39, #fff3c8)"
              title="Total Buy Ticket"
              count={dataAllEventDetail.totalSoldChairs}
              percentage={27.4}
              isLoss
              color="warning"
              extra="1,943"
            />
          </Grid>
          <Grid sx={{ width: "24%" }}>
            <AnalyticEcommerce
              bgColor="linear-gradient(to right, #209b40, #a5ff9f)"
              title="Total Check in"
              count={dataAllEventDetail.totalCheckedInChairs}
              percentage={27.4}
              isLoss
              color="warning"
              extra="$20,395"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default TotalRevenue;
