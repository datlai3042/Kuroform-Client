import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { InputCore } from "@/type";
import React, { SetStateAction, useContext, useState } from "react";
import InputSettingLabel from "../InputSettingLabel";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";

type TProps<InputType extends InputCore.Commom.InputCommon, SettingType extends InputCore.Setting.InputSettingCommon> = {
      inputItem: InputType;
      setInputItemString: React.Dispatch<SetStateAction<{ core: { setting: SettingType } }>>;
};

const InputSettingRequire = <InputType extends InputCore.Commom.InputCommon, Type extends InputCore.Setting.InputSettingCommon>(
      props: TProps<InputType, Type>,
) => {
      const { inputItem, setInputItemString } = props;
      const styleEffect = {
            onActiveRequireWrapper: () => {
                  if (inputItem.core.setting.require) return "bg-color-main";
                  return "bg-slate-300";
            },

            onActiveRequireCircle: () => {
                  if (inputItem.core.setting.require) return " animate-ltr";
                  return "animate-rtl bg-[#fff]";
            },
      };

      const handleRequireInput = () => {
            setInputItemString((prev) => {
                  const newSetting = structuredClone(prev);
                  newSetting.core.setting.require = !prev.core.setting.require;
                  return newSetting;
            });
      };

      return (
            <DivNative className="flex items-center justify-between gap-[1.5rem] ">
                  <InputSettingLabel>Bắt buộc</InputSettingLabel>
                  <DivNative
                        className={`${styleEffect.onActiveRequireWrapper()} relative  w-[5rem] h-[2.4rem] transition-all duration-700 rounded-3xl border-[.1rem] border-[var(--border-color-input)] hover:cursor-pointer`}
                        onClick={handleRequireInput}
                  >
                        <DivNative
                              className={`${styleEffect.onActiveRequireCircle()} absolute bg-[#ffffff] w-[2.2rem]  transition-all duration-700 aspect-square rounded-full `}
                        ></DivNative>
                  </DivNative>
            </DivNative>
      );
};

export default InputSettingRequire;
