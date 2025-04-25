import React from "react";
import ButtonColor, { TypeEdit } from "./DesignCommon/ButtonColor";
import ButtonEditTextSize from "./DesignCommon/ButtonEditTextSize";
import ButtonEditTextStyle from "./DesignCommon/ButtonEditTextStyle";

type TProps = {
      title: string;
      type: TypeEdit;
};

const FormDesignText = (props: TProps) => {
      const { title, type } = props;
      return (
            <div className=" flex flex-col gap-[2rem] ">
                  {/* <p className="font-medium">{title}</p> */}
                  <div className="flex flex-col  gap-[.6rem]">
                        <div className="flex items-center justify-between">
                              <ButtonEditTextSize typeEdit={type} />
                              <ButtonEditTextStyle typeEdit={type} />
                              <ButtonColor typeEdit={type} />
                        </div>
                  </div>
            </div>
      );
};

export default FormDesignText;
