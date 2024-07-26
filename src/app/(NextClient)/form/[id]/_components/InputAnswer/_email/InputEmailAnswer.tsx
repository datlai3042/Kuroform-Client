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
            return renderControllerInputAnswer({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      const [error, setError] = useState<FormCore.FormAnswer.InputError>(() => {
            return renderErrorInput(inputFormErrors, inputItem);
      });

      const [inputValue, setInputValue] = useState<string>(() => {
            let value: string = "";
            inputFormData.filter((data) => {
                  if (data._id === inputItem._id && data.type === "EMAIL") {
                        value = data.value;
                        return;
                  }
            });
            return value;
      });
      const [write, setWrite] = useState<boolean>(false);

      const onFocus = () => {
            setWrite(true);
            deleteErrorWhenFocus({ error, setError, setFormAnswer, inputFormErrors, inputItem });
      };

      const onBlur = () => {
            if (write) {
                  validateWhenFocus<InputCore.InputText.InputSettingText>({
                        inputItem,
                        inputValue,
                        setError,
                        setFormAnswer,
                        validateCallback: superEmailValidate,
                  });
            }
      };

      return (
            <InputAnswerWrapper>
                  <DivNative
                        id={`_inputid_${inputItem._id}`}
                        className={`${RenderStyleInputAnswer.BorderWrapperError({
                              error,
                              inputItemInArrayGlobal,
                        })} relative inputAnswer w-full min-h-full h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[2rem]   rounded-lg`}
                  >
                        <InputAnswerTitle formCore={formCore} inputItem={inputItem} />
                        <DivNative className="flex flex-col gap-[.3rem]">
                              <DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
                                    <input
                                          disabled={submitState === "pending"}
                                          defaultValue={inputValue}
                                          className={`${RenderStyleInputAnswer.BorderInputError({ error })}
							)}  ${RenderStyleInputAnswer.StyleTitle({
                                                formCore,
                                                inputItem,
                                          })} w-[90%] h-full pb-[2rem] border-b-[.1rem] border-gray-300  outline-none text-[1.7rem] placeholder:text-[1.3rem]`}
                                          onChange={(e) => setInputValue(e.target.value)}
                                          onFocus={onFocus}
                                          onBlur={onBlur}
                                          placeholder={inputItem.core.setting.placeholder}
                                    />
                                    <DivNative className="absolute z-[2] right-[1rem]" title={""}>
                                          <AtSign className=" text-textMain opacity-50" size={18} />
                                    </DivNative>
                              </DivNative>
                        </DivNative>
                        {(error.error || inputItemInArrayGlobal.globalError.state) && (
                              <InputErrorMessage
                                    message={inputItemInArrayGlobal.globalError.message || error.message}
                                    type={inputItemInArrayGlobal.globalError.type || error.type}
                              />
                        )}
                  </DivNative>
            </InputAnswerWrapper>
      );
};

export default InputEmailAnswer;
