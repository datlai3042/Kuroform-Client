"use client";

import { RootState } from "@/app/_lib/redux/store";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AnswerDetailModel from "./_components/AnswerDetailModel";
import { FormCore, InputCore } from "@/type";
import AnalysisAnswer from "./_components/AnalysisAnswer";
import NotFoundPage from "@/app/(NextClient)/_components/_StatusCodeComponent/NotFoundPage";
import FormEmptyResponse from "@/app/(NextClient)/_components/_StatusCodeComponent/FormEmptyResponse";
import { Select, Table } from "antd";
import ViewGroupAnswer from "./_components/ViewGroupAnswer";
import ViewOnceAnswer from "./_components/ViewOnceAnswer";
import ContentWrapper from "../ContentWrapper";

moment.locale("vi");

const SummaryFormPage = () => {
      const { form_id_current } = useSelector((state: RootState) => state.dataFormHandler);

      const formCache = useSelector((state: RootState) => state.dataFormHandler.form_cache[form_id_current]);

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const formAnswer = useSelector((state: RootState) => state.formAsnwer.formAnswerStore[form_id_current]);
      const [openDetailAnswer, setOpenDetailAnswer] = useState<boolean>(false);
      const [formAnswerDetail, setFormAnswerDetail] = useState<FormCore.FormAnswer.OneReport | null>(null);
      const [typeView, setTypeView] = useState<"Group" | "Once">("Once");

    
      const { dataGroupFilter, dataExcel } = formCache;
      return (
            <div className="h-full flex flex-col gap-[1.6rem]">
                  <Select<"Group" | "Once">
                        className="customSelect"
                        placeholder="Chọn loại hiển thị"
                        defaultValue="Once"
                        style={{ width: 240 }}
                        onChange={(value) => setTypeView(value)}
                        options={[
                              { value: "Once", label: "Xem phản hồi của từng phiếu" },
                              { value: "Group", label: "Xem gom nhóm theo câu trả lời" },
                        ]}
                  />

                  <div className="mt-[1rem]  flex-1 flex flex-col gap-[2.6rem]   text-text-theme overflow-auto ">
                        {formAnswer && formAnswer.formAnswer && typeView === "Once" && (
                              <ViewOnceAnswer
                                    formAnswer={formAnswer.formAnswer}
                                    formCore={formCore}
                                    setFormAnswerDetail={setFormAnswerDetail}
                                    setOpenDetailAnswer={setOpenDetailAnswer}
                              />
                        )}
                        {formAnswer && typeView === "Group" && (
                              <ViewGroupAnswer
                                    formAnswer={formAnswer.formAnswer as FormCore.FormAnswer.FormAnswerCore}
                                    dataGroupFilter={dataGroupFilter}
                                    setFormAnswerDetail={setFormAnswerDetail}
                                    setOpenDetailAnswer={setOpenDetailAnswer}
                              />
                        )}
                        {formAnswer && openDetailAnswer && formAnswerDetail && (
                              <AnswerDetailModel setOpenModel={setOpenDetailAnswer} formAnswer={formAnswerDetail} time={formAnswerDetail.createdAt} />
                        )}
                        {!formAnswer && <NotFoundPage gap="2rem" />}
                  </div>
            </div>
      );
};

export default SummaryFormPage;
