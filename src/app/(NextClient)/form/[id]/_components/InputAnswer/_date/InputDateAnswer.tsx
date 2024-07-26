"use client";
import { FormCore, InputCore, UI } from "@/type";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import InputAnswerWrapper from "../InputAnswerWrapper";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import { superTextValidate } from "../_validate/inputText.validate";
import InputErrorMessage from "../InputError/InputErrorMessage";
import {
      deleteErrorGlobal,
      deleteErrorWhenFocus,
      renderControllerInputAnswer,
      renderErrorInput,
      setDataInputGlobal,
      setErrorGlobal,
      setInputRequireGlobal,
      validateWhenFocus,
} from "../_utils/formAnswer.uti";
import { AtSign, CalendarCheckIcon, CalendarDays, Phone } from "lucide-react";
import Calendar from "@/app/(NextClient)/test/calendar/Calendar";
import { generateFullDateString, generateFullDateStringV2 } from "@/app/utils/time.utils";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { superDateValidate } from "../_validate/inputDate.validate";
import InputAnswerTitle from "../../InputAnswerTitle";

type TProps = {
      inputItem: InputCore.InputDate.InputTypeDate;
      formCore: FormCore.Form;
};

const InputDateAnswer = (props: TProps) => {
      const { inputItem, formCore } = props;

      const {
            formAnswer: { inputFormErrors, inputFormData, submitState },
            setFormAnswer,
      } = useContext(FormAnswerContext);

      const [error, setError] = useState<FormCore.FormAnswer.InputError>(() => {
            return renderErrorInput(inputFormErrors, inputItem);
      });
      const [write, setWrite] = useState<boolean>(false);

      //Xem input này có bắt buộc nhập không

      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      //focus -> write = true
      //xóa lỗi local, xóa lỗi global
      //đặt lại cờ require trong global bằng false
      //xét data global
      const onFocus = () => {
            //Xét write ?
            setWrite(true);

            deleteErrorWhenFocus({ error, setError, setFormAnswer, inputFormErrors, inputItem });
      };

      const [inputValue, setInputValue] = useState<string>(() => inputFormData.filter((data) => data._id === inputItem._id)[0].value as string);

      const [openModel, setOpenModel] = useState<boolean>(false);

      let date;
      if (inputValue) {
            date = new Date(inputValue);
      } else {
            date = new Date();
      }

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
            if (write) {
                  //lấy value input để validate
                  if (date_string) {
                        validateWhenFocus<InputCore.InputDate.InputSettingDate>({
                              inputItem,
                              inputValue: new Date(date_string).toISOString(),
                              setError,
                              setFormAnswer,
                              validateCallback: superDateValidate,
                        });
                  }
            }
      };

      const actionCancle = () => {
            setOpenModel(false);
            setPickDate({ day, month, year, date_string: generateFullDateString({ day, month, year }) });
      };

      const dateRender = generateFullDateStringV2({ day: pickDate.day, month: pickDate.month, year: pickDate.year });

      return (
            <InputAnswerWrapper>
                  <DivNative
                        id={`_inputid_${inputItem._id}`}
                        className={` relative w-full min-h-full h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[2rem]  rounded-lg`}
                  >
                        <InputAnswerTitle inputItem={inputItem} formCore={formCore} />
                        <DivNative className="relative flex flex-col items-start gap-[1rem] text-[#000] ">
                              <button
                                    onClick={() => setOpenModel((prev) => !prev)}
                                    className="bg-color-main text-[#fff] p-[.5rem_1rem] rounded-xl flex items-center gap-[1rem] text-[1.3rem]"
                              >
                                    <span>{dateRender}</span>
                                    <CalendarDays />
                              </button>
                              {openModel && (
                                    <div className="absolute z-[3] top-0 xl:top-[64%] right-[50%] xl:right-[33%] " onFocus={onFocus}>
                                          <ClickOutSide setOpenModel={setOpenModel}>
                                                <Calendar onChange={handleOnChange} callbackCancel={actionCancle} initialDate={date} />
                                          </ClickOutSide>
                                    </div>
                              )}
                              <p className="text-[1.3rem]">
                                    Thời gian đang chọn là:
                                    <span className="text-color-main font-semibold"> {dateRender}</span>
                              </p>
                        </DivNative>

                        {(error.error || inputItemInArrayGlobal?.globalError?.state) && (
                              <InputErrorMessage
                                    message={inputItemInArrayGlobal?.globalError?.message || error.message}
                                    type={inputItemInArrayGlobal?.globalError?.type || error.type}
                              />
                        )}
                  </DivNative>
            </InputAnswerWrapper>
      );
};

export default InputDateAnswer;
