import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { InputCore } from "@/type";
import { CircleAlert } from "lucide-react";
import React from "react";

type TProps = {
      type: InputCore.Commom.ErrorText | null;
      message: string;
};

const InputErrorMessage = (props: TProps) => {
      const { type, message } = props;
      return (
            <DivNative className="flex items-center gap-[.6rem] ">
                  <CircleAlert className="text-[#e20f0f]" size={20}/>
                  <span className="text-[1.3rem] text-[#e20f0f]">
                        {`${type ? "Lỗi #" + type + ": " : ""}`} {message}
                  </span>
            </DivNative>
      );
};

export default InputErrorMessage;
