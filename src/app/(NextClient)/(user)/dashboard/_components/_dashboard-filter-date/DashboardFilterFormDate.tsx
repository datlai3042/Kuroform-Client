import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import useGetFormBaseOnDate from "@/app/hooks/form/useGetFormBaseOnDate";
import { generateFullDateString, getDateInMonth } from "@/app/utils/time.utils";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DashboardFilterLoading from "./DashboardFilterLoading";
import DashboardFilterResult from "./DashboardFilterResult";
import FormEmpty from "../FormEmpty";
import Image from "next/image";
import ButtonSelectTime from "@/app/(NextClient)/_components/ui/button/ButtonSelectTime";

const DashboardFilterFormDate = () => {
      const [isDate, setIsDate] = useState(() => {
            const date = new Date();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return {
                  last_day_in_month: getDateInMonth({ month, year }),
                  month,
                  year,
            };
      });

      const getFormBaseOnDate = useGetFormBaseOnDate();

      const onChangeDate = (value: number, type: "month" | "year") => {
            if (type === "month") {
                  const last_day_in_month = getDateInMonth({ month: value, year: isDate.year });
                  return setIsDate((prev) => ({ ...prev, [type]: value, last_day_in_month }));
            }
            return setIsDate((prev) => ({ ...prev, [type]: value }));
      };

      useEffect(() => {
            const time_start_full = generateFullDateString({ day: 1, month: isDate.month, year: isDate.year });
            const time_end_full = generateFullDateString({
                  day: isDate.last_day_in_month,
                  month: isDate.month,
                  year: isDate.year,
            });
            const time_start_query = new Date(time_start_full).toISOString();

            const time_end_query = new Date(time_end_full).toISOString();

            getFormBaseOnDate.mutate({ date_begin: time_start_query, date_over: time_end_query });
      }, []);

      useEffect(() => {
            const time_start_full = generateFullDateString({ day: 1, month: isDate.month, year: isDate.year });
            const time_end_full = generateFullDateString({
                  day: isDate.last_day_in_month,
                  month: isDate.month,
                  year: isDate.year,
            });
            const time_start_query = new Date(time_start_full).toISOString();

            const time_end_query = new Date(time_end_full).toISOString();

            getFormBaseOnDate.mutate({ date_begin: time_start_query, date_over: time_end_query });
      }, [isDate]);

      return (
            <div className="w-full h-full flex flex-col xl:items-end gap-[1rem] xl:px-[1rem] ">
                  <button
                        className="ml-auto w-max max-w-[80%] flex justify-center items-center h-[4.2rem] xl:h-[3.2rem] p-[1rem] bg-color-main text-[#fff] rounded-lg"
                        // onClick={handleActiveFilter}
                  >
                        Tìm kiếm dữ liệu theo ngày
                  </button>

                  <>
                        <ButtonSelectTime cb={onChangeDate} month={isDate.month} year={isDate.year} />
                  </>
                  {getFormBaseOnDate.isSuccess && (
                        <DashboardFilterResult
                              dates_in_month={isDate.last_day_in_month}
                              month={isDate.month}
                              results={getFormBaseOnDate.data.metadata.results}
                        />
                  )}

                  {/* {openModel && (
				<button
					className="ml-auto w-full xl:w-[40%] p-[.8rem] bg-color-main text-[#fff] rounded-lg"
					onClick={handleActiveFilter}
					// onClick={() => setOpenModel((prev) => !prev)}
				>
					Lọc
				</button>
			)} */}

                  {getFormBaseOnDate.isPending && <DashboardFilterLoading />}
            </div>
      );
};

export default DashboardFilterFormDate;
