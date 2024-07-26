"use client";
import { FormCore, InputCore } from "@/type";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import InputAnswerWrapper from "../InputAnswerWrapper";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import { superTextValidate } from "../_validate/inputText.validate";
import InputErrorMessage from "../InputError/InputErrorMessage";
import { deleteErrorWhenFocus, renderControllerInputAnswer, renderErrorInput, validateWhenFocus } from "../_utils/formAnswer.uti";
import MinMaxInput from "../../MinMaxInput";
import RenderStyleInputAnswer from "../constant/RenderStyleInputAnswer";
import InputAnswerTitle from "../../InputAnswerTitle";

type TProps = {
      inputItem: InputCore.InputText.InputTypeText;
      formCore: FormCore.Form;
};

const InputTextAnswer = (props: TProps) => {
      const { inputItem, formCore } = props;

      const {
            formAnswer: { inputFormErrors, inputFormData, submitState },
            setFormAnswer,
      } = useContext(FormAnswerContext);

      const [error, setError] = useState<FormCore.FormAnswer.InputError>(() => {
            return renderErrorInput(inputFormErrors, inputItem);
      });
      const [write, setWrite] = useState<boolean>(false);
      const [inputValue, setInputValue] = useState<string>(() => {
            let value: string = "";
            inputFormData.filter((data) => {
                  if (data._id === inputItem._id && data.type === "TEXT") {
                        value = data.value;
                        return;
                  }
            });
            return value;
      });

      //Xem input này có bắt buộc nhập không
      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      const divContentRef = useRef<HTMLDivElement | null>(null);

      //focus -> write = true
      //xóa lỗi local, xóa lỗi global
      //đặt lại cờ require trong global bằng false
      //xét data global
      const onFocus = () => {
            //Xét write ?
            setWrite(true);

            deleteErrorWhenFocus({ error, setError, setFormAnswer, inputFormErrors, inputItem });
      };

      const onBlur = (e: React.ChangeEvent<HTMLDivElement>) => {
            //check write, tráng trường hợp bắt lỗi ngay khi user chưa nhập
            if (write) {
                  //lấy value input để validate
                  if (divContentRef.current) {
                        const titleCurrent = divContentRef.current.textContent;
                        setInputValue(divContentRef.current.textContent as string);

                        validateWhenFocus<InputCore.InputText.InputSettingText>({
                              inputItem,
                              inputValue: titleCurrent as string,
                              setError,
                              setFormAnswer,
                              validateCallback: superTextValidate,
                        });
                  }
            }
      };

      useEffect(() => {
            if (divContentRef.current) {
                  divContentRef.current.textContent = inputValue;
            }
      }, []);

      return (
            <InputAnswerWrapper>
                  <DivNative
                        id={`_inputid_${inputItem._id}`}
                        className={`${RenderStyleInputAnswer.BorderInputError({
                              error,
                        })} relative w-full min-h-full h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[2rem]  rounded-lg`}
                  >
                        <InputAnswerTitle inputItem={inputItem} formCore={formCore} />
                        <DivNative className="flex flex-col gap-[.3rem]">
                              <DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
                                    <DivNativeRef
                                          ref={divContentRef}
                                          className={`${RenderStyleInputAnswer.StyleTitle({
                                                formCore,
                                                inputItem,
                                          })} heading-answer group w-full min-h-[2rem] pb-[2rem] text-[1.7rem] break-words whitespace-pre-wrap h-max border-b-[.1rem] border-gray-300 rounded-lg outline-none resize-none `}
                                          onClick={() => divContentRef.current?.focus()}
                                          onBlur={(e) => onBlur(e)}
                                          onFocus={onFocus}
                                          spellCheck={false}
                                          contentEditable={submitState !== "pending"}
                                          defaultValue={inputValue}
                                          onInput={(e) => setInputValue(e.currentTarget.textContent || "")}
                                          data-text={`${inputItem.core.setting?.placeholder || "Typing your text"}`}
                                          suppressContentEditableWarning={true}
                                          tabIndex={0}
                                    ></DivNativeRef>
                              </DivNative>
                              <p className="absolute bottom-[2.5rem] right-[2.5rem] text-[1.2rem]">
                                    <MinMaxInput value={inputValue} inputItem={inputItem} />
                              </p>
                        </DivNative>

                        {(error.error || inputItemInArrayGlobal?.globalError?.state) && (
                              <InputErrorMessage
                                    message={inputItemInArrayGlobal.globalError.message || error.message}
                                    type={inputItemInArrayGlobal.globalError.type || error.type}
                              />
                        )}
                  </DivNative>
            </InputAnswerWrapper>
      );
};

export default InputTextAnswer;
