import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import { Dock, Settings } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import ButtonDesignSubmit from "./DesignCommon/ButtonDesignSubmit";
import { renderInputStyles } from "@/app/utils/form.utils";
export interface ButtonNativeProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      textContent: string;
      children?: React.ReactNode;
}
const ButtonSubmitDesign = (props: ButtonNativeProps) => {
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

      const buttonBg = formCore.form_button_background;
      const buttonColor = formCore.form_button_color;
      return (
            <div className="flex items-center gap-[1.6rem] mt-[1rem]">
                  <button
                        {...props}
                        style={{ backgroundColor: buttonBg || "" }}
                        ref={(el) => {
                              if (el) el.style.setProperty("background-color", buttonBg, "important");
                        }}
                        className="bg-color-main text-center flex justify-center items-center gap-[.3ren] px-[1rem]  min-w-[7rem] w-max  h-[3rem]  text-white rounded-[.4rem]  text-[1.5rem] btn-func font-medium"
                  >
                        <Dock style={{ color: buttonColor }}/>
                        <span style={{ color: buttonColor }}>{formCore.form_button_text}</span>
                  </button>

                  <ButtonDesignSubmit />
            </div>
      );
};

export default ButtonSubmitDesign;
