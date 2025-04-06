"use client";

import { renderArrayDatesInMonth } from "@/app/utils/ui.utils";
import { UI } from "@/type";
import React, { useEffect, useRef, useState } from "react";
import ButtonSelectTime from "../../_components/ui/button/ButtonSelectTime";
import { generateFullDateString, generateFullDateStringV2 } from "@/app/utils/time.utils";
import Image from "next/image";

const name_in_week = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

type TProps = {
      onChange?: UI.Calender.Event.ChangeEvent;
      callbackCancel?: () => void;
      initialDate?: Date;
};

const Calendar = (props: TProps) => {
      const { onChange, callbackCancel, initialDate = new Date() } = props;

      const [weekRender, setWeekRender] = useState<UI.Calender.RenderDateInMonth[]>([]);

      const month_now = initialDate.getMonth() + 1;
      const today_now = initialDate.getDate();
      const year_now = initialDate.getFullYear();

      const [month, setMonth] = useState(month_now);
      const [year, setYear] = useState(year_now);

      const [pickDate, setPickDate] = useState({
            day: today_now,
            month: month_now,
            year: year_now,
            date_string: generateFullDateString({ day: today_now, month: month_now, year: year_now }),
      });

      useEffect(() => {
            const newWeekRender = renderArrayDatesInMonth({ month, year });
            setWeekRender(newWeekRender);
      }, [month, year]);

      const onChangeDate = (value: number, type: "month" | "year") => {
            if (type === "month") {
                  setMonth(value);
                  return;
            }
            setYear(value);
      };

      const styleEffect = {
            renderStyleDateItem: (dateInfo: UI.Calender.DateInfo) => {
                  const { day, month, year, state } = dateInfo;
                  let active = "bg-color-main text-[#fff]";
                  let active_middle = "bg-blue-300 text-[#fff]";
                  let day_current = "bg-blue-400 text-[#fff]";
                  let first_day = "bg-red-500  text-[#fff] ";
                  const style_normal = "hover:bg-color-main hover:text-[#fff] hover:!opacity-100";

                  if (day === pickDate.day && month === pickDate.month && year === pickDate.year) {
                        return active;
                  }

                  if (day === 1 && state === "current") {
                        return first_day;
                  }
                  if (day === today_now && month === month_now && year === year_now && state === "current") {
                        return day_current;
                  }
                  if (day === 1 && month === month_now && year === year_now && state === "current") {
                        return active_middle;
                  }
                  return style_normal;
            },
      };

      const onChangePickDate = (dateInfo: UI.Calender.DateInfo) => {
            const { day, month, year } = dateInfo;
            const date_string = generateFullDateString({ day, month, year });
            setPickDate({ day, month, year, date_string });
      };

      const onChangeReturn = () => {
            const { day, month, year, date_string } = pickDate;

            if (onChange) {
                  onChange({ day, month, year, date_string });
            }
      };

      return (
            <div
                  onClick={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        ev.nativeEvent.stopImmediatePropagation();
                  }}
                  className=" max-w-full  w-[23rem] xl:w-[44rem] h-max min-h-[33rem] xl:min-h-[31rem] text-[1rem] flex flex-col gap-[.2rem] xl:gap-[1rem]  rounded-2xl  text-[#000]"
            >
                  <div className="w-full flex flex-col xl:flex-row xl:items-center gap-[1rem] justify-between bg-color-main text-[#fff] p-[1.4rem] xl:p-[1.6rem_1.4rem] rounded-[.6rem_.6rem_0rem_0rem]">
                        <span className=" text-[1.3rem]">
                              Ngày đang chọn là: {generateFullDateStringV2({ day: pickDate.day, month: pickDate.month, year: pickDate.year })}{" "}
                        </span>

                        <div className="flex items-center gap-[1rem]  flex-1">
                              <div className="flex-1">
                                    <ButtonSelectTime
                                          month={month}
                                          year={year}
                                          cb={onChangeDate}
                                          className="border-[.1rem] border-[var(--border-color-input)]! flex-1 "
                                    />
                              </div>
                              <Image
                                    src={"/icon_core.png"}
                                    width={20}
                                    height={20}
                                    alt="avatar"
                                    unoptimized={true}
                                    className="hidden sm:inline w-[3rem] h-[3rem] "
                              />
                        </div>
                  </div>
                  <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#fff] flex w-[23rem] xl:w-[44rem] flex-col p-[.8rem] xl:p-[1rem_1.4rem] border-[.1rem] border-[var(--border-color-input)] rounded-[.4rem] "
                  >
                        <div className="w-full flex xl:justify-center">
                              {name_in_week.map((day_name, i) => (
                                    <p className="w-[3.4rem] xl:w-[6rem] h-[3rem]  flex justify-center items-center" key={day_name + i}>
                                          <span className="hidden xl:inline">{day_name}</span>
                                          <span className="inline xl:hidden">
                                                {day_name !== "Chủ nhật" ? day_name.replace("Thứ", "T") : day_name.replace("Chủ nhật", "CN")}
                                          </span>
                                    </p>
                              ))}
                        </div>
                        <div className="w-full flex flex-col xl:items-center text-[1.2rem] gap-[.6rem]">
                              {weekRender.map((week, i) => (
                                    <div key={week.week_count + "week_id" + i} className="flex">
                                          {week.week_menber.map((detail) => (
                                                <div
                                                      key={detail.date_full}
                                                      className="w-[3.4rem] h-[2.8rem] xl:w-[5.8rem] xl:h-[3rem] flex items-center justify-center"
                                                >
                                                      <button
                                                            style={{ opacity: detail.state !== "current" ? ".4" : "1" }}
                                                            onClick={(e) => {
                                                                  e.stopPropagation();
                                                                  setMonth(detail.month);
                                                                  setYear(detail.year);
                                                                  onChangePickDate(detail);
                                                            }}
                                                            className={`${styleEffect.renderStyleDateItem(
                                                                  detail,
                                                            )} w-[2.2rem] h-[2.2rem] xl:w-[3rem] xl:h-[3rem] rounded-full `}
                                                      >
                                                            <span>{detail.day}</span>
                                                      </button>
                                                </div>
                                          ))}
                                    </div>
                              ))}
                        </div>
                  </div>

                  <div className="flex  text-[1.2rem]  flex-col xl:flex-row xl:items-center justify-end gap-[2rem] xl:gap-0 p-[.8rem] xl:px-[1.4rem]">
                        <div className="flex justify-end gap-[.6rem]">
                              <button
                                    onClick={(e) => {
                                          e.stopPropagation();
                                          callbackCancel && callbackCancel();
                                    }}
                                    className="p-[.5rem] text-[1.3rem] xl:p-[.5rem] rounded-[.4rem] bg-red-600 text-[#fff]  min-w-[6rem] opacity-85 hover:opacity-100 "
                              >
                                    Hủy
                              </button>
                              <button
                                    onClick={onChangeReturn}
                                    className="p-[.5rem] text-[1.3rem] xl:p-[.5rem] rounded-[.4rem] bg-color-main text-[#fff]  min-w-[6rem] opacity-85 hover:opacity-100 "
                              >
                                    Xác nhận
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default Calendar;
