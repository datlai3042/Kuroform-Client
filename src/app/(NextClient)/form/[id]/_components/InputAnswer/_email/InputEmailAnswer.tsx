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
import { deleteErrorWhenFocus, renderControllerInputAnswer, renderErrorInput, validateWhenFocus } from "../_utils/formAnswer.uti";
import MinMaxInput from "../../MinMaxInput";
import InputAnswerTitle from "../../InputAnswerTitle";
import RenderStyleInputAnswer from "../constant/RenderStyleInputAnswer";
import BoxHandlerInputAnswerError from "../../BoxHandlerInputAnswerError";
import BoxHandlerInputAnswerErrorMsg from "../../BoxHandlerInputAnswerErrorMsg";
import InputContent from "../InputContent";

type TProps = {
      inputItem: InputCore.InputEmail.InputTypeEmail;
      formCore: FormCore.Form;
};

export type InputErrorType = "REQUIRE" | "INVAILD" | null;

const InputEmailAnswer = (props: TProps) => {
      const { inputItem, formCore } = props;

      const {
            formAnswer: { inputFormErrors, inputFormData, submitState },
            setFormAnswer,
      } = useContext(FormAnswerContext);

      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer<FormCore.FormAnswer.Data.Email>({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      const [inputValue, setInputValue] = useState<string>(inputItemInArrayGlobal.input?.value || "");

      const [write, setWrite] = useState<boolean>(false);

      const onFocus = () => {
            setWrite(true);
            deleteErrorWhenFocus({ setFormAnswer, inputFormErrors, inputItem });
      };

      console.log({write})
      const onBlur = () => {
            if (write) {
                  validateWhenFocus<InputCore.InputText.InputSettingText>({
                        inputItem,
                        inputValue,
                        setFormAnswer,
                        validateCallback: superEmailValidate,
                        description: inputValue as string,
                  });
            }
      };
      const isError = inputItemInArrayGlobal?.globalError?.state;

      return (
            <InputAnswerWrapper>
                  <BoxHandlerInputAnswerError inputItemInArrayGlobal={inputItemInArrayGlobal} input_id={inputItem._id!} write={write}>
                        <InputAnswerTitle formCore={formCore} inputItem={inputItem} isError={isError} />
                        <InputContent>
                              <DivNative className="flex flex-col gap-[.3rem]">
                                    <DivNative className={` relative min-h-[3.6rem] h-max flex items-center gap-[.5rem] `}>
                                          <input
                                                disabled={submitState === "pending"}
                                                defaultValue={inputValue}
                                                className={`
							)}  ${RenderStyleInputAnswer.StyleTitle({
                                                formCore,
                                                inputItem,
                                          })}  w-[55%] bg-color-section-theme text-text-theme border-b-[.1rem] border-[var(--border-color-input)] h-full pb-[1rem]   outline-none text-[1.7rem] placeholder:text-[1.3rem]`}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onFocus={onFocus}
                                                onBlur={onBlur}
                                                placeholder={inputItem.core.setting.placeholder}
                                          />
                                          <DivNative className="absolute z-[2] right-[1rem]" title={""}>
                                                <AtSign className=" text-text-theme opacity-50" size={18} />
                                          </DivNative>
                                    </DivNative>
                              </DivNative>
                              {inputItemInArrayGlobal?.globalError?.state && (
                                    <BoxHandlerInputAnswerErrorMsg inputItem={inputItem} inputItemInArrayGlobal={inputItemInArrayGlobal} />
                              )}
                        </InputContent>
                  </BoxHandlerInputAnswerError>
            </InputAnswerWrapper>
      );
};

export default InputEmailAnswer;
