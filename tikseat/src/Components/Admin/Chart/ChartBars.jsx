import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 345, 4566, 30000];
// const xLabels = [
//   "Page A",
//   "Page B",
//   "Page C",
//   "Page D",
//   "Page E",
//   "Page F",
//   "Page G",
//   "Page G",
//   "Page G",
//   "Page G",
//   "Page G",
// ];

export default function ChartBars({ xLabels, pData }) {
  return (
    <BarChart
      width={650}
      height={450}
      series={[{ data: pData, id: "pvId" }]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
    />
  );
}
