"use client";
import { RootState } from "@/app/_lib/redux/store";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import * as XLSX from "xlsx";

import "moment/locale/vi"; // without this line it didn't work
import { FormCore } from "@/type";
import NotFoundPage from "@/app/(NextClient)/_components/_StatusCodeComponent/NotFoundPage";
import { stringToSlug } from "@/app/_lib/utils";
import FormEmptyResponse from "@/app/(NextClient)/_components/_StatusCodeComponent/FormEmptyResponse";
moment.locale("vi");

type TProps = {};

const DownloadFormPage = () => {
      const { form_id_current } = useSelector((state: RootState) => state.dataFormHandler);

      const formCache = useSelector((state: RootState) => state.dataFormHandler.form_cache[form_id_current]);

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const formAnswer = useSelector((state: RootState) => state.formAsnwer.formAnswerStore[form_id_current]);

      if (!formCache) return <FormEmptyResponse />;

      const { dataExcel } = formCache;

      const color = formCore.form_title.form_title_color ? formCore.form_title.form_title_color : formCore.form_setting_default.form_title_color_default;
      const handleDownloadExcel = () => {
            const worksheet = XLSX.utils.json_to_sheet(dataExcel);

            let new_workSheet_col: XLSX.ColInfo[] = [];
            dataExcel.map((excel) => {
                  Object.keys(excel).map((value) => {
                        const length_title = value.length;
                        const length_input = excel[value].length + 5;
                        const width = length_input < length_title ? length_title : length_input;
                        new_workSheet_col.push({ width });
                  });
            });
            worksheet["!cols"] = new_workSheet_col;
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            const namefile = stringToSlug(formCore.form_title.form_title_value);

            XLSX.writeFile(workbook, `${namefile}.xlsx`);
      };

      return (
            <>
                  {formAnswer && (
                        <div className=" flex flex-col gap-[2rem] text-text-theme ">
                              <button
                                    onClick={handleDownloadExcel}
                                    style={{ backgroundColor: color }}
                                    className="w-[16rem] h-[4rem] ml-auto flex items-center justify-center text-[#ffffff] rounded-lg "
                              >
                                    Tải File Excel
                              </button>
                        </div>
                  )}

                  {!formAnswer && <NotFoundPage gap="2rem" />}
            </>
      );
};

export default DownloadFormPage;
