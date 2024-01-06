import React from "react";
import { Chart } from "react-google-charts";

// export const data = [
//   ["Product", "Flagged", "Total"],
//   ["p1", 1000, 1500],
//   ["p2", 10, 1500],
// ];

export const options = {
  chart: {
    title: "Number of Flagged Reviews Per Product",
    subtitle: "",
  },
  hAxis: {
    title: "Number of Flagged Reviews",
    minValue: 0,
  },
  vAxis: {
    title: "Product",
  },
  bars: "horizontal",
  axes: {
    y: {
      0: { side: "right" },
    },
  },
};

export const BarChart = (data) => {
  return (
    <Chart
      chartType="BarChart"
      data={data}
      options={options}
      width={"100%"}
      height={"auto"}
    />
  );
};
