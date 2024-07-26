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

      const [error, setError] = useState<FormCore.FormAnswer.InputError>(() => {
            return renderErrorInput(inputFormErrors, inputItem);
      });

      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      const [choose, setChoose] = useState<{ input_id: string; input_value: string | string[] }>(() => {
            const valueGlobal = inputFormData.filter((data) => data._id === inputItem._id)[0];
            return {
                  input_id: valueGlobal._id || "",
                  input_value: (valueGlobal.value as string) || "",
            };
      });

      const onSelect = (op: InputCore.InputOption.Options) => {
            if (error.error) {
                  setError({ error: false, message: "", type: null });
                  deleteErrorGlobal(setFormAnswer, inputItem._id!);
            }
            if (inputItem.core.setting.require) {
                  setInputRequireGlobal(setFormAnswer, inputItem._id!, true);
            }
            if (op.option_value === choose.input_value) {
                  setChoose({ input_id: op.option_id, input_value: "" });
                  setDataInputGlobal({ callback: setFormAnswer, input_id: inputItem._id!, input_value: op.option_value });

                  return;
            }
            setChoose({ input_id: op.option_id, input_value: op.option_value });
            setDataInputGlobal({ callback: setFormAnswer, input_id: inputItem._id!, input_value: op.option_value });
      };

      return (
            <InputAnswerWrapper>
                  <DivNative
                        id={`_inputid_${inputItem._id}`}
                        className={`relative inputAnswer w-full min-h-full h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[2rem] border-[.2rem]  rounded-lg`}
                  >
                        <InputAnswerTitle formCore={formCore} inputItem={inputItem} />
                        <DivNative className="flex flex-col gap-[.3rem] text-[1.4rem]">
                              <DivNative className={` relative min-h-[5rem] h-max flex flex-col gap-[1.6rem]  `}>
                                    {
                                          inputItem.core.options.map((op) => {
                                                if (!op.option_value) return null;
                                                return (
                                                      // <div
                                                      //       key={op.option_id}
                                                      //       className="p-[1rem] flex items-center gap-[2rem] rounded-lg hover:cursor-pointer hover:bg-formCoreBgColor"
                                                      //       onClick={() => onSelect(op)}
                                                      // >
                                                      //       <input
                                                      //             type="radio"
                                                      //             name={inputItem._id}
                                                      //             value={op.option_value}
                                                      //             checked={choose.input_value === op.option_value}
                                                      //             className="hover:cursor-pointer"
                                                      //             onChange={() => {}}
                                                      //       />
                                                      //       {op.option_value}
                                                      // </div>

                                                      <InputChecked
                                                            key={op.option_id}
                                                            value={op.option_value}
                                                            value_current={choose.input_value as string}
                                                            callbackChecked={() => onSelect(op)}
                                                            name_radio={inputItem._id as string}
                                                            checked={op.option_value === choose.input_value}
                                                      />
                                                );
                                          }) as unknown as React.ReactNode[]
                                    }
                              </DivNative>
                        </DivNative>
                        <p className="text-[1.4rem]">
                              Đã chọn: <span className="ml-[.4rem] border-b-[.2rem] border-gray-400">{choose.input_value}</span>
                        </p>
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

export default InputOptionAnswer;
