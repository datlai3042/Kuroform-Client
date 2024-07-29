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
            });

            const { _next, type } = _validate;

            if (_next) {
                  if (inputFormErrors.some((ip) => ip._id === inputItem._id)) {
                        deleteErrorGlobal(setFormAnswer, inputItem._id!);
                  }
            }
      };

      return (
            <InputAnswerWrapper>
                  <BoxHandlerInputAnswerError inputItemInArrayGlobal={inputItemInArrayGlobal} input_id={inputItem._id!} write={true}>
                        <InputAnswerTitle inputItem={inputItem} formCore={formCore} />
                        <DivNative className="relative flex flex-col items-start gap-[1rem] text-[#000] ">
                              <div className="flex flex-col gap-[2rem]">
                                    <ModelAddress
                                          detail={true}
                                          onChange={onChangeAddress}
                                          defaultValue={{
                                                province: {
                                                      label: inputItemInArrayGlobal.input?.value?.addressValidate
                                                            ? inputItemInArrayGlobal.input?.value?.addressValidate[0]?.name_with_type
                                                            : "",
                                                      value: inputItemInArrayGlobal.input?.value?.addressValidate
                                                            ? inputItemInArrayGlobal.input?.value?.addressValidate[0]?.code
                                                            : "",
                                                      name_with_type: inputItemInArrayGlobal.input?.value?.addressValidate
                                                            ? inputItemInArrayGlobal.input?.value?.addressValidate[0]?.name_with_type
                                                            : "",
                                                      path_with_type: inputItemInArrayGlobal.input?.value?.addressValidate
                                                            ? inputItemInArrayGlobal.input?.value?.addressValidate[0]?.path_with_type
                                                            : "",
                                                },
                                                district: {
                                                      label: inputItemInArrayGlobal.input?.value?.addressValidate
                                                            ? inputItemInArrayGlobal.input?.value?.addressValidate[1]?.name_with_type
                                                            : "",
                                                      value: inputItemInArrayGlobal.input?.value?.addressValidate
                                                            ? inputItemInArrayGlobal.input?.value?.addressValidate[1]?.code
                                                            : "",
                                                      name_with_type: inputItemInArrayGlobal.input?.value?.addressValidate
                                                            ? inputItemInArrayGlobal.input?.value?.addressValidate[1]?.name_with_type
                                                            : "",
                                                      path_with_type: inputItemInArrayGlobal.input?.value?.addressValidate
                                                            ? inputItemInArrayGlobal.input?.value?.addressValidate[1]?.path_with_type
                                                            : "",
                                                },
                                                ward: {
                                                      label: inputItemInArrayGlobal.input?.value?.addressValidate
                                                            ? inputItemInArrayGlobal.input?.value?.addressValidate[2]?.name_with_type
                                                            : "",
                                                      value: inputItemInArrayGlobal.input?.value?.addressValidate
                                                            ? inputItemInArrayGlobal.input?.value?.addressValidate[2]?.code
                                                            : "",
                                                      name_with_type: inputItemInArrayGlobal.input?.value?.addressValidate
                                                            ? inputItemInArrayGlobal.input?.value?.addressValidate[2]?.name_with_type
                                                            : "",
                                                      path_with_type: inputItemInArrayGlobal.input?.value?.addressValidate
                                                            ? inputItemInArrayGlobal.input?.value?.addressValidate[2]?.path_with_type
                                                            : "",
                                                },
                                                street: inputItemInArrayGlobal.input?.value.addressString,
                                          }}
                                    />
                                    <div className="flex flex-col h-[8rem] gap-[1rem]   justify-center">
                                          {(!inputItemInArrayGlobal.globalError.state || inputItemInArrayGlobal.input?.value.address_full) && (
                                                <span className="text-[1.4rem]">{inputItemInArrayGlobal.input?.value.address_full}</span>
                                          )}
                                          <button
                                                onClick={() => onChangeAddress(inputItemInArrayGlobal.input?.value!)}
                                                className=" w-[9rem] flex items-center justify-center p-[.8rem] xl:p-[1rem] bg-blue-600 rounded-lg text-[1.2rem] xl:text-[1.4rem] text-[#ffffff]"
                                          >
                                                Xác nhận
                                          </button>
                                    </div>
                              </div>
                        </DivNative>

                        {inputItemInArrayGlobal.globalError.state && (
                              <BoxHandlerInputAnswerErrorMsg inputItem={inputItem} inputItemInArrayGlobal={inputItemInArrayGlobal} />
                        )}
                  </BoxHandlerInputAnswerError>
            </InputAnswerWrapper>
      );
};

export default InputAddressAnswer;
