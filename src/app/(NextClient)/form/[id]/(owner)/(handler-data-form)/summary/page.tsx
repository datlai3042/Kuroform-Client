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
import { Select, Table } from "antd";
import ViewGroupAnswer from "./_components/ViewGroupAnswer";

moment.locale("vi");

const dataSource = [
      {
            key: "1",
            name: "Mike",
            age: 32,
            address: "10 Downing Street",
      },
      {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
      },
];

const columns = [
      {
            title: "Name",
            dataIndex: "name",
            key: "name",
      },
      {
            title: "Age",
            dataIndex: "age",
            key: "age",
      },
      {
            title: "Address",
            dataIndex: "address",
            key: "address",
      },
];

const SummaryFormPage = () => {
      const { form_id_current } = useSelector((state: RootState) => state.dataFormHandler);

      const formCache = useSelector((state: RootState) => state.dataFormHandler.form_cache[form_id_current]);

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;
      const formAnswerId = window.location.hash.slice(1);
      const formAnswer = useSelector((state: RootState) => state.formAsnwer.formAnswerStore[form_id_current]);

      const [openDetailAnswer, setOpenDetailAnswer] = useState<boolean>(false);
      const [formAnswerDetail, setFormAnswerDetail] = useState<FormCore.FormAnswer.OneReport | null>(null);
      const [typeView, setTypeView] = useState<"Group" | "Once">("Once");

      if (!formCache) return <FormEmptyResponse />;
      const { dataGroupFilter } = formCache;
      console.log({ dataGroupFilter });

      return (
            <div className="flex flex-col gap-[1.8rem]">
                  <Select<"Group" | "Once">
                        placeholder="Chọn loại hiển thị"
                        defaultValue="Once"
                        style={{ width: 240 }}
                        onChange={(value) => setTypeView(value)}
                        options={[
                              { value: "Once", label: "Xem phản hồi của từng phiếu" },
                              { value: "Group", label: "Xem gom nhóm theo câu trả lời" },
                        ]}
                  />
                  <div className="flex flex-col gap-[6rem] min-h-[30rem] max-h-[30vh] pb-[8rem] text-text-theme overflow-auto scroll-color-main ">
                        {formAnswer && typeView === "Once" && <Table dataSource={dataSource} columns={columns} />}
                        {formAnswer && typeView === "Group" && (
                              <ViewGroupAnswer
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
