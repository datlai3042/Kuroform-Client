"use client";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { generateFullDateString, generateFullDateStringV2 } from "@/app/utils/time.utils";
import { FormCore, InputCore, UI } from "@/type";
import { CalendarDays } from "lucide-react";
import { useContext, useMemo, useState } from "react";
import BoxHandlerInputAnswerError from "../../BoxHandlerInputAnswerError";
import BoxHandlerInputAnswerErrorMsg from "../../BoxHandlerInputAnswerErrorMsg";
import InputAnswerTitle from "../../InputAnswerTitle";
import { deleteErrorWhenFocus, renderControllerInputAnswer, validateWhenFocus } from "../_utils/formAnswer.uti";
import { superDateValidate } from "../_validate/inputDate.validate";
import InputAnswerWrapper from "../InputAnswerWrapper";
import Calendar from "@/app/(NextClient)/test/calendar/Calendar";
import InputContent from "../InputContent";
import RenderStyleInputAnswer from "../constant/RenderStyleInputAnswer";
import { renderInputStyles } from "@/app/utils/form.utils";

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

      const [write, setWrite] = useState<boolean>(false);

      //Xem input này có bắt buộc nhập không

      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer<FormCore.FormAnswer.Data.Date>({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      const [inputValue, setInputValue] = useState<string>(inputItemInArrayGlobal.input?.value || "");

      const onFocus = () => {
            //Xét write ?
            setWrite(true);

            deleteErrorWhenFocus({ setFormAnswer, inputFormErrors, inputItem });
      };

      const [openModel, setOpenModel] = useState<boolean>(false);

      let date = undefined;
      if (inputValue) {
            date = new Date(inputValue);
      }

      const [pickDate, setPickDate] = useState(() => {
            if (!date) {
                  return null;
            }
            const month = date!.getMonth() + 1;
            const day = date!.getDate();
            const year = date!.getFullYear();
            return {
                  day,
                  month,
                  year,
                  date_string: generateFullDateString({ day, month, year }),
            };
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
                              setFormAnswer,
                              validateCallback: superDateValidate,
                              description: new Date(date_string).toISOString(),
                        });
                  }
            }
      };

      const actionCancle = () => {
            setOpenModel(false);
            // setPickDate({ day, month, year, date_string: generateFullDateString({ day, month, year }) });
      };

      const dateRender = pickDate ? generateFullDateStringV2({ day: pickDate.day, month: pickDate.month, year: pickDate.year }) : null;

      const isError = write || inputItemInArrayGlobal?.globalError?.state;
      const isGoogleForm = formCore.form_styles === "GOOGLE_FORM" ? true : false;
      const styleWrapper = renderInputStyles(formCore?.form_input_styles, formCore);

      return (
            <InputAnswerWrapper formCore={formCore} inputItem={inputItem}>
                  <BoxHandlerInputAnswerError formCore={formCore} inputItemInArrayGlobal={inputItemInArrayGlobal} input_id={inputItem._id!} write={write}>
                        <InputAnswerTitle inputItem={inputItem} formCore={formCore} isError={isError} />
                        <InputContent formCore={formCore}>
                              <DivNative
                                    className={`${
                                          formCore.form_styles === "GOOGLE_FORM" ? "" : "  rounded-inherit-[.8rem]"
                                    } relative flex flex-col mt-[1.4rem]   justify-between gap-[.8rem] `}
                              >
                                    <div
                                          style={{ ...styleWrapper }}
                                          className={`${
                                                isGoogleForm ? "" : " p-[0rem_1rem]  rounded-inherit-[.8rem]"
                                          } relative min-h-[4.8rem] h-max flex justify-between items-center gap-[.5rem] `}
                                    >
                                          {dateRender && (
                                                <>
                                                      <span className=" font-semibold text-[1.4rem]"> {dateRender}</span>
                                                </>
                                          ) }

                                          <button
                                                style={{ backgroundColor: formCore.form_input_styles.color, color: "#fff" }}
                                                onClick={() => setOpenModel((prev) => !prev)}
                                                className="relative ml-auto w-max bg-color-main  my-[.8rem] text-[#fff] p-[.2rem_.6rem] sm:p-[.5rem_1rem] rounded-[.4rem] flex items-center gap-[.3rem] text-[1.3rem]"
                                          >
                                                {dateRender ? <span>{dateRender}</span> : <span className="whitespace-pre">Click vào để chọn thời gian</span>}
                                                <CalendarDays size={20} className="aspect-square w-[2rem] sm:w-[3rem]" />

                                                {openModel && (
                                                      <div
                                                            className={`${isGoogleForm ? "left-0" : "right-0"} absolute z-[3] top-[4.2rem] xl:top-[110%] `}
                                                            onFocus={onFocus}
                                                      >
                                                            <ClickOutSide setOpenModel={setOpenModel}>
                                                                  <Calendar onChange={handleOnChange} callbackCancel={actionCancle} initialDate={date} />
                                                            </ClickOutSide>
                                                      </div>
                                                )}
                                          </button>
                                    </div>
                                 
                              </DivNative>

                              {inputItemInArrayGlobal?.globalError?.state && (
                                    <BoxHandlerInputAnswerErrorMsg inputItem={inputItem} inputItemInArrayGlobal={inputItemInArrayGlobal} />
                              )}
                        </InputContent>
                  </BoxHandlerInputAnswerError>
            </InputAnswerWrapper>
      );
};

export default InputDateAnswer;
