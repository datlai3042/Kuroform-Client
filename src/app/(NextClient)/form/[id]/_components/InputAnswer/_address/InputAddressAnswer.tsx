"use client";
import { FormCore, InputCore, UI } from "@/type";
import React, { useContext, useEffect, useMemo, useState } from "react";
import InputAnswerWrapper from "../InputAnswerWrapper";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import InputErrorMessage from "../InputError/InputErrorMessage";
import InputAnswerTitle from "../../InputAnswerTitle";
import {
      deleteErrorGlobal,
      deleteErrorWhenFocus,
      renderControllerInputAnswer,
      renderErrorInput,
      setDataInputGlobal,
      setInputRequireGlobal,
      validateWhenFocus,
} from "../_utils/formAnswer.uti";
import ModelAddress from "@/app/(NextClient)/_components/Model/ModelAddress";
import { inititalValueInputAddress } from "@/app/_constant/input.constant";
import superAddressValidate from "../_validate/inputAddress.validate";
import BoxHandlerInputAnswerError from "../../BoxHandlerInputAnswerError";
import BoxHandlerInputAnswerErrorMsg from "../../BoxHandlerInputAnswerErrorMsg";
import InputContent from "../InputContent";

type TProps = {
      inputItem: InputCore.InputAddress.InputTypeAddress;
      formCore: FormCore.Form;
};

const InputAddressAnswer = (props: TProps) => {
      const { inputItem, formCore } = props;
      const {
            formAnswer: { inputFormErrors, inputFormData },
            setFormAnswer,
      } = useContext(FormAnswerContext);

      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer<FormCore.FormAnswer.Data.Address>({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      const onChangeAddress = (address: UI.Address.AddressEnity) => {
            const _validate = validateWhenFocus<InputCore.InputAddress.InputSettingAddress>({
                  inputItem,
                  inputValue: address,
                  setFormAnswer,
                  validateCallback: superAddressValidate,
                  description: address,
            });

            const { _next, type, message } = _validate;

            if (_next) {
                  if (inputFormErrors.some((ip) => ip._id === inputItem._id)) {
                        deleteErrorGlobal(setFormAnswer, inputItem._id!);
                  }
            }
      };
      const isError = inputItemInArrayGlobal?.globalError?.state;
      const isGoogleForm = formCore.form_styles === "GOOGLE_FORM" ? true : false;

      return (
                  <InputAnswerWrapper formCore={formCore} inputItem={inputItem} >
>
                  <BoxHandlerInputAnswerError formCore={formCore} inputItemInArrayGlobal={inputItemInArrayGlobal} input_id={inputItem._id!} write={true}>
                        <InputAnswerTitle inputItem={inputItem} formCore={formCore} isError={isError} />
                        <InputContent>
                              <DivNative
                                    className={`${isGoogleForm ? "" : " p-[2.6rem] bg-[var(--bg-input-ans)] rounded-[.8rem]"} relative flex flex-col items-start gap-[1rem]  `}
                              >
                                    <div className="w-full flex flex-col gap-[1rem] ">
                                          <ModelAddress
                                                detail={true}
                                                onChange={onChangeAddress}
                                                defaultValue={{
                                                      province: {
                                                            label: inputItemInArrayGlobal.input?.description?.addressValidate
                                                                  ? inputItemInArrayGlobal.input?.description?.addressValidate[0]?.name_with_type
                                                                  : "",
                                                            value: inputItemInArrayGlobal.input?.description?.addressValidate
                                                                  ? inputItemInArrayGlobal.input?.description?.addressValidate[0]?.code
                                                                  : "",
                                                            name_with_type: inputItemInArrayGlobal.input?.description?.addressValidate
                                                                  ? inputItemInArrayGlobal.input?.description?.addressValidate[0]?.name_with_type
                                                                  : "",
                                                            path_with_type: inputItemInArrayGlobal.input?.description?.addressValidate
                                                                  ? inputItemInArrayGlobal.input?.description?.addressValidate[0]?.path_with_type
                                                                  : "",
                                                      },
                                                      district: {
                                                            label: inputItemInArrayGlobal.input?.description?.addressValidate
                                                                  ? inputItemInArrayGlobal.input?.description?.addressValidate[1]?.name_with_type
                                                                  : "",
                                                            value: inputItemInArrayGlobal.input?.description?.addressValidate
                                                                  ? inputItemInArrayGlobal.input?.description?.addressValidate[1]?.code
                                                                  : "",
                                                            name_with_type: inputItemInArrayGlobal.input?.description?.addressValidate
                                                                  ? inputItemInArrayGlobal.input?.description?.addressValidate[1]?.name_with_type
                                                                  : "",
                                                            path_with_type: inputItemInArrayGlobal.input?.description?.addressValidate
                                                                  ? inputItemInArrayGlobal.input?.description?.addressValidate[1]?.path_with_type
                                                                  : "",
                                                      },
                                                      ward: {
                                                            label: inputItemInArrayGlobal.input?.description?.addressValidate
                                                                  ? inputItemInArrayGlobal.input?.description?.addressValidate[2]?.name_with_type
                                                                  : "",
                                                            value: inputItemInArrayGlobal.input?.description?.addressValidate
                                                                  ? inputItemInArrayGlobal.input?.description?.addressValidate[2]?.code
                                                                  : "",
                                                            name_with_type: inputItemInArrayGlobal.input?.description?.addressValidate
                                                                  ? inputItemInArrayGlobal.input?.description?.addressValidate[2]?.name_with_type
                                                                  : "",
                                                            path_with_type: inputItemInArrayGlobal.input?.description?.addressValidate
                                                                  ? inputItemInArrayGlobal.input?.description?.addressValidate[2]?.path_with_type
                                                                  : "",
                                                      },
                                                      street: inputItemInArrayGlobal.input?.description?.addressString,
                                                }}
                                          />
                                          <div className="flex flex-col  gap-[1rem]   justify-center">
                                                {!inputItemInArrayGlobal.globalError.state && inputItemInArrayGlobal.input?.description?.address_full && (
                                                      <span className="text-[1.4rem]">{inputItemInArrayGlobal.input?.description?.address_full}</span>
                                                )}
                                                <button
                                                      onClick={() => onChangeAddress(inputItemInArrayGlobal.input?.description!)}
                                                      className="ml-auto w-max flex items-center justify-center p-[.5rem_.8rem] bg-color-main rounded-[.4rem] text-[1.4rem] text-[#ffffff]"
                                                >
                                                      Kiểm tra
                                                </button>
                                          </div>
                                    </div>
                              </DivNative>

                              {inputItemInArrayGlobal.globalError.state && (
                                    <BoxHandlerInputAnswerErrorMsg inputItem={inputItem} inputItemInArrayGlobal={inputItemInArrayGlobal} />
                              )}
                        </InputContent>
                  </BoxHandlerInputAnswerError>
            </InputAnswerWrapper>
      );
};

export default InputAddressAnswer;
