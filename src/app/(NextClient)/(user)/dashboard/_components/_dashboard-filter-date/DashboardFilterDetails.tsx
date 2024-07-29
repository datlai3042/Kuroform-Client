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
                  <ClickOutSide setOpenModel={setOpenModel}>
                        <div className="relative text-text-theme w-full xl:w-[60rem] min-h-[26rem] flex flex-col gap-[2rem] p-[2rem_2rem_3rem]  bg-bg-model rounded-lg">
                              <p className="py-[1rem] w-full text-center text-color-main font-semibold">
                                    Dữ liệu ngày {moment(date_full).format("DD-MMMM-YYYY").toUpperCase()}
                              </p>
                              <div className="max-h-[32rem] overflow-y-scroll scroll-color-main w-full flex flex-col items-center gap-[2rem]">
                                    {forms.map((form) => (
                                          <DashboardFormItem form={form} key={form._id} />
                                    ))}
                              </div>

                              <div className="absolute right-[2rem] top-[2rem]">
                                    <button
                                          className="w-[3rem] h-[3rem] xl:w-[4rem] xl:h-[4rem] hover:bg-[#ffffff] flex items-center justify-center rounded-full shadow text-[12px] text-[#fff] hover:text-[#000] font-semibold"
                                          onClick={() => setOpenModel(false)}
                                    >
                                          X
                                    </button>
                              </div>
                        </div>
                  </ClickOutSide>
            </div>
      );
};

export default DashboardFilterDetails;
