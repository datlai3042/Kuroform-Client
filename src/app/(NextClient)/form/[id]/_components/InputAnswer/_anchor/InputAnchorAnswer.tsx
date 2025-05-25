"use client";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormCore, InputCore } from "@/type";
import { AtSign } from "lucide-react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import InputAnswerWrapper from "../InputAnswerWrapper";

import styled from "styled-components";
import { REQUIRE_ERROR } from "@/app/_constant/input.constant";
import InputErrorMessage from "../InputError/InputErrorMessage";
import { superEmailValidate } from "../_validate/inputEmail.validate";
import { deleteErrorGlobal, deleteErrorWhenFocus, renderControllerInputAnswer, renderErrorInput, validateWhenFocus } from "../_utils/formAnswer.uti";
import MinMaxInput from "../../MinMaxInput";
import InputAnswerTitle from "../../InputAnswerTitle";
import RenderStyleInputAnswer from "../constant/RenderStyleInputAnswer";
import InputValidateSuccess from "../../_common/InputValidateSuccess";
import superAnchorValidate from "../_validate/inputAnchor.validate";
import BoxHandlerInputAnswerError from "../../BoxHandlerInputAnswerError";
import BoxHandlerInputAnswerErrorMsg from "../../BoxHandlerInputAnswerErrorMsg";
import InputContent from "../InputContent";
import { renderInputStyles } from "@/app/utils/form.utils";

type TProps = {
      inputItem: InputCore.InputAnchor.InputTypeAnchor;
      formCore: FormCore.Form;
};

export type InputErrorType = "REQUIRE" | "INVAILD" | null;

const InputAnchorAnswer = (props: TProps) => {
      const { inputItem, formCore } = props;

      const {
            formAnswer: { inputFormErrors, inputFormData },
            setFormAnswer,
      } = useContext(FormAnswerContext);

      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer<FormCore.FormAnswer.Data.Anchor>({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors]);

      const [_validate, setValidate] = useState<boolean>(false);

      const [inputValue, setInputValue] = useState<string>(inputItemInArrayGlobal.input?.value || "");
      const [write, setWrite] = useState<boolean>(false);

      const onFocus = () => {
            setWrite(true);
            deleteErrorWhenFocus({ setFormAnswer, inputFormErrors, inputItem });
      };

      const onBlur = () => {
            if (write) {
                  validateWhenFocus<InputCore.InputAnchor.InputSettingAnchor>({
                        inputItem,
                        inputValue,
                        setFormAnswer,
                        validateCallback: superAnchorValidate,
                        description: inputValue as string,
                  });
            }
      };

      const onValidate = () => {
            const { _next, message, type } = validateWhenFocus<InputCore.InputAnchor.InputSettingAnchor>({
                  inputItem,
                  inputValue,
                  setFormAnswer,
                  validateCallback: superAnchorValidate,
                  description: inputValue,
            });
            setValidate(_next);
            if (_next) {
                  if (inputFormErrors.some((ip) => ip._id === inputItem._id)) {
                        deleteErrorGlobal(setFormAnswer, inputItem._id!);
                  }
            }
      };

      const onChangeValue = (valueInput: string) => {
            setInputValue(valueInput);
      };
      const isError = inputItemInArrayGlobal?.globalError?.state;
      const isGoogleForm = formCore.form_styles === "GOOGLE_FORM" ? true : false;
      const styleWrapper = renderInputStyles(formCore?.form_input_styles, formCore);

      return (
            <InputAnswerWrapper formCore={formCore} inputItem={inputItem}>
                  <BoxHandlerInputAnswerError formCore={formCore} inputItemInArrayGlobal={inputItemInArrayGlobal} input_id={inputItem._id!} write={write}>
                        <InputAnswerTitle formCore={formCore} inputItem={inputItem} isError={isError} />
                        <InputContent formCore={formCore}>
                              <DivNative className={`${isGoogleForm ? "" : "  rounded-inherit-[.8rem]"} w-full flex flex-col gap-[1rem]  `}>
                                    <DivNative
                                          style={{ ...styleWrapper }}
                                          className={` relative min-h-[3.8rem] p-[.6rem_.4rem] h-max flex items-center gap-[.5rem] border-[.1rem] border-[var(--border-color-input)] rounded-[.4rem] bg-transparent `}
                                    >
                                          <input
                                                style={{
                                                      ...RenderStyleInputAnswer.StyleTitle({
                                                            formCore,
                                                            inputItem,
                                                      }),
                                                }}
                                                onBlur={onBlur}
                                                onFocus={onFocus}
                                                value={inputValue}
                                                onChange={(e) => onChangeValue(e.target.value)}
                                                className={` ${
                                                      formCore.form_styles === "GOOGLE_FORM" ? "bg-color-section-theme  w-[55%]" : "bg-transparent w-[90%]"
                                                } pr-[2rem] placeholder:text-[1.4rem] "" placeholder:opacity-65 heading-answer group min-h-[3.8rem] px-[1rem] flex items-center   break-words whitespace-pre-wrap  outline-none resize-none `}
                                                placeholder="Nhập đường dẫn liên kết của bạn"
                                          />
                                          <div className="absolute z-[2] right-[1rem]  opacity-70">www</div>
                                    </DivNative>
                                    <div className="flex flex-col  gap-[1rem]   justify-center">
                                          {write && _validate && !inputItemInArrayGlobal.globalError.state && (
                                                <InputValidateSuccess message={"Đường dẫn hợp lệ"} />
                                          )}
                                          {/* <button
                                                onClick={onValidate}
                                                className="ml-auto w-max flex items-center justify-center p-[.5rem_.8rem] bg-color-main rounded-[.4rem] text-[1.4rem] text-[#ffffff]"
                                          >
                                                Kiểm tra
                                          </button> */}
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

export default InputAnchorAnswer;
