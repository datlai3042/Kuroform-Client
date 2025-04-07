"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import useGetAllFormUser from "@/app/hooks/useGetAllFormUser";
import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";
const chartData = [
      { month: "January", desktop: 186, mobile: 80 },
      { month: "February", desktop: 305, mobile: 200 },
      { month: "March", desktop: 237, mobile: 120 },
      { month: "April", desktop: 73, mobile: 190 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
      view: {
            label: "Click để mở link",
            color: "hsl(var(--chart-1))",
      },
} satisfies ChartConfig;

const DashboardTotalTopView = () => {
      const { forms } = useGetAllFormUser();
      const router = useRouter();
      const { renderData, topView } = useMemo(() => {
            const truncateText = (text: string, maxLength: number) => {
                  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
            };
            const topView = forms.sort((a, b) => b.form_views - a.form_views).slice(0, 6);

            const renderData = topView.map((form) => {
                  return {
                        title: form.form_title?.form_title_value,
                        view: form.form_views,
                        id: form._id,
                  };
            });
            return { renderData, topView };
      }, [forms]);

      const navigateForm = (id: string) => {
            const segment = "summary";
            const formLink = `/form/${id}/${segment}`;
            router.push(formLink);
      };

      return (
            <Card className="h-full bg-color-section-theme overflow-auto">
                  <CardHeader>
                        <CardTitle>Các Form có lượt xem cao nhất</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[60%] py-0">
                        {forms.length > 0 ? (
                              <ChartContainer config={chartConfig} className="h-full w-full ">
                                    <BarChart
                                          accessibilityLayer
                                          data={renderData}
                                          layout="vertical"
                                          margin={{
                                                right: 16,
                                          }}
                                    >
                                          <CartesianGrid horizontal={false} />
                                          <YAxis
                                                dataKey="title"
                                                type="category"
                                                tickLine={false}
                                                tickMargin={10}
                                                axisLine={false}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                                hide
                                          />
                                          <XAxis dataKey="view" type="number" hide />
                                          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" className="text-[1.6rem]" />} />
                                          <Bar
                                                dataKey="view"
                                                layout="vertical"
                                                fill="var(--color-view)"
                                                className="cursor-pointer"
                                                radius={4}
                                                onClick={(info: { payload: { id: string; view: number; title: string } }) => {
                                                      const {
                                                            payload: { id },
                                                      } = info;
                                                      navigateForm(id);
                                                }}
                                          >
                                                <LabelList
                                                      dataKey="title"
                                                      position="insideLeft"
                                                      offset={8}
                                                      className="fill-[--color-label]"
                                                      fontSize={12}
                                                      content={({ x, y, value }) => <Link href={"/"}>{value}</Link>}
                                                />
                                                <LabelList dataKey="view" position="right" offset={8} className="fill-foreground" fontSize={12} />
                                          </Bar>
                                    </BarChart>
                              </ChartContainer>
                        ) : (
                              <div className="flex-1 p-[2rem] flex justify-center items-center">Bạn chưa tạo form nào để thống kê</div>
                        )}
                  </CardContent>
                  <CardFooter className="mt-[1rem] flex-col items-start gap-2 text-[1.2rem]">
                        <div className="flex gap-2 font-medium leading-[1.6rem]">Click vào Line để xem thông tin chi tiết của Form</div>
                  </CardFooter>
            </Card>
      );
};

export default DashboardTotalTopView;
