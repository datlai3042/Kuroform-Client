import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import React from "react";

type TProps = {
      children: React.ReactNode;
};

const InputAnswerWrapper = (props: TProps) => {
      const { children } = props;

      return <DivNative className=" w-full min-h-[18rem] h-max  bg-[#ffffff]  rounded-xl">{children}</DivNative>;
};

export default InputAnswerWrapper;
