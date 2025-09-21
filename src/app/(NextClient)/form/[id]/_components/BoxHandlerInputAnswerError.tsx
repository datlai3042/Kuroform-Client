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

      const isGoogleForm = formCore?.form_styles === "GOOGLE_FORM" ? true : false;
//      const color =
//             formCore.form_themes === "AUTO"
//                   ? "text-text-theme"
//                   : formCore.form_styles === "GOOGLE_FORM"
//                   ? formCore?.form_input_styles?.color
//                         ? formCore?.form_input_styles?.color
//                         : formCore.form_themes === "DARK"
//                         ? "text-[#000]"
//                         : "text-[#000]"
//                   : formCore.form_themes === "DARK"
//                   ? "text-[#fff]"
//                   : "text-[#000]";
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
                        isGoogleForm ? "p-[2.4rem]" : " p-[.8rem_1.8rem]"
                  } text-inherit  relative w-full min-h-[12rem]   h-max  duration-300 transition-all flex flex-col justify-center gap-[1rem]  `}
            >
                  {children}
            </div>
      );
};

export default BoxHandlerInputAnswerError;
