import { Chart } from "react-google-charts";

// export const data = [
//   ["Category", "Number"],
//   ["Bots", 11],
//   ["Humans", 2],
// ];

export const options = {
  title: "Bots vs Humans",
};
export const PieChart = (data) => {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"auto"}
    />
  );
};
