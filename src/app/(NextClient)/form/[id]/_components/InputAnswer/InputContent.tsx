import { renderInputStyles } from "@/app/utils/form.utils";
import { FormCore } from "@/type";
import React from "react";

const InputContent = ({ children, formCore }: { children: React.ReactNode; formCore: FormCore.Form }) => {
      const styleWrapper = renderInputStyles(formCore?.form_input_styles, formCore);

      return <div className=" flex flex-col gap-[1.4rem] ">{children}</div>;
};

export default InputContent;
