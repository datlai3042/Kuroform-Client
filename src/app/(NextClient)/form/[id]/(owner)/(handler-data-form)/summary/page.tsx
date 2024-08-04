"use client";

import { RootState } from "@/app/_lib/redux/store";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work

import React, { useState } from "react";
import { useSelector } from "react-redux";
import AnswerDetailModel from "./_components/AnswerDetailModel";
import { FormCore, InputCore } from "@/type";
import AnalysisAnswer from "./_components/AnalysisAnswer";
import NotFoundPage from "@/app/(NextClient)/_components/_StatusCodeComponent/NotFoundPage";
import FormEmptyResponse from "@/app/(NextClient)/_components/_StatusCodeComponent/FormEmptyResponse";

moment.locale("vi");

const SummaryFormPage = () => {
      const { form_id_current } = useSelector((state: RootState) => state.dataFormHandler);

      const formCache = useSelector((state: RootState) => state.dataFormHandler.form_cache[form_id_current]);

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;
      const formAnswerId = window.location.hash.slice(1);
      const formAnswer = useSelector((state: RootState) => state.formAsnwer.formAnswerStore[form_id_current]);

      const [openDetailAnswer, setOpenDetailAnswer] = useState<boolean>(false);
      const [formAnswerDetail, setFormAnswerDetail] = useState<FormCore.FormAnswer.OneReport | null>(null);

      if (!formCache) return <FormEmptyResponse />;

      const { dataGroupFilter } = formCache;

      return (
            <div className="flex flex-col gap-[6rem] min-h-[30rem] pb-[8rem] text-text-theme overflow-auto scroll-color-main max-h-full">
                  {formAnswer &&
                        Object.keys(dataGroupFilter).map((dt, i) => {
                              const type = dt.split("_#_")[1] as InputCore.InputForm["type"];
                              return (
                                    <div key={dt + i} className="flex flex-col gap-[3rem]  ">
                                          <h3 className="text-[2.4rem] font-medium text-color-main">{dataGroupFilter[dt][0]?.title}</h3>
                                          {type === "OPTION" && <AnalysisAnswer data={dataGroupFilter[dt]} />}
                                          {type === "OPTION_MULTIPLE" && <AnalysisAnswer data={dataGroupFilter[dt]} />}

                                          <div
                                                style={{ "--scorll-form-answer-detail": colorMain } as React.CSSProperties}
                                                className="scroll-form-answer-detail flex flex-col gap-[.8rem] max-h-[30rem] overflow-y-scroll  pb-[.8rem]"
                                          >
                                                {dataGroupFilter[dt].map((info, i) => {
                                                      return (
                                                            <div
                                                                  title="Xem phiếu trả lời này"
                                                                  id={info.form_answer_id}
                                                                  key={info._id + i}
                                                                  onClick={() => {
                                                                        setFormAnswerDetail(() => {
                                                                              return (
                                                                                    formAnswer?.formAnswer?.reports.filter(
                                                                                          (fans) => fans._id === info.form_answer_id,
                                                                                    )[0] || null
                                                                              );
                                                                        });
                                                                        setOpenDetailAnswer(true);
                                                                  }}
                                                                  className={`${
                                                                        formAnswerId === info.form_answer_id ? "bg-color-main text-[#fff]" : ""
                                                                  }  px-[1rem] min-h-[4rem] flex items-center justify-between border-b-[.1rem] border-gray-200 hover:cursor-pointer hover:bg-color-main hover:text-[#fff]`}
                                                            >
                                                                  <span className="min-w-[30%] max-w-[30%] xl:min-w-[50%] xl:max-w-[50%] truncate xl:break-words leading-10">
                                                                        {(typeof info.value === "string" ? info.value : info.value.join(", ")) ||
                                                                              "Người dùng không nhập dữ liệu"}
                                                                  </span>
                                                                  <p className="flex items-center gap-[2rem] opacity-60">
                                                                        <span>{moment(new Date(info.time)).format("h:mm")}</span>
                                                                        <span className="hidden xl:inline">
                                                                              {moment(new Date(info.time)).format(" Do MMMM YYYY")}{" "}
                                                                        </span>
                                                                        <span className="inline xl:hidden">
                                                                              {moment(new Date(info.time)).format(" MM / YYYY")}{" "}
                                                                        </span>
                                                                  </p>
                                                            </div>
                                                      );
                                                })}
                                          </div>
                                    </div>
                              );
                        })}
                  {formAnswer && openDetailAnswer && formAnswerDetail && (
                        <AnswerDetailModel setOpenModel={setOpenDetailAnswer} formAnswer={formAnswerDetail} time={formAnswerDetail.createdAt} />
                  )}

                  {!formAnswer && <NotFoundPage gap="2rem" />}
            </div>
      );
};

export default SummaryFormPage;
