import { PieChart } from "@/app/(NextClient)/_components/_chart/PieChart";
import { RootState } from "@/app/_lib/redux/store";
import useGetFormTotalView from "@/app/hooks/form/useGetFormTotalView";
import useGetTotalFormAnswer from "@/app/hooks/form/useGetTotalFormAnswer";
import { calcPercentForm } from "@/app/utils/form.utils";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

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
                        backgroundColor: ["blue", "green"],
                        borderWith: 0,
                  },
            ],
      };

      return (
            <div className="relative w-full h-full text-text-theme rounded-lg  flex flex-col items-center gap-[.5rem] xl:gap-[2rem]">
                  <div className="w-full flex  gap-[2rem]">
                        <p className="flex flex-col gap-[1rem] h-max w-full text-[1.3rem]">
                              <span className="w-full break-words ">Tổng sô lượt xem Form: {total_views}</span>
                              <span className="w-full break-words r">Số lượt phản hồi: {total_answer}</span>

                              <span className="w-full break-words r">Tỉ lệ: {calcPercentForm({ formAnswer: total_answer, formView: total_views })}%</span>
                        </p>
                  </div>

                  <PieChart dataChart={dataChart} />
            </div>
      );
};

export default DashboardTotalView;
