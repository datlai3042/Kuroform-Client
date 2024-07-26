import { Chart } from "chart.js";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";

export type DataChart = {
      dataChart: {
            labels: string[];
            datasets: {
                  label: string;
                  data: any[];
                  backgroundColor: string[];
                  borderColor?: string[];
                  borderWidth?: number;
            }[];
      };
};

type TProps = DataChart;

import { registerables } from "chart.js";
Chart.register(...registerables);

export const BarChart = (props: TProps) => {
      const { dataChart } = props;

      return (
            <div className="w-[36rem] h-[15rem] xl:h-[20rem] text-[#000]">
                  <Bar
                        className="w-[20rem] h-[15rem] xl:w-[36rem]  text-inherit"
                        data={dataChart}
                        options={{
                              plugins: {
                                    title: {
                                          display: true,
                                          text: "Phân loại Form",
                                    },
                                    legend: {
                                          display: false,
                                    },
                              },
                              datasets: { bar: { barPercentage: 1, categoryPercentage: 0.8 } },
                              responsive: true,
                        }}
                  />
            </div>
      );
};
