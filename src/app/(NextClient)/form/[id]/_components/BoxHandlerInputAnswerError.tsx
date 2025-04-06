import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import React from "react";
import { useSelector } from "react-redux";

type TProps = {
      children: React.ReactNode;
      input_id: string;
      error?: FormCore.FormAnswer.InputError;
      write: boolean;
      inputItemInArrayGlobal: FormCore.FormAnswer.ControlerInputAnswer<FormCore.FormAnswer.Data.InputData>;
};

const BoxHandlerInputAnswerError = (props: TProps) => {
      const { children, error, inputItemInArrayGlobal, input_id, write } = props;

      const colorMain = useSelector((state: RootState) => state.form.colorCore)

      return (
            <div
                  id={`_inputid_${input_id}`}
                  // style={{borderColor: !!error?.error ? '':  colorMain,}}
                  className={`${
                        (error && error.error && write) || inputItemInArrayGlobal?.globalError?.state
                              ? "input-answer-invalid  !text-[#e20f0f]"
                              : " border-[.1rem] border-transparent"
                  }  relative w-full min-h-[12rem]  text-text-theme h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[1rem]  rounded-lg`}
            >
                  {children}
            </div>
      );
};

export default BoxHandlerInputAnswerError;
