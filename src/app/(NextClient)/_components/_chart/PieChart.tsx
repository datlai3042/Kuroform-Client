import { Chart } from "chart.js";
import { registerables } from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { DataChart } from "./BarChart";

type TProps = DataChart;

Chart.register(...registerables);

export const PieChart = (props: TProps) => {
      const { dataChart } = props;

      return (
            <div className="w-full h-[13rem] xl:h-[15rem] flex justify-center  text-[#000]">
                  <Pie
                        className="w-[16rem] xl:w-[20rem] h-[13rem] xl:h-[15rem] text-inherit border-none"
                        data={dataChart}
                        options={{
                              plugins: {
                                    legend: {
                                          display: false,
                                    },
                              },
                              datasets: { bar: { barPercentage: 1, categoryPercentage: 0.8, borderWidth: 0 } },
                              responsive: true,
                              interaction: {
                                    mode: "index",
                                    intersect: false,
                              },
                        }}
                  />
            </div>
      );
};
