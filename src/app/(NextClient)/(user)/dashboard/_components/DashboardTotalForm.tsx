import { RootState } from "@/app/_lib/redux/store";
import useGetAllFormState from "@/app/hooks/form/useGetAllFormState";
import useGetAllFormUser from "@/app/hooks/useGetAllFormUser";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Card } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { CartesianGrid, Line, LineChart, XAxis, Bar, BarChart, LabelList } from "recharts";
import FormEmpty from "./FormEmpty";

const chartConfig = {
      Public: {
            label: "Công khai",
            color: "hsl(var(--chart-primary))",
      },
      Private: {
            label: "Nháp",
            color: "hsl(var(--chart-normal))",
      },
      Delete: {
            label: "Xóa",
            color: "hsl(var(--chart-danger))",
      },
} satisfies ChartConfig;

const DashboardTotalForm = () => {
      const { forms } = useGetAllFormUser();
      useGetAllFormState();

      const form_delete = useSelector((state: RootState) => state.form.form_delete);
      const form_public = useSelector((state: RootState) => state.form.form_public);
      const form_private = useSelector((state: RootState) => state.form.form_private);

      const chartDataV2 = [{ data: "FORM", Private: form_private, Public: form_public, Delete: form_delete }];

      return (
            <Card className="h-full bg-color-section-theme overflow-auto">
                  <CardHeader>
                        <CardTitle>Tổng hợp</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[60%] py-0 flex-1">
                  {forms?.length > 0 ? (
                        <>
                                    <ChartContainer config={chartConfig} className=" w-full h-full">
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
                                                <Bar dataKey="Public" fill="var(--color-Public)" radius={8}>
                                                      <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                                                </Bar>
                                                <Bar dataKey="Private" fill="var(--color-Private)" radius={8}>
                                                      <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                                                </Bar>
                                                <Bar dataKey="Delete" fill="var(--color-Delete)" radius={8}>
                                                      <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                                                </Bar>
                                          </BarChart>
                                    </ChartContainer>
                        </>
                  ) : (
                        <div className="flex-1 p-[2rem] flex justify-center items-center">Bạn chưa tạo form nào để thống kê</div>
                  )}
                  </CardContent>
                  <CardFooter className="mt-[1.2rem] py-[0]">
                        <div className="flex flex-wrap gap-[1rem_1.6rem] text-[1.2rem] pl-[2.2rem]">
                              <div className="flex items-center gap-[1rem]">
                                    <div className="w-[1rem] h-[1rem] rounded-[.4rem] bg-[hsl(var(--chart-primary))]"></div>
                                    <span>Form công khai</span>
                              </div>

                              <div className="flex items-center gap-[1rem]">
                                    <div className="w-[1rem] h-[1rem] rounded-[.4rem] bg-[hsl(var(--chart-normal))]"></div>
                                    <span>Form riêng tư</span>
                              </div>

                              <div className="flex items-center gap-[1rem]">
                                    <div className="w-[1rem] h-[1rem] rounded-[.4rem] bg-[hsl(var(--chart-danger))]"></div>
                                    <span>Form tạm xóa</span>
                              </div>
                        </div>
                  </CardFooter>
            </Card>
      );
};

export default DashboardTotalForm;
