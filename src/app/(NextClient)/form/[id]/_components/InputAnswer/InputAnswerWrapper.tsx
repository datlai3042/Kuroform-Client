"use client";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { renderInputStyles } from "@/app/utils/form.utils";
import { FormCore, InputCore } from "@/type";
import React, { useContext } from "react";

type TProps = {
      children: React.ReactNode;
      formCore: FormCore.Form;
      inputItem: InputCore.InputForm;
};

const InputAnswerWrapper = (props: TProps) => {
      const { children, formCore, inputItem } = props;
      const { theme } = useContext(ThemeContext);
      const styleWrapper = renderInputStyles(formCore?.form_input_styles, formCore);

      const color =
            formCore.form_themes === "AUTO"
                  ? "text-text-theme"
                  : formCore.form_styles === "GOOGLE_FORM"
                  ? formCore?.form_input_styles?.color
                        ? formCore?.form_input_styles?.color
                        : formCore.form_themes === "DARK"
                        ? "text-[#000]"
                        : "text-[#000]"
                  : formCore.form_themes === "DARK"
                  ? "text-[#000]"
                  : "text-[#000]";
      const width = inputItem?.core?.setting?.width || 100;

      return (
            <DivNative
                  style={{
                        ...styleWrapper,
                        width: formCore?.form_styles === "GOOGLE_FORM" ? "100%" : `${width}%`,
                        border: formCore?.form_styles === "GOOGLE_FORM" ? "" : "none",
                  }}
                  className={`${color} ${formCore.form_styles !== "GOOGLE_FORM" ? " border-[.1rem]  border-[var(--border-color-input)]" : ""}
                  ${formCore.form_styles === "GOOGLE_FORM" ? "bg-color-section-theme rounded-[1.2rem] w-[55%]" : "bg-transparent w-[90%]"} 
                  control-w-input w-full min-h-[12rem] h-max   `}
            >
                  {children}
            </DivNative>
      );
};

export default InputAnswerWrapper;
