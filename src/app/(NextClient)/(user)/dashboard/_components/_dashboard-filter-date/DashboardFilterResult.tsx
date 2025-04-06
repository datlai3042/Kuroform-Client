import { renderArrayFormFilterDate } from "@/app/utils/form.utils";
import { decodeGetDateInMonth } from "@/app/utils/time.utils";
import { FormCore } from "@/type";
import React, { useState } from "react";
import DashboardFilterDetails from "./DashboardFilterDetails";

type TProps = {
      dates_in_month: number;
      results: FormCore.Form[];
      month: number;
};

const DashboardFilterResult = (props: TProps) => {
      const { dates_in_month, results, month } = props;
      const { data_in_month, filter_form } = renderArrayFormFilterDate({ dates_in_month, results });
      const [openModelDetail, setOpenModelDetail] = useState<boolean>(false);
      const [selectData, setSelectData] = useState<{ forms: FormCore.Form[]; date_full: string } | undefined>(undefined);

      const handleSelectData = (forms: FormCore.Form[], date_full: string) => {
            setOpenModelDetail(true);
            setSelectData({ date_full, forms });
      };

      let form_create_in_month = 0;
      if (data_in_month.length > 0) {
            form_create_in_month = data_in_month.reduce((acc, form_item) => {
                  return acc + (form_item.forms?.length ? form_item.forms.length : 0);
            }, 0);
      }

      return (
            <>
                  {data_in_month.length > 0 && (
                        <div className="ml-auto flex  flex-wrap justify-end gap-[.4rem]  h-max rounded-xl text-[1.2rem]  xl:text-[1.3rem]">
                              {data_in_month.map((data, i) => {
                                    if (data.match) {
                                          return (
                                                <button
                                                      key={i}
                                                      title={`${data.forms?.length} form được đăng tải, nhấn vào để xem chi tiết`}
                                                      onClick={() => handleSelectData(data.forms!, data.date_full!.toString())}
                                                      className={`bg-color-main text-[#fff] w-[2.4rem] h-[2.4rem] xl:w-[3rem] xl:h-[3rem] flex items-center justify-center rounded-md `}
                                                >
                                                      {data.date_createdAt}
                                                </button>
                                          );
                                    } else {
                                          return (
                                                <button
                                                      key={i}
                                                      title="Không có dữ liệu"
                                                      className={`bg-slate-700 text-[#fff] w-[2.4rem] h-[2.4rem] xl:w-[3rem] xl:h-[3rem] flex items-center justify-center rounded-md `}
                                                >
                                                      {data.date_createdAt}
                                                </button>
                                          );
                                    }
                              })}

                              <div className="text-text-theme w-full flex justify-end items-center flex-wrap ">
                                    <span className="w-max">Bạn đã đang</span>{" "}
                                    <span className="text-color-main mx-[.4rem] font-extrabold">{form_create_in_month}</span> trong
                                    <span>tháng</span> <span className="text-color-main mx-[.4rem] font-extrabold">{month}</span>
                              </div>
                        </div>
                  )}

                  {data_in_month.length === 0 && (
                        // <div className="flex flex-col gap-[1rem]">
                        <div className="ml-auto flex w-[30rem] flex-wrap xl:justify-end gap-[.6rem]    rounded-xl   text-[1.3rem]">
                              {filter_form.map((_, i) => (
                                    <button
                                          key={i}
                                          title="Không có dữ liệu"
                                          className={`bg-slate-700 text-[#fff] w-[2.4rem] h-[2.4rem] xl:w-[3rem] xl:h-[3rem] flex items-center justify-center rounded-md `}
                                    >
                                          {i + 1}
                                    </button>
                              ))}
                              <div className="text-text-theme w-full flex xl:justify-end items-center text-[1.3rem] xl:text-[1.4rem]">Không có form nào được tạo</div>
                        </div>
                  )}

                  {openModelDetail && (
                        <DashboardFilterDetails forms={selectData?.forms!} date_full={selectData?.date_full!} setOpenModel={setOpenModelDetail} />
                  )}
            </>
      );
};

export default DashboardFilterResult;
