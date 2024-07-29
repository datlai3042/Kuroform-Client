import Portal from "@/app/(NextClient)/_components/Portal";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import { FormCore, InputCore, ReactCustom } from "@/type";
import React, { SetStateAction, useCallback, useEffect, useMemo, useRef } from "react";
import InputSettingEmail from "../InputCore/_email/InputSettingEmail";
import InputSettingText from "../InputCore/_text/InputSettingText";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import InputSettingOption from "../InputCore/_option/InputSettingOption";
import InputSettingPhone from "../InputCore/_phone/InputSettingPhone";
import InputSettingVote from "../InputCore/_vote/InputSettingVote";
import InputSettingImage from "../InputCore/_image/InputSettingImage";
import InputSettingDate from "../InputCore/_date/InputSettingDate";
import InputSettingOptions from "../InputCore/_options/InputSettingOptions";
import InputSettingAddress from "../InputCore/_address/InputSettingAddress";
import InputSettingAnchor from "../InputCore/_anchor/InputSettingAnchor";

type TProps = {
      inputItem: InputCore.InputForm;
      setOpenModel: ReactCustom.SetStateBoolean;
};

const renderChildren = (inputItem: InputCore.InputForm, setOpenModel: React.Dispatch<SetStateAction<boolean>>) => {
      switch (inputItem.type) {
            case "EMAIL":
                  return <InputSettingText inputItem={inputItem} setOpenModel={setOpenModel} />;
            case "TEXT":
                  return <InputSettingText inputItem={inputItem} setOpenModel={setOpenModel} />;

            case "PHONE":
                  return <InputSettingPhone inputItem={inputItem} setOpenModel={setOpenModel} />;

            case "VOTE":
                  return <InputSettingVote inputItem={inputItem} setOpenModel={setOpenModel} />;

            case "OPTION":
                  return <InputSettingOption inputItem={inputItem} setOpenModel={setOpenModel} />;

            case "DATE":
                  return <InputSettingDate inputItem={inputItem} setOpenModel={setOpenModel} />;

            case "FILE_IMAGE":
                  return <InputSettingImage inputItem={inputItem} setOpenModel={setOpenModel} />;

            case "ADDRESS":
                  return <InputSettingAddress inputItem={inputItem} setOpenModel={setOpenModel} />;

            case "ANCHOR":
                  return <InputSettingAnchor inputItem={inputItem} setOpenModel={setOpenModel} />;

            case "OPTION_MULTIPLE":
                  return <InputSettingOptions inputItem={inputItem} setOpenModel={setOpenModel} />;
            default:
                  return <InputSettingText inputItem={inputItem} setOpenModel={setOpenModel} />;
      }
};

const InputSettingWrapper = (props: TProps) => {
      const { inputItem, setOpenModel } = props;

      const modelRef = useRef<HTMLDivElement | null>(null);

      const children = useMemo(() => {
            return renderChildren(inputItem, setOpenModel);
      }, [inputItem, setOpenModel]) as React.ReactNode;

      return (
            <ClickOutSide setOpenModel={setOpenModel}>
                  <DivNative
                        onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                        }}
                        className="absolute top-[140%] right-[-24rem] sm:right-[-4rem]  z-[300] flex justify-center items-center text-text-theme bg-color-section-theme"
                  >
                        <DivNativeRef className="w-[30rem]  xl:w-[27rem] xl:min-h-[16rem]  h-max p-[2rem] shadow-xl border-[1px] border-slate-200 flex flex-col  rounded-lg ">
                              {children}
                        </DivNativeRef>
                  </DivNative>
            </ClickOutSide>
      );
};

export default InputSettingWrapper;
