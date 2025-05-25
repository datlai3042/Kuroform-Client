import DivWrapper from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormCore, InputCore, ReactCustom } from "@/type";
import { GripVertical, Plus, Settings, Trash2 } from "lucide-react";
import React, { SetStateAction, memo, useState } from "react";
import ModelInputType from "./InputIntroduce/InputIntroduceWrapper";
import InputSettingWrapper from "./InputSettings/InputSettingWrapper";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import InputIntroduceWrapper from "./InputIntroduce/InputIntroduceWrapper";

type TProps = {
      funcRemoveInput: () => void;
      inputItem: InputCore.InputForm;
      openSetting: boolean;
      setOpenSetting: React.Dispatch<SetStateAction<boolean>>;
};

const SectionOption = (props: TProps) => {
      const { inputItem, openSetting, setOpenSetting, funcRemoveInput } = props;
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
      const colorMain = useSelector((state: RootState) => state.form.colorCore);

      const [openSelectType, setOpenSelectType] = useState<boolean>(false);

      const styleEffect = {
            onCheckModeDisplay: () => {
                  if (formCore.form_mode_display === "custom") {
                        return "group-hover:!text-[#ffffff]";
                  }
                  return "";
            },
      };

      return (
            <>
                  <DivWrapper className={`flex  h-full  items-center gap-[.3rem] `}>
                        <div className="flex ">
                              <Trash2
                                    size={28}
                                    onClick={funcRemoveInput}
                                    className={`${styleEffect.onCheckModeDisplay()} hover:cursor-pointer p-[.6rem] bg:transparent border-[.1rem] border-[var(--border-color-input)] hover:border-transparent hover:bg-color-main hover:text-[#fff] rounded-[.4rem]`}
                              />
                        </div>

                        <div className="flex rounded-[.4rem]">
                              <Plus
                                    size={28}
                                    onClick={() => setOpenSelectType(true)}
                                    className={`${styleEffect.onCheckModeDisplay()} hover:cursor-pointer  p-[.6rem] bg:transparent  border-[.1rem] border-[var(--border-color-input)] hover:border-transparent hover:bg-color-main hover:text-[#fff] rounded-[.4rem]`}
                              />
                        </div>

                        <div className=" rounded-[.4rem] relative">
                              <DivWrapper style={{ backgroundColor: openSetting ? "var(--color-main)" : "" }} className=" rounded-lg">
                                    <Settings
                                          size={28}
                                          style={{ color: openSetting ? "#fff" : "", border: openSetting ? ".1rem solid transparent" : "" }}
                                          onClick={() => setOpenSetting(true)}
                                          className={`${styleEffect.onCheckModeDisplay()} hover:cursor-pointer p-[.6rem] bg:transparent  border-[.1rem] border-[var(--border-color-input)] hover:border-transparent hover:bg-color-main hover:text-[#fff] rounded-[.4rem]`}
                                    />
                                    {openSetting && <InputSettingWrapper openModal={openSetting} setOpenModel={setOpenSetting} inputItem={inputItem} />}
                              </DivWrapper>
                        </div>

                        {inputItem.core.setting.require && !inputItem.input_title && <span className="text-red-700 text-[1.8rem]">*</span>}
                  </DivWrapper>
                  {openSelectType && <InputIntroduceWrapper setOpenModel={setOpenSelectType} inputItem={inputItem} />}
            </>
      );
};

export default memo(SectionOption);
