import { RootState } from "@/app/_lib/redux/store";
import useAddInput from "@/app/hooks/useAddInput";
import { FormCore } from "@/type";
import React from "react";
import { useSelector } from "react-redux";

export interface ButtonAddInputProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
      textContent?: string;
}

const ButtonAddInput = (props: ButtonAddInputProps) => {
      const { textContent = "Thêm Input", ...buttonProps } = props;

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
      const colorMain = useSelector((state: RootState) => state.form.colorCore);

      const addInput = useAddInput();

      return (
            <button
                  {...buttonProps}
                  onClick={() => addInput.mutate({ form_id: formCore._id })}
                  className={`${
                        buttonProps.className || ""
                  } btn-primarily opacity-100 text-left mt-[4rem] min-w-[4rem] w-max px-[1rem] h-[3.6rem]  flex items-center justify-center bg-color-main  text-white rounded-[.4rem] text-[1.5rem]`}
            >
                  {textContent}
            </button>
      );
};

export default ButtonAddInput;
