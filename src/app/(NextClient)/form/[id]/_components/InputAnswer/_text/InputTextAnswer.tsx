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
import BoxHandlerInputAnswerError from "../../BoxHandlerInputAnswerError";
import BoxHandlerInputAnswerErrorMsg from "../../BoxHandlerInputAnswerErrorMsg";
import InputContent from "../InputContent";

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

      const [write, setWrite] = useState<boolean>(false);

      //Xem input này có bắt buộc nhập không
      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      const divContentRef = useRef<HTMLDivElement | null>(null);

      const onFocus = () => {
            setWrite(true);

            deleteErrorWhenFocus({ setFormAnswer, inputFormErrors, inputItem });
      };

      const onBlur = (e: React.ChangeEvent<HTMLDivElement>) => {
            //check write, tráng trường hợp bắt lỗi ngay khi user chưa nhập
            if (write) {
                  //lấy value input để validate
                  if (divContentRef.current) {
                        const titleCurrent = divContentRef.current.textContent;

                        validateWhenFocus<InputCore.InputText.InputSettingText>({
                              inputItem,
                              inputValue: titleCurrent as string,
                              setFormAnswer,
                              validateCallback: superTextValidate,
                              description: titleCurrent as string,
                        });
                  }
            }
      };

      useEffect(() => {
            if (divContentRef.current) {
                  divContentRef.current.textContent = inputItemInArrayGlobal.input?.value as string;
            }
      }, []);
      const isError = inputItemInArrayGlobal?.globalError?.state;

      return (
            <InputAnswerWrapper formCore={formCore}>
                  <BoxHandlerInputAnswerError inputItemInArrayGlobal={inputItemInArrayGlobal} input_id={inputItem._id!} write={write}>
                        <InputAnswerTitle inputItem={inputItem} formCore={formCore} isError={isError} />
                        <InputContent>
                              <DivNative className="flex flex-col gap-[.3rem]">
                                    <DivNative className={` relative min-h-[3.8rem] h-max flex items-center gap-[.5rem] `}>
                                          <DivNativeRef
                                                style={{
                                                      ...RenderStyleInputAnswer.StyleTitle({
                                                            formCore,
                                                            inputItem,
                                                      }),
                                                }}
                                                ref={divContentRef}
                                                className={` w-[92%]  heading-answer group min-h-[2rem] pb-[1rem] text-[1.7rem] break-words whitespace-pre-wrap h-max border-b-[.1rem] border-[var(--border-color-input)]  outline-none resize-none `}
                                                onClick={() => divContentRef.current?.focus()}
                                                onBlur={(e) => onBlur(e)}
                                                onFocus={onFocus}
                                                spellCheck={false}
                                                contentEditable={submitState !== "pending"}
                                                data-text={`${inputItem.core.setting?.placeholder || "Typing your text"}`}
                                                suppressContentEditableWarning={true}
                                                tabIndex={0}
                                          />
                                    </DivNative>
                                    <p className="absolute bottom-[2.5rem] right-[2.5rem] text-[1.2rem]">
                                          <MinMaxInput value={inputItemInArrayGlobal.input?.value as string} inputItem={inputItem} />
                                    </p>
                              </DivNative>

                              {inputItemInArrayGlobal?.globalError?.state && (
                                    <BoxHandlerInputAnswerErrorMsg inputItem={inputItem} inputItemInArrayGlobal={inputItemInArrayGlobal} />
                              )}
                        </InputContent>
                  </BoxHandlerInputAnswerError>
            </InputAnswerWrapper>
      );
};

export default InputTextAnswer;
