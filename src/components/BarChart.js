import { Chart } from "react-google-charts";
import React from "react";

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
  colors: ["#96C1F8", "#FF8C9D"],

};

export const BarChart = (props) => {
  return (
    <Chart
      chartType="BarChart"
      data={props.data}
      options={options}
      width={"100%"}
      height={"auto"}
    />
  );
};
