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

      const [error, setError] = useState<FormCore.FormAnswer.InputError>(() => {
            return renderErrorInput(inputFormErrors, inputItem);
      });

      const [inputValue, setInputValue] = useState<string>(() => inputItemInArrayGlobal.input?.value || "");
      const [write, setWrite] = useState<boolean>(false);

      const onFocus = () => {
            setWrite(true);
            deleteErrorWhenFocus({ error, setError, setFormAnswer, inputFormErrors, inputItem });
      };

      const onBlur = () => {
            if (write) {
                  validateWhenFocus<InputCore.InputAnchor.InputSettingAnchor>({
                        inputItem,
                        inputValue,
                        setError,
                        setFormAnswer,
                        validateCallback: superAnchorValidate,
                  });
            }
      };

      const onValidate = () => {
            const { _next, message, type } = validateWhenFocus<InputCore.InputAnchor.InputSettingAnchor>({
                  inputItem,
                  inputValue,
                  setError,
                  setFormAnswer,
                  validateCallback: superAnchorValidate,
            });
            if (_next) {
                  // setControllerInput((prev) => ({ ...prev, error: { message: "" }, validate: true }));
                  if (inputFormErrors.some((ip) => ip._id === inputItem._id)) {
                        deleteErrorGlobal(setFormAnswer, inputItem._id!);
                  }
            } else {
                  // setControllerInput((prev) => ({ ...prev, error: { message }, validate: false }));
            }
      };

      const onChangeValue = (valueInput: string) => {
            setInputValue(valueInput);
            // setControllerInput((prev) => ({ ...prev, value: { href: valueInput } }));
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
                                          onBlur={onBlur}
                                          onFocus={onFocus}
                                          value={inputValue}
                                          onChange={(e) => onChangeValue(e.target.value)}
                                          className="w-full h-full p-[1rem] rounded-lg text-[1.6rem]   border-[.1rem] border-gray-400  outline-none focus:outline-blue-200 focus:border-transparent text-[#000]"
                                          placeholder="Nhập đường dẫn liên kết của bạn"
                                    />
                                    <div className="absolute z-[2] right-[1rem]  opacity-70">www</div>
                              </DivNative>
                              <div className="flex flex-col h-[8rem] gap-[1rem]   justify-center">
                                    {!error && !inputItemInArrayGlobal.globalError.state && <InputValidateSuccess message={"Đường dẫn hợp lệ"} />}
                                    <button
                                          onClick={onValidate}
                                          className=" w-[9rem] flex items-center justify-center p-[.8rem] xl:p-[1rem] bg-blue-600 rounded-lg text-[1.2rem] xl:text-[1.4rem] text-[#ffffff]"
                                    >
                                          Xác nhận
                                    </button>
                              </div>
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

export default InputAnchorAnswer;
