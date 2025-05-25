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
import BoxHandlerInputAnswerError from "../../BoxHandlerInputAnswerError";
import BoxHandlerInputAnswerErrorMsg from "../../BoxHandlerInputAnswerErrorMsg";
import InputContent from "../InputContent";
import { renderInputStyles } from "@/app/utils/form.utils";

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

      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer<FormCore.FormAnswer.Data.Phone>({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      const [phone, setPhone] = useState<string>(inputItemInArrayGlobal.input?.value || "");

      const onFocus = () => {
            setWrite(true);
            deleteErrorWhenFocus({ setFormAnswer, inputFormErrors, inputItem });
      };

      const onBlur = () => {
            if (write) {
                  validateWhenFocus<InputCore.InputPhone.InputSettingPhone>({
                        inputItem,
                        inputValue: phone,
                        setFormAnswer,
                        validateCallback: superPhoneValidate,
                        description: phone,
                  });
            }
      };
      const isError = inputItemInArrayGlobal?.globalError?.state;
      const isGoogleForm = formCore.form_styles === "GOOGLE_FORM" ? true : false;
      const styleWrapper = renderInputStyles(formCore?.form_input_styles, formCore);

      return (
            <InputAnswerWrapper formCore={formCore} inputItem={inputItem}>
                  <BoxHandlerInputAnswerError formCore={formCore} inputItemInArrayGlobal={inputItemInArrayGlobal} input_id={inputItem._id!} write={write}>
                        <InputAnswerTitle inputItem={inputItem} formCore={formCore} isError={isError} />
                        <InputContent formCore={formCore}>
                              <DivNative
                                    style={{ ...styleWrapper }}
                                    className={`${
                                          isGoogleForm ? "" : " p-[.8rem_2.6rem]  rounded-inherit-[.8rem]"
                                    } relative min-h-[3.8rem] h-max flex items-center gap-[.5rem] `}
                              >
                                    <input
                                          style={{
                                                ...RenderStyleInputAnswer.StyleTitle({
                                                      formCore,
                                                      inputItem,
                                                }),
                                          }}
                                          onFocus={onFocus}
                                          onBlur={onBlur}
                                          value={phone ? +phone : ""}
                                          type="number"
                                          className={` ${
                                                formCore.form_styles === "GOOGLE_FORM" ? "bg-color-section-theme  w-[55%]" : "bg-transparent w-[90%]"
                                          }  border-b-[.1rem] h-full py-[1.2rem]  border-[var(--border-color-input)] "" placeholder:opacity-65    outline-none text-[1.7rem] placeholder:text-[1.3rem]`}
                                          placeholder="Nhập số điện thoại của bạn"
                                          onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <DivNative className="absolute z-[2] top-[50%] right-[1rem]" title={""}>
                                          <Phone className="  opacity-50" size={18} />
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

export default InputPhoneAnswer;
