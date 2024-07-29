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
import BoxHandlerInputAnswerError from "../../BoxHandlerInputAnswerError";
import BoxHandlerInputAnswerErrorMsg from "../../BoxHandlerInputAnswerErrorMsg";

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

      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer<FormCore.FormAnswer.Data.Vote>({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      const [start, setStart] = useState<string>(inputItemInArrayGlobal.input?.value || "");

      const [write, setWrite] = useState<boolean>(false);

      const onFocus = () => {
            setWrite(true);
            deleteErrorWhenFocus({ setFormAnswer, inputFormErrors, inputItem });
      };

      const onBlur = () => {
            if (write) {
                  validateWhenFocus<InputCore.InputVote.InputSettingVote>({
                        inputItem,
                        inputValue: start,
                        setFormAnswer,
                        validateCallback: superVoteValidate,
                  });
            }
      };

      return (
            <InputAnswerWrapper>
                  <BoxHandlerInputAnswerError inputItemInArrayGlobal={inputItemInArrayGlobal} input_id={inputItem._id!} write={write}>
                        <InputAnswerTitle inputItem={inputItem} formCore={formCore} />
                        <DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
                              <DivNative className="flex flex-col gap-[1rem]">
                                    <DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
                                          <Rate onFocus={onFocus} onBlur={onBlur} allowHalf value={+start} onChange={(e) => setStart(e.toString())} />
                                    </DivNative>
                                    <span className="text-[1.4rem]">Số đánh giá bạn chọn là: {start}</span>
                              </DivNative>
                        </DivNative>

                        {inputItemInArrayGlobal?.globalError?.state && (
                              <BoxHandlerInputAnswerErrorMsg inputItem={inputItem} inputItemInArrayGlobal={inputItemInArrayGlobal} />
                        )}
                  </BoxHandlerInputAnswerError>
            </InputAnswerWrapper>
      );
};

export default InputVoteAnswer;
