"use client";
import { FormCore, InputCore } from "@/type";
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
import MinMaxInput from "../../MinMaxInput";
import { superPhoneValidate } from "../_validate/inputPhone.validate";
import { AtSign, Phone } from "lucide-react";
import RenderStyleInputAnswer from "../constant/RenderStyleInputAnswer";
import InputAnswerTitle from "../../InputAnswerTitle";

type TProps = {
      inputItem: InputCore.InputPhone.InputTypePhone;
      formCore: FormCore.Form;
};

const InputPhoneAnswer = (props: TProps) => {
      const { inputItem, formCore } = props;

      const {
            formAnswer: { inputFormErrors, inputFormData, submitState },
            setFormAnswer,
      } = useContext(FormAnswerContext);

      const [write, setWrite] = useState<boolean>(false);
      const [phone, setPhone] = useState<string>(() => inputFormData.filter((data) => data._id === inputItem._id)[0].value as string);

      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      const [error, setError] = useState<FormCore.FormAnswer.InputError>(() => {
            return renderErrorInput(inputFormErrors, inputItem);
      });

      const onFocus = () => {
            setWrite(true);
            deleteErrorWhenFocus({ error, setError, setFormAnswer, inputFormErrors, inputItem });
      };

      const onBlur = () => {
            if (write) {
                  validateWhenFocus<InputCore.InputPhone.InputSettingPhone>({
                        inputItem,
                        inputValue: phone,
                        setError,
                        setFormAnswer,
                        validateCallback: superPhoneValidate,
                  });
            }
      };

      return (
            <InputAnswerWrapper>
                  <DivNative
                        id={`_inputid_${inputItem._id}`}
                        className={` relative w-full min-h-full h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[2rem]  rounded-lg`}
                  >
                        <InputAnswerTitle inputItem={inputItem} formCore={formCore} />
                        <DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
                              <input
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    value={phone ? +phone : ""}
                                    type="number"
                                    className={`${RenderStyleInputAnswer.BorderInputError({
                                          error,
                                    })}  ${RenderStyleInputAnswer.StyleTitle({
                                          formCore,
                                          inputItem,
                                    })} w-[90%] h-full pb-[2rem] border-b-[.1rem] border-gray-300  outline-none text-[1.7rem] placeholder:text-[1.3rem]`}
                                    placeholder="Nhập số điện thoại của bạn"
                                    onChange={(e) => setPhone(e.target.value)}
                              />
                              <DivNative className="absolute z-[2] right-[1rem]" title={""}>
                                    <Phone className=" text-textMain opacity-50" size={18} />
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

export default InputPhoneAnswer;
