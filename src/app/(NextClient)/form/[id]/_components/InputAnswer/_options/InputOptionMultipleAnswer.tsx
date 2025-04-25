import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import InputAnswerWrapper from "../InputAnswerWrapper";
import { FormCore, InputCore } from "@/type";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import {
      deleteErrorGlobal,
      renderControllerInputAnswer,
      renderErrorInput,
      setDataInputGlobal,
      setErrorInputFromGlobal,
      setInputRequireGlobal,
} from "../_utils/formAnswer.uti";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import InputErrorMessage from "../InputError/InputErrorMessage";
import InputAnswerTitle from "../../InputAnswerTitle";
import InputChecked from "@/app/(NextClient)/_components/ui/input/InputChecked";
import BoxHandlerInputAnswerError from "../../BoxHandlerInputAnswerError";
import BoxHandlerInputAnswerErrorMsg from "../../BoxHandlerInputAnswerErrorMsg";
import InputContent from "../InputContent";

type TProps = {
      inputItem: InputCore.InputOptionMultiple.InputTypeOptionMultiple;
      formCore: FormCore.Form;
};

const InputOptionMultipleAnswer = (props: TProps) => {
      const { inputItem, formCore } = props;

      const {
            formAnswer: { inputFormErrors, inputFormData, submitState, inputFormRequire },
            setFormAnswer,
      } = useContext(FormAnswerContext);

      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer<FormCore.FormAnswer.Data.Options>({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      const [choose, setChoose] = useState<{ value: FormCore.FormAnswer.Data.Options["description"] }>(() => {
            return {
                  value: inputItemInArrayGlobal.input?.description || [],
            };
      });

      const onSelect = (op: InputCore.InputOptionMultiple.Options) => {
            deleteErrorGlobal(setFormAnswer, inputItem._id!);

            if (inputItem.core.setting.require) {
                  if (choose.value.map((op) => op.option_id).includes(op.option_id)) {
                        setInputRequireGlobal(setFormAnswer, inputItem._id!, false);
                  } else {
                        setInputRequireGlobal(setFormAnswer, inputItem._id!, true);
                  }
            }
            if (choose.value.map((op) => op.option_id).includes(op.option_id)) {
                  const newArrayOption = choose.value.filter((ops) => {
                        if (ops.option_id === op.option_id) return null;
                        return ops;
                  });
                  setDataInputGlobal({ callback: setFormAnswer, input_id: inputItem._id!, description: newArrayOption, input_value: "" });

                  setChoose((prev) => {
                        return {
                              value: newArrayOption,
                        };
                  });
            } else {
                  const newArrayOption = choose.value.concat(op);

                  setDataInputGlobal({ callback: setFormAnswer, input_id: inputItem._id!, description: newArrayOption, input_value: "" });

                  setChoose(() => {
                        return {
                              value: newArrayOption,
                        };
                  });
            }
      };
      const isError = inputItemInArrayGlobal?.globalError?.state;

      return (
            <InputAnswerWrapper formCore={formCore}>
                  <BoxHandlerInputAnswerError inputItemInArrayGlobal={inputItemInArrayGlobal} input_id={inputItem._id!} write={true}>
                        <InputAnswerTitle formCore={formCore} inputItem={inputItem} isError={isError} />
                        <InputContent>
                              <DivNative className="flex flex-col gap-[.3rem] text-[1.4rem]">
                                    <DivNative className={` relative min-h-[4rem] h-max flex flex-col gap-[1.6rem]  `}>
                                          {
                                                inputItem.core.options.map((op) => {
                                                      if (!op.option_value) return null;
                                                      return (
                                                            <InputChecked
                                                                  key={op.option_id}
                                                                  value={op.option_value}
                                                                  value_current={
                                                                        choose.value.filter((op) => op.option_id === op.option_id)[0]?.option_value || ""
                                                                  }
                                                                  callbackChecked={() => onSelect(op)}
                                                                  name_radio={inputItem._id as string}
                                                                  checked={choose.value.map((op) => op.option_value).includes(op.option_value)}
                                                            />
                                                      );
                                                }) as unknown as React.ReactNode[]
                                          }
                                    </DivNative>
                              </DivNative>
                              {choose.value.map((op) => op.option_value).join(", ") && (
                                    <p className="text-[1.4rem]">
                                          Đã chọn:{" "}
                                          {choose.value.map((op) => op.option_value).join(", ") ? (
                                                <span className="ml-[.4rem] border-b-[.2rem] border-gray-400">
                                                      {choose.value.map((op) => op.option_value).join(", ")}
                                                </span>
                                          ) : (
                                                <span className="ml-[.6rem] border-b-[.2rem] border-color-main uppercase text-color-main font-medium pb-[.4rem]">
                                                      Chưa chọn
                                                </span>
                                          )}
                                    </p>
                              )}
                              {inputItemInArrayGlobal?.globalError?.state && (
                                    <div className="mt-[.8rem]">
                                          <BoxHandlerInputAnswerErrorMsg inputItem={inputItem} inputItemInArrayGlobal={inputItemInArrayGlobal} />
                                    </div>
                              )}
                        </InputContent>
                  </BoxHandlerInputAnswerError>
            </InputAnswerWrapper>
      );
};

export default InputOptionMultipleAnswer;
