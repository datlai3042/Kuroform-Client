import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { FormCore } from "@/type";
import moment from "moment";
import React, { SetStateAction } from "react";
import DashboardFormItem from "../DashboardFormItem";
import IconClose from "@/app/(NextClient)/_components/ui/input/IconClose";

type TProps = {
      forms: FormCore.Form[];
      date_full: string;
      setOpenModel: React.Dispatch<SetStateAction<boolean>>;
};

const DashboardFilterDetails = (props: TProps) => {
      const { forms, date_full, setOpenModel } = props;

      return (
            <div className="fixed top-[0] right-[0rem] z-[100] bg-[rgba(0,0,0,.2)] w-screen h-screen flex items-center justify-center">
                  <div className="relative text-text-theme w-[70vw] mx-auto xl:mx-0 xl:w-[60rem] min-h-[26rem] flex flex-col gap-[2rem] p-[2rem_2rem_3rem]  bg-[#0c1144] rounded-lg">
                        <div className="flex justify-between">
                              <p className="py-[1rem] flex-1  text-[#fff] font-semibold">
                                    Dữ liệu ngày {moment(date_full).format("DD-MMMM-YYYY").toUpperCase()}
                              </p>

                              <button
                                    onClick={() => setOpenModel(false)}
                                    type="button"
                                    className="ml-auto  w-[12rem] h-[3.6rem] text-[1.4rem] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                              >
                                    Đóng Modal
                              </button>
                        </div>
                        <div className="max-h-[32rem] overflow-y-scroll scroll-color-main w-full flex flex-col items-center gap-[2rem]">
                              {forms.map((form) => (
                                    <DashboardFormItem form={form} key={form._id} />
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default DashboardFilterDetails;
