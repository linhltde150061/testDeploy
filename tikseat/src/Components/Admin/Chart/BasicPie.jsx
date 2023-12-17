import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie({
  adminRevenue,
  amountReceived,
  amountRefund,
}) {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: amountReceived, label: "The amount received" },
            { id: 1, value: amountRefund, label: "The amount of refund" },
            {
              id: 2,
              value: 50400,
              label: `The amount paid to \n the organization`,
            },
            { id: 3, value: adminRevenue, label: "Admin's profit amount" },
          ],
        },
      ]}
      width={800}
      height={350}
    />
  );
}
