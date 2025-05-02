import { FormDataFilter } from "@/app/_lib/redux/dataForm.slice";
import { FormCore, InputCore } from "@/type";
import React, { useEffect, useState } from "react";
import AnalysisAnswer, { InputData } from "./AnalysisAnswer";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import moment from "moment";
import LabelNewAnswer from "./LabelNewAnswer";
import { Circle } from "lucide-react";
moment.locale("vi");

type TProps = {
      formAnswer: FormCore.FormAnswer.FormAnswerCore;

      dataGroupFilter: FormDataFilter;
      setFormAnswerDetail: React.Dispatch<React.SetStateAction<FormCore.FormAnswer.OneReport | null>>;
      setOpenDetailAnswer: React.Dispatch<React.SetStateAction<boolean>>;
};

const ViewGroupAnswer = (props: TProps) => {
      const { dataGroupFilter, setFormAnswerDetail, setOpenDetailAnswer, formAnswer } = props;
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;
      const formAnswerId = window.location.hash.slice(1);
      const { form_id_current } = useSelector((state: RootState) => state.dataFormHandler);

      const [oldData, setOldData] = useState(() => {
            return formAnswer.reports.map((ans) => ans._id);
      });

      const [newData, setNewData] = useState<string[]>(() => []);

      useEffect(() => {
            let newAnswer: string[] = [];
            setOldData((prev) => {
                  formAnswer.reports.forEach((ans) => {
                        if (!prev.includes(ans._id)) {
                              newAnswer.push(ans._id);
                        }
                  });
                  return prev;
            });
            setNewData(newAnswer);
      }, [formAnswer]);

      return (
            <>
                  <div className="flex flex-col h-full gap-[4rem] flex-nowrap overflow-auto pb-[3rem] normal-scroll">
                        {Object.keys(dataGroupFilter).map((dt, i) => {
                              const type = dt.split("_#_")[1] as InputCore.InputForm["type"];
                              return (
                                    <div key={dt + i} className="whitespace-pre  flex flex-col gap-[1.2rem]  ">
                                          <h3 className="pl-[.4rem] text-[2.1rem] flex-wrap flex items-center justify-between gap-[.8rem] font-medium text-color-main">
                                                <p className="flex items-baseline gap-[.6rem]">
                                                      <Circle size={16}/>
                                                      <span className="whitespace-pre-wrap">{dataGroupFilter[dt][0]?.title}</span>
                                                </p>
                                                <span className="text-[1.4rem]">{dataGroupFilter[dt].length} phản hồi</span>
                                          </h3>
                                          {type === "OPTION" && <AnalysisAnswer data={dataGroupFilter[dt] as InputData[]} />}
                                          {type === "OPTION_MULTIPLE" && <AnalysisAnswer data={dataGroupFilter[dt] as InputData[]} />}

                                          <div className="w-full flex flex-col gap-[1.6rem]   pb-[.8rem] ">
                                                {dataGroupFilter[dt].map((info, i) => {
                                                      return (
                                                            <div
                                                                  title="Xem phiếu trả lời này"
                                                                  id={info.form_answer_id}
                                                                  key={info._id + i}
                                                                  onClick={() => {
                                                                        setFormAnswerDetail(() => {
                                                                              return (
                                                                                    formAnswer?.reports.filter((fans) => fans._id === info.form_answer_id)[0] ||
                                                                                    null
                                                                              );
                                                                        });
                                                                        setOpenDetailAnswer(true);
                                                                  }}
                                                                  className={`${
                                                                        formAnswerId === info.form_answer_id ? "bg-color-main text-[#fff]" : ""
                                                                  }  min-h-[4rem] px-[1rem] flex items-center justify-between gap-[6rem] border-b-[.1rem] border-[var(--border-color-input)] hover:cursor-pointer hover:bg-color-main hover:text-[#fff] `}
                                                            >
                                                                  <p className="min-w-[30%] max-w-[30%] xl:min-w-[50%] xl:max-w-[50%] truncate xl:break-words flex gap-[1rem] leading-10">
                                                                        <span>{info.value ? info?.value : "Người dùng không nhập dữ liệu"}</span>

                                                                        {newData.includes(info.form_answer_id) && <LabelNewAnswer />}
                                                                  </p>
                                                                  <p className="flex items-center gap-[2rem] opacity-60">
                                                                        <span>{moment(new Date(info.time)).format("h:mm")}</span>
                                                                        <span className="hidden xl:inline">
                                                                              {moment(new Date(info.time)).format(" Do MMMM YYYY")}{" "}
                                                                        </span>
                                                                        <span className="inline xl:hidden">
                                                                              {moment(new Date(info.time)).format("DD / MM / YYYY")}{" "}
                                                                        </span>
                                                                  </p>
                                                            </div>
                                                      );
                                                })}
                                          </div>
                                    </div>
                              );
                        })}
                  </div>
            </>
      );
};

export default ViewGroupAnswer;
