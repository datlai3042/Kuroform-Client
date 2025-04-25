import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import { Settings } from "lucide-react";
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
                        className="bg-color-main text-center px-[1rem]  min-w-[7rem] w-max  h-[3rem]  text-white rounded-[.4rem]  text-[1.5rem]"
                  >
                        <span style={{ color: buttonColor }}>{formCore.form_button_text}</span>
                  </button>

                  <ButtonDesignSubmit />
            </div>
      );
};

export default ButtonSubmitDesign;
