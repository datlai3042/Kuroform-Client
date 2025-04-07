import { PieChart } from "@/app/(NextClient)/_components/_chart/PieChart";
import { RootState } from "@/app/_lib/redux/store";
import useGetFormTotalView from "@/app/hooks/form/useGetFormTotalView";
import useGetTotalFormAnswer from "@/app/hooks/form/useGetTotalFormAnswer";
import { calcPercentForm } from "@/app/utils/form.utils";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import FormEmpty from "./FormEmpty";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import useGetAllFormState from "@/app/hooks/form/useGetAllFormState";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CartesianGrid, Line, LineChart, XAxis, Bar, BarChart, LabelList } from "recharts";
import useGetAllFormUser from "@/app/hooks/useGetAllFormUser";

const chartConfig = {
      View: {
            label: "Lượt xem",
            color: "hsl(var(--chart-primary))",
      },
      Answer: {
            label: "Lượt phản hồi",
            color: "hsl(var(--chart-custom-v1))",
      },
} satisfies ChartConfig;
const DashboardTotalView = () => {
      useGetFormTotalView();
      useGetTotalFormAnswer();
      const { forms } = useGetAllFormUser();

      const total_views = useSelector((state: RootState) => state.formAsnwer.form_total_views);
      const total_answer = useSelector((state: RootState) => state.formAsnwer.form_total_answers);
      const chartDataV2 = [{ data: "FORM", View: total_views, Answer: total_answer }];

      return (
            <Card className="h-full bg-color-section-theme">
                  <CardHeader>
                        <CardTitle>Tương tác Form</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[60%] py-0">
                        {forms?.length > 0 ? (
                              <ChartContainer config={chartConfig} className="h-full w-full ">
                                    <BarChart
                                          accessibilityLayer
                                          data={chartDataV2}
                                          margin={{
                                                top: 20,
                                          }}
                                    >
                                          <CartesianGrid vertical={false} />
                                          {/* <XAxis dataKey="data" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} /> */}
                                          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                          <Bar dataKey="View" fill="var(--color-View)" radius={8}>
                                                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                                          </Bar>
                                          <Bar dataKey="Answer" fill="var(--color-Answer)" radius={8}>
                                                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                                          </Bar>
                                    </BarChart>
                              </ChartContainer>
                        ) : (
                              <div className="flex-1 p-[2rem] flex justify-center items-center">Bạn chưa tạo form nào để thống kê</div>
                        )}
                  </CardContent>
                  <CardFooter className="mt-[1.2rem] ">
                        <div className="flex flex-wrap gap-[1rem_1.6rem] text-[1.2rem] pl-[2.2rem]">
                              <div className="flex  items-center gap-[1rem]">
                                    <div className="w-[1rem] h-[1rem]  rounded-[.4rem] bg-[hsl(var(--chart-primary))]"></div>
                                    <span>Lượt xem</span>
                              </div>

                              <div className="flex items-center gap-[1rem]">
                                    <div className="w-[1rem] h-[1rem]  rounded-[.4rem] bg-[hsl(var(--chart-custom-v1))]"></div>
                                    <span>Lượt phản hồi</span>
                              </div>
                        </div>
                  </CardFooter>
            </Card>
      );
};

export default DashboardTotalView;
