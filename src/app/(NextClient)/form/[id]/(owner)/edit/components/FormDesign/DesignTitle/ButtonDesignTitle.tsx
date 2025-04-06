import { FormText } from "@/app/_constant/formUi.constant";
import { RootState } from "@/app/_lib/redux/store";
import { LayoutTemplate } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export interface ButtonDesginProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      textContent?: string;
}

const ButtonDesignTitle = (props: ButtonDesginProps) => {
      const { textContent = FormText.title.addOptionTitle, ...buttonProps } = props;

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

      return (
            <button
                  {...buttonProps}
                  className={` ${
                        buttonProps.className || ""
                  } mt-[2rem] btn-primarily !bg-color-main   rounded-[.4rem] font-bold text-[#fff]   w-max max-w-[28rem] sm:max-w-max  h-[3.6rem]  flex items-center sm:justify-center gap-[.5rem]  outline-none`}
            >
                  <LayoutTemplate size={20}/>
                  {textContent}
            </button>
      );
};

export default ButtonDesignTitle;
