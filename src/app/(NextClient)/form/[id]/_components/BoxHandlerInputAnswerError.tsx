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
      formCore: FormCore.Form;
};

const BoxHandlerInputAnswerError = (props: TProps) => {
      const { children, error, inputItemInArrayGlobal, input_id, write, styles = {}, formCore } = props;

      const colorMain = useSelector((state: RootState) => state.form.colorCore);
      const isGoogleForm = formCore?.form_styles === "GOOGLE_FORM" ? true : false;

      return (
            <div
                  style={styles}
                  id={`_inputid_${input_id}`}
                  // style={{borderColor: !!error?.error ? '':  colorMain,}}
                  className={`${
                        (error && error.error && write) || inputItemInArrayGlobal?.globalError?.state
                              ? "input-answer-invalid border-none  !text-[#e20f0f]"
                              : " "
                  } ${
                        isGoogleForm ? "p-[1.8rem]" : " p-[1.8rem_1.8rem]"
                  }  relative w-full min-h-[12rem]   h-max  duration-300 transition-all flex flex-col justify-center gap-[1rem]  `}
            >
                  {children}
            </div>
      );
};

export default BoxHandlerInputAnswerError;
