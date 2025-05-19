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
import { AtSign } from "lucide-react";
import InputAnswerTitle from "../../InputAnswerTitle";
import InputRadio from "@/app/(NextClient)/_components/ui/input/InputChecked";
import InputChecked from "@/app/(NextClient)/_components/ui/input/InputChecked";
import BoxHandlerInputAnswerError from "../../BoxHandlerInputAnswerError";
import BoxHandlerInputAnswerErrorMsg from "../../BoxHandlerInputAnswerErrorMsg";
import InputContent from "../InputContent";

type TProps = {
      inputItem: InputCore.InputOption.InputTypeOption;
      formCore: FormCore.Form;
};

const InputOptionAnswer = (props: TProps) => {
      const { inputItem, formCore } = props;

      const {
            formAnswer: { inputFormErrors, inputFormData, submitState },
            setFormAnswer,
      } = useContext(FormAnswerContext);

      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer<FormCore.FormAnswer.Data.Option>({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      const [choose, setChoose] = useState<{ option_id: string; option_value: string | string[] }>(() => {
            return {
                  option_id: inputItemInArrayGlobal.input?.description?.option_id || "",
                  option_value: (inputItemInArrayGlobal.input?.description?.option_value as string) || "",
            };
      });

      useEffect(() => {
            const valueInStore = inputItemInArrayGlobal.input?.description;
            setChoose({ option_id: valueInStore?.option_id as string, option_value: valueInStore?.option_value as string });
      }, []);

      const onSelect = (op: InputCore.InputOption.Options) => {
            deleteErrorGlobal(setFormAnswer, inputItem._id!);
            if (inputItem.core.setting.require) {
                  setInputRequireGlobal(setFormAnswer, inputItem._id!, true);
            }
            if (op.option_value === choose.option_value) {
                  setChoose({ option_id: "", option_value: "" });
                  setDataInputGlobal({ callback: setFormAnswer, input_id: inputItem._id!, description: { option_id: "", option_value: "" }, input_value: "" });

                  return;
            }

            setChoose({ option_id: op.option_id, option_value: op.option_value });
            setDataInputGlobal({ callback: setFormAnswer, input_id: inputItem._id!, input_value: "", description: op });
      };
      const isError = inputItemInArrayGlobal?.globalError?.state;
      const isGoogleForm = formCore.form_styles === "GOOGLE_FORM" ? true : false;

      return (
            <InputAnswerWrapper formCore={formCore}>
                  <BoxHandlerInputAnswerError inputItemInArrayGlobal={inputItemInArrayGlobal} input_id={inputItem._id!} write={true}>
                        <InputAnswerTitle formCore={formCore} inputItem={inputItem} isError={isError} />
                        <InputContent>
                              <DivNative className="flex flex-col gap-[.3rem] text-[1.4rem]">
                                    <DivNative
                                          className={`${
                                                isGoogleForm ? "" : " p-[3rem] bg-[var(--bg-input-ans)] rounded-[.8rem]"
                                          } relative min-h-[5rem] h-max flex flex-col gap-[1.6rem]  `}
                                    >
                                          {
                                                inputItem.core.options.map((op) => {
                                                      if (!op.option_value) return null;
                                                      return (
                                                            <InputChecked
                                                                  key={op.option_id}
                                                                  value={op.option_value}
                                                                  value_current={choose.option_value as string}
                                                                  callbackChecked={() => onSelect(op)}
                                                                  name_radio={inputItem._id as string}
                                                                  checked={op.option_id === choose.option_id}
                                                            />
                                                      );
                                                }) as unknown as React.ReactNode[]
                                          }
                                    </DivNative>
                              </DivNative>
                              {choose?.option_value && (
                                    <p className="text-[1.4rem]">
                                          Đã chọn:
                                          {choose?.option_value ? (
                                                <span className="ml-[.4rem] border-b-[.2rem] border-gray-400">{choose.option_value}</span>
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

export default InputOptionAnswer;
