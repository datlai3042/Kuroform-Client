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
      styles?: React.CSSProperties;
};

const BoxHandlerInputAnswerError = (props: TProps) => {
      const { children, error, inputItemInArrayGlobal, input_id, write, styles = {} } = props;

      const colorMain = useSelector((state: RootState) => state.form.colorCore);

      return (
            <div
                  style={styles}
                  id={`_inputid_${input_id}`}
                  // style={{borderColor: !!error?.error ? '':  colorMain,}}
                  className={`${
                        (error && error.error && write) || inputItemInArrayGlobal?.globalError?.state
                              ? "input-answer-invalid border-none  !text-[#e20f0f]"
                              : "  border-b-[.1rem] border-[var(--border-color-input)]"
                  }  relative w-full min-h-[12rem]   h-max p-[3.8rem_1.8rem]  duration-300 transition-all flex flex-col justify-center gap-[1rem]  `}
            >
                  {children}
            </div>
      );
};

export default BoxHandlerInputAnswerError;
