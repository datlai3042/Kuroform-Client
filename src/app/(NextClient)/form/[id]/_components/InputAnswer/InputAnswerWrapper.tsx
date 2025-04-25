"use client";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { renderInputStyles } from "@/app/utils/form.utils";
import { FormCore } from "@/type";
import React, { useContext } from "react";

type TProps = {
      children: React.ReactNode;
      formCore: FormCore.Form;
};

const InputAnswerWrapper = (props: TProps) => {
      const { children, formCore } = props;
      const { theme } = useContext(ThemeContext);
      const styleWrapper =
            formCore.form_styles === "GOOGLE_FORM" ? renderInputStyles(formCore?.form_input_styles) : { border: "none", backgroundColor: "transparent" };

      const color = formCore.form_themes === "AUTO" ? "var(--text-text-theme)" : formCore.form_themes === "DARK" ? "text-[#fff]" : "text-[#000]";
      return (
            <DivNative
                  style={{ ...styleWrapper }}
                  className={`${color} w-full min-h-[12rem] h-max  bg-color-section-theme  rounded-[.4rem] border-[.1rem] border-[var(--border-color-side)]`}
            >
                  {children}
            </DivNative>
      );
};

export default InputAnswerWrapper;
