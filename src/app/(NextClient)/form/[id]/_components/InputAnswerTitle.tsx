import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import { FormCore, InputCore } from "@/type";
import { Circle } from "lucide-react";
import React, { useContext } from "react";

type TProps = {
      inputItem: InputCore.InputForm;
      formCore: FormCore.Form;
      error?: FormCore.FormAnswer.InputError;
      isError: boolean;
};

const InputAnswerTitle = (props: TProps) => {
      const { formCore, inputItem, error, isError } = props;
      const {theme} = useContext(ThemeContext)
      const styleEffect = {
            styleTitle: () => {
                  return {
                        fontSize: inputItem.core.setting.input_size || formCore.form_setting_default.input_size,
                        color: isError ? "inherit" : theme === 'dark' ? 'var(--text-theme)' : inputItem.core.setting.input_color || formCore.form_setting_default.input_color,
                        fontStyle: inputItem.core.setting.input_style || formCore.form_setting_default.input_style,
                  };
            },
      };
      console.log({formCore})
      return (
            <div className="flex items-center gap-[1.4rem]">
                  <Circle style={{color: isError ? 'inherit'  : theme === 'dark' ? 'var(--text-theme)' : 'var(--color-main)'}} className=" font-semibold" width={17} />

                  <p style={styleEffect.styleTitle()} className="flex items-center gap-[.6rem] text-[2rem] font-medium">
                        {inputItem.input_title || "Không có tiêu đề"}
                        {inputItem.core.setting.require && <span className="text-red-800">*</span>}
                  </p>
            </div>
      );
};

export default InputAnswerTitle;
