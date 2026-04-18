import React from "react";
import ButtonColor, { TypeEdit } from "./DesignCommon/ButtonColor";
import ButtonEditTextSize from "./DesignCommon/ButtonEditTextSize";
import ButtonEditTextStyle from "./DesignCommon/ButtonEditTextStyle";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";

type TProps = {
      title: string;
      type: TypeEdit;
};

const FormDesignText = (props: TProps) => {
      const { title, type } = props;
      const formOriginal = useSelector((state: RootState) => state.form.formCoreOriginal);

      return (
            <div className=" flex flex-col gap-[2rem] ">
                  {/* <p className="font-medium">{title}</p> */}
                  <div className="flex flex-col  gap-[.6rem]">
                        <div className="flex items-center justify-between">
                              <ButtonEditTextSize typeEdit={type} />
                              <ButtonEditTextStyle typeEdit={type} />
                              <ButtonColor typeEdit={type} defaultColor={formOriginal.form_title.form_title_color || formOriginal.form_setting_default.form_title_color_default} />
                        </div>
                  </div>
            </div>
      );
};

export default FormDesignText;
