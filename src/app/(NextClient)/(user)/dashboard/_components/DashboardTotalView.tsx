import { PieChart } from "@/app/(NextClient)/_components/_chart/PieChart";
import { RootState } from "@/app/_lib/redux/store";
import useGetFormTotalView from "@/app/hooks/form/useGetFormTotalView";
import useGetTotalFormAnswer from "@/app/hooks/form/useGetTotalFormAnswer";
import { calcPercentForm } from "@/app/utils/form.utils";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import FormEmpty from "./FormEmpty";

const DashboardTotalView = () => {
      const data = useGetFormTotalView();
      const response = useGetTotalFormAnswer();

      const total_views = useSelector((state: RootState) => state.formAsnwer.form_total_views);
      const total_answer = useSelector((state: RootState) => state.formAsnwer.form_total_answers);

      const dataChart = {
            labels: ["Số lượt xem Form", "Số lượt phản hồi"],
            datasets: [
                  {
                        label: "Thống kê của bạn",
                        data: [total_views, total_answer],
                        backgroundColor: ["#4299de", "#3b36db"],
                        borderWith: 0,
                  },
            ],
      };

      return (
            <div className="relative w-full h-full text-text-theme  rounded-lg  flex flex-col items-center  gap-[2rem] xl:gap-[2rem]">
                  <div className="w-full flex justify-center gap-[2rem]">
                        <p className=" flex flex-row justify-end xl:flex-col flex-wrap xl:items-center gap-[1rem] h-max w-full text-[1.3rem]">
                              <span className="w-max  break-words ">Tổng sô lượt xem Form: {total_views}</span>
                              <span className="w-max  break-words r">Số lượt phản hồi: {total_answer}</span>

                              <span className="w-max  break-words r">Tỉ lệ: {calcPercentForm({ formAnswer: total_answer, formView: total_views })}%</span>
                        </p>
                  </div>

                  {total_views === -1 && total_answer === -1 ? (
                        <div className="w-[15rem] h-[15rem] rounded-xl animate-pulse bg-gray-200"></div>
                  ) : total_views === 0 && total_answer === 0 ? (
                        <Image
                              src={"/assets/images/icon/form_answer/form_empty_response.png"}
                              width={18}
                              height={18}
                              alt="icon"
                              className="w-[14rem] h-[14rem]"
                              unoptimized={true}
                        />
                  ) : (
                        <PieChart dataChart={dataChart} />
                  )}
            </div>
      );
};

export default DashboardTotalView;
