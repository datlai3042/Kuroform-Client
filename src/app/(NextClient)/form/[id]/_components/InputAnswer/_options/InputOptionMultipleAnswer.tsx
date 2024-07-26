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

type TProps = {
      inputItem: InputCore.InputOptionMultiple.InputTypeOptionMultiple;
      formCore: FormCore.Form;
};

const InputOptionMultipleAnswer = (props: TProps) => {
      const { inputItem, formCore } = props;

      const {
            formAnswer: { inputFormErrors, inputFormData, submitState },
            setFormAnswer,
      } = useContext(FormAnswerContext);

      const [error, setError] = useState<FormCore.FormAnswer.InputError>(() => {
            return renderErrorInput(inputFormErrors, inputItem);
      });

      const [choose, setChoose] = useState<{ input_id: string; input_value: string[] }>(() => {
            const valueGlobal = inputFormData.filter((data) => data._id === inputItem._id)[0];
            return {
                  input_id: valueGlobal._id || "",
                  input_value: valueGlobal.value || [],
            } as { input_id: string; input_value: string[] };
      });

      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      const onSelect = (op: InputCore.InputOptionMultiple.Options) => {
            if (error.error) {
                  setError({ error: false, message: "", type: null });
                  deleteErrorGlobal(setFormAnswer, inputItem._id!);
            }
            if (inputItem.core.setting.require) {
                  if (choose.input_value.includes(op.option_value)) {
                        setInputRequireGlobal(setFormAnswer, inputItem._id!, false);
                  } else {
                        setInputRequireGlobal(setFormAnswer, inputItem._id!, true);
                  }
            }
            if (choose.input_value.includes(op.option_value)) {
                  const newArrayOption = choose.input_value.filter((option) => option !== op.option_value);
                  setDataInputGlobal({ callback: setFormAnswer, input_id: inputItem._id!, input_value: newArrayOption });

                  setChoose((prev) => {
                        return {
                              ...prev,
                              input_value: newArrayOption,
                        };
                  });
            } else {
                  const newArrayOption = choose.input_value.concat(op.option_value);
                  setDataInputGlobal({ callback: setFormAnswer, input_id: inputItem._id!, input_value: newArrayOption });

                  setChoose((prev) => {
                        return {
                              ...prev,
                              input_value: newArrayOption,
                        };
                  });
            }
      };

      return (
            <InputAnswerWrapper>
                  <DivNative
                        id={`_inputid_${inputItem._id}`}
                        className={` relative inputAnswer w-full min-h-full h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[2rem] border-[.2rem]  rounded-lg`}
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
                                                      //             type="checkbox"
                                                      //             name={inputItem._id}
                                                      //             value={op.option_value}
                                                      //             checked={choose.input_value.includes(op.option_value)}
                                                      //             className="hover:cursor-pointer"
                                                      //             onChange={() => {}}
                                                      //       />
                                                      //       {op.option_value}
                                                      // </div>
                                                      <InputChecked
                                                            key={op.option_id}
                                                            value={op.option_value}
                                                            value_current={choose.input_value}
                                                            callbackChecked={() => onSelect(op)}
                                                            name_radio={inputItem._id as string}
                                                            checked={choose.input_value.includes(op.option_value)}
                                                      />
                                                );
                                          }) as unknown as React.ReactNode[]
                                    }
                              </DivNative>
                        </DivNative>
                        <p className="text-[1.4rem]">
                              Đã chọn: <span className="ml-[.4rem] border-b-[.2rem] border-gray-400">{choose.input_value.join(", ")}</span>
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

export default InputOptionMultipleAnswer;
