import { BarChart, DataChart } from "@/app/(NextClient)/_components/_chart/BarChart";
import { RootState } from "@/app/_lib/redux/store";
import useGetAllFormState from "@/app/hooks/form/useGetAllFormState";
import useGetAllFormUser from "@/app/hooks/useGetAllFormUser";
import React from "react";
import { useSelector } from "react-redux";

const DashboardTotalForm = () => {
      const { forms } = useGetAllFormUser();
      useGetAllFormState();

      const form_delete = useSelector((state: RootState) => state.form.form_delete);
      const form_public = useSelector((state: RootState) => state.form.form_public);
      const form_private = useSelector((state: RootState) => state.form.form_private);

      const dataChart = {
            labels: ["Form riêng tư", "Form công khai", "Form Đã xóa"],
            datasets: [
                  {
                        label: "Các Form của bạn",
                        data: [form_private, form_public, form_delete],
                        backgroundColor: ["black", "blue", "red"],
                  },
            ],
      };

      return (
            <div className="relative w-full h-full text-text-theme rounded-lg flex flex-col     gap-[.5rem] xl:gap-[1rem] ">
                  <div className="flex items-center">
                        <p className="w-full  break-words ">Tổng sô Form hiện có</p>
                        <p className="text-[4rem] xl:text-[4rem]">{forms.length}</p>
                  </div>

                  {/* <div className="w-full flex flex-col justify-center">
                        <p>Form công khai: {form_public}</p>
                        <p>Form riêng tư: {form_private}</p>
                        <p>Form ở thùng rác tạm thời: {form_delete}</p>
                  </div> */}
                  <BarChart dataChart={dataChart} />
                  {/* <div className="absolute bottom-[2rem] right-[2rem]">
                        <Image
                              src={"/assets/images/icon/form/form_sub.png"}
                              width={20}
                              height={20}
                              alt="avatar"
                              unoptimized={true}
                              className="w-[6rem] h-[6rem] rounded-full"
                        />
                  </div> */}
            </div>
      );
};

export default DashboardTotalForm;
