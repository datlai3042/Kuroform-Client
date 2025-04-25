import { RootState } from "@/app/_lib/redux/store";
import { FormCore, InputCore as TInputCore, UI } from "@/type";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputCore from "../InputCore";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import Calendar from "@/app/(NextClient)/test/calendar/Calendar";
import { generateFullDateString, generateFullDateStringV2 } from "@/app/utils/time.utils";
import { CalendarCheckIcon, CalendarDays } from "lucide-react";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";

type TProps = {
      inputItem: TInputCore.InputDate.InputTypeDate;
};

const InputCoreDate = (props: TProps) => {
      const { inputItem } = props;
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
      const form_mode_display = formCore.form_mode_display === "custom";

      const [openModel, setOpenModel] = useState<boolean>(false);

      const date = new Date();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      const [pickDate, setPickDate] = useState({
            day,
            month,
            year,
            date_string: generateFullDateString({ day, month, year }),
      });

      const handleOnChange = (value: UI.Calender.Event.DateResult) => {
            const { day, month, date_string, year } = value;
            setPickDate({ day, month, year, date_string });
            setOpenModel(false);
      };

      const actionCancle = () => {
            setOpenModel(false);
            setPickDate({ day, month, year, date_string: generateFullDateString({ day, month, year }) });
      };

      const dateRender = generateFullDateStringV2({ day: pickDate.day, month: pickDate.month, year: pickDate.year });

      const InputDate = (
            <DivNative className="relative  bg-transparent flex flex-col items-start gap-[1rem] text-text-theme ">
                  <button
                        onClick={() => setOpenModel((prev) => !prev)}
                        className="bg-color-main text-[#fff] p-[.6rem] rounded-[.4rem] flex items-center gap-[1rem] text-[1.3rem]"
                  >
                        <span>{dateRender}</span>
                        <CalendarDays size={18} />
                  </button>
                  {openModel && (
                        <div className="absolute z-[3] top-0 xl:top-[64%] right-[50%] xl:right-[33%] ">
                              <ClickOutSide setOpenModel={setOpenModel}>
                                    <Calendar onChange={handleOnChange} callbackCancel={actionCancle} />
                              </ClickOutSide>
                        </div>
                  )}

                  <p style={{ color: formCore.form_input_styles.color || "var(--text-text-theme)" }} className="text-[1.3rem]">
                        Thời gian đang chọn là:
                        <span className="text-color-main font-semibold"> {dateRender}</span>
                  </p>
            </DivNative>
      );

      return (
            <InputCore InputComponent={InputDate} inputItem={inputItem} inputTitle={inputItem.input_title || ""} dataTextTitle="Thêm mô tả về ngày được chọn" />
      );
};

export default InputCoreDate;
