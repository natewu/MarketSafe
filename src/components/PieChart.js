import { Chart } from "react-google-charts";

export const data = [
  ["Category", "Number"],
  ["Bots", 11],
  ["Humans", 2],
];

export const options = {
  title: "Bots vs Humans",
  colors: ["#96C1F8", "#FF8C9D"],
};
export const PieChart = (props) => {
  return (
    <Chart
      chartType="PieChart"
      data={props.data}
      options={options}
      width={"100%"}
      height={"auto"}
    />
  );
};
