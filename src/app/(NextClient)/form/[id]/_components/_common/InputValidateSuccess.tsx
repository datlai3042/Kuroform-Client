import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import React from "react";
import { useSelector } from "react-redux";

type TProps = {
      message: string;
};

const InputValidateSuccess = (props: TProps) => {
      const { message } = props;
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

      return <span style={{color: formCore.form_input_styles.color}} className="text-[1.5rem] text-blue-500 font-bold max-w-[90%] break-all">{message}</span>;
};

export default InputValidateSuccess;
