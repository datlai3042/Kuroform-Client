import { renderInputStyles } from "@/app/utils/form.utils";
import { FormCore } from "@/type";
import React from "react";

const InputContent = ({ children, formCore }: { children: React.ReactNode; formCore: FormCore.Form }) => {
      const isGoogleForm = formCore.form_styles === "GOOGLE_FORM" ? true : false;

      return <div className={` flex flex-col gap-[1.4rem] ${isGoogleForm ? "" : ' p-[0rem]'}`}>{children}</div>;
};

export default InputContent;
