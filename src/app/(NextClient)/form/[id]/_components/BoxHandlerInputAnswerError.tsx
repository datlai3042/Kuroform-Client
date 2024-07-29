import { FormCore } from "@/type";
import React from "react";

type TProps = {
      children: React.ReactNode;
      input_id: string;
      error?: FormCore.FormAnswer.InputError;
      write: boolean;
      inputItemInArrayGlobal: FormCore.FormAnswer.ControlerInputAnswer<FormCore.FormAnswer.Data.InputData>;
};

const BoxHandlerInputAnswerError = (props: TProps) => {
      const { children, error, inputItemInArrayGlobal, input_id, write } = props;

      return (
            <div
                  id={`_inputid_${input_id}`}
                  className={`${
                        (error && error.error && write) || inputItemInArrayGlobal?.globalError?.state
                              ? "input-answer-invalid"
                              : " border-[.3rem] border-transparent "
                  } relative w-full min-h-[24rem] h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[1.8rem]  rounded-lg`}
            >
                  {children}
            </div>
      );
};

export default BoxHandlerInputAnswerError;
