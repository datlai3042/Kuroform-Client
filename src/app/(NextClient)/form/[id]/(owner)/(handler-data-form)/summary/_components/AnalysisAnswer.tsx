import React, { memo } from "react";
import generatePercentOption from "../_utils/generatePercentOption.utils";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";

export type InputData = {
      _id: string;
      title: string;
      value: string;
      time: Date;
      form_answer_id: string;
};

type TProps = {
      data: InputData[];
};

const AnalysisAnswer = (props: TProps) => {
      const { data } = props;

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;

      const temp: { [key: string]: { count: number; percent: number } } = generatePercentOption(data);
      return (
            <div className="w-[50rem] flex flex-col gap-[1rem] mb-[1rem]">
                  {Object.keys(temp).map((ipdt, i) =>
                        !ipdt ? (
                              <div className="flex items-center gap-[1rem]" key={temp[ipdt].percent + i}>
                                    <div className="relative w-full bg-[var(--bg-answer-option)]  rounded-[.4rem_0rem_0rem_.4rem]">
                                          <div
                                                title="Người dùng không nhập thông tin"
                                                style={{
                                                      width: `${temp[ipdt].percent}%
							
							`,

                                                      background: "rgb(27 27 27 / 94%)",
                                                }}
                                                className="min-w-[16%] truncate rounded-[.4rem_0rem_0rem_.4rem]  min-h-[3rem] p-[.8rem_1rem] bg-gray-200  text-gray-400 hover:cus "
                                          >
                                                <span>Người dùng không nhập thông tin</span>
                                          </div>
                                    </div>
                                    <p style={{ direction: "ltr" }} className=" min-w-[10rem] flex justify-between ">
                                          <span>{temp[ipdt].percent}%</span>
                                          <span>
                                                {temp[ipdt].count} / {data.length}
                                          </span>
                                    </p>
                              </div>
                        ) : (
                              <div className="flex items-center gap-[1rem]" key={temp[ipdt].percent + i}>
                                    <div className="relative w-full bg-[var(--bg-answer-option)] rounded-[.4rem]" key={temp[ipdt].percent + i}>
                                          <div
                                                style={{ width: `${temp[ipdt].percent}%` }}
                                                title={ipdt}
                                                className="min-w-[16%] truncate rounded-[.4rem_0rem_0rem_.4rem]  min-h-[3rem] p-[.8rem_1rem] text-[#ffffff] bg-color-main opacity-90"
                                          >
                                                <span>{ipdt}</span>
                                          </div>
                                    </div>
                                    <p style={{ direction: "ltr" }} className=" min-w-[10rem] flex justify-between ">
                                          <span>{temp[ipdt].percent}%</span>
                                          <span>
                                                {temp[ipdt].count} / {data.length}
                                          </span>
                                    </p>
                              </div>
                        ),
                  )}
            </div>
      );
};

export default memo(AnalysisAnswer);
