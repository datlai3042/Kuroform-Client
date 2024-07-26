"use client";
import { FormCore, InputCore } from "@/type";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import InputAnswerWrapper from "../InputAnswerWrapper";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import InputErrorMessage from "../InputError/InputErrorMessage";
import { deleteErrorWhenFocus, renderControllerInputAnswer, renderErrorInput, validateWhenFocus } from "../_utils/formAnswer.uti";
import { Rate } from "antd";
import { superVoteValidate } from "../_validate/inputVote.validate";
import InputAnswerTitle from "../../InputAnswerTitle";

type TProps = {
      inputItem: InputCore.InputVote.InputTypeVote;
      formCore: FormCore.Form;
};

const InputVoteAnswer = (props: TProps) => {
      const { inputItem, formCore } = props;

      const {
            formAnswer: { inputFormErrors, inputFormData, submitState },
            setFormAnswer,
      } = useContext(FormAnswerContext);

      const [start, setStart] = useState<string>(() => inputFormData.filter((data) => data._id === inputItem._id)[0].value as string);

      const [error, setError] = useState<FormCore.FormAnswer.InputError>(() => {
            return renderErrorInput(inputFormErrors, inputItem);
      });

      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      const [write, setWrite] = useState<boolean>(false);

      const onFocus = () => {
            setWrite(true);
            deleteErrorWhenFocus({ error, setError, setFormAnswer, inputFormErrors, inputItem });
      };

      const onBlur = () => {
            if (write) {
                  validateWhenFocus<InputCore.InputVote.InputSettingVote>({
                        inputItem,
                        inputValue: start,
                        setError,
                        setFormAnswer,
                        validateCallback: superVoteValidate,
                  });
            }
      };

      return (
            <InputAnswerWrapper>
                  <DivNative
                        id={`_inputid_${inputItem._id}`}
                        className={`relative w-full min-h-full h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[2rem]  rounded-lg`}
                  >
                        <InputAnswerTitle inputItem={inputItem} formCore={formCore} />
                        <DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
                              <DivNative className="flex flex-col gap-[1rem]">
                                    <DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
                                          <Rate onFocus={onFocus} onBlur={onBlur} allowHalf value={+start} onChange={(e) => setStart(e.toString())} />
                                    </DivNative>
                                    <span className="text-[1.4rem]">Số đánh giá bạn chọn là: {start}</span>
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

export default InputVoteAnswer;
