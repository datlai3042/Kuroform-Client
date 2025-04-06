'use client'
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import React, { useContext } from "react";

type TProps = {
      children: React.ReactNode;
};

const InputAnswerWrapper = (props: TProps) => {
      const { children } = props;
      const {theme} = useContext(ThemeContext)
      return <DivNative className=" w-full min-h-[12rem] h-max  bg-color-section-theme  rounded-[.4rem] border-[.1rem] border-[var(--border-color-side)]">{children}</DivNative>;
};

export default InputAnswerWrapper;
