import Portal from "@/app/(NextClient)/_components/Portal";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import { FormCore, InputCore, ReactCustom } from "@/type";
import React, { SetStateAction, useCallback, useContext, useEffect, useMemo, useRef } from "react";
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
import { RootState } from "@/app/_lib/redux/store";
import { renderFormThemes } from "@/app/utils/form.utils";
import { useSelector } from "react-redux";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";

type TProps = {
      inputItem: InputCore.InputForm;
      setOpenModel: ReactCustom.SetStateBoolean;
      openModal: boolean
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
      const { inputItem, setOpenModel, openModal } = props;

      const modelRef = useRef<HTMLDivElement | null>(null);
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
      const { openFormDesign } = useContext(FormDesignContext);

      const children = useMemo(() => {
            return renderChildren(inputItem, setOpenModel);
      }, [inputItem, setOpenModel]) as React.ReactNode;

      useEffect(() => {
            const handleBrowserResize = () => {
                  if (modelRef.current) {
                        const rect = modelRef.current.getBoundingClientRect();
                        const space = rect.height + rect.top;
                        if (space > window.innerHeight) {
                              modelRef.current.style.bottom = `${space - window.innerHeight}px`;
                              modelRef.current.style.left = `${50}px`;
                        }
                        const spaceX = rect.width + rect.left;
                        if (spaceX > window.innerWidth) {
                              modelRef.current.style.left = `${-100}px`;
                              modelRef.current.style.bottom = `unset`;
                              modelRef.current.style.top = `${120}%`;

                        }
                        if (openFormDesign) {
                              const sectionDesign = document.querySelector("#section-design");
                              if (!sectionDesign) return;
                              if (spaceX > sectionDesign.getBoundingClientRect().left) {
                                    modelRef.current.style.left = `${-150}px`;
                              }
                        }
                  }
            };
            handleBrowserResize();
            window.addEventListener("resize", handleBrowserResize);

            return () => {
                  window.removeEventListener("resize", handleBrowserResize);
            };
      }, [openFormDesign, openModal]);
      const color = formCore.form_themes === "AUTO" ? "text-text-theme" : formCore.form_themes === "DARK" ? "text-[#fff]" : "text-[#000]";

      return (
            <ClickOutSide setOpenModel={setOpenModel}>
                  <DivNativeRef
                        onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                        }}
                        ref={modelRef}
                        className={`
                              bg-color-section-theme shadow-2xl
                            ${color}  absolute  top-[140%] bg  z-[300] flex justify-center items-center text-text-theme rounded-[.8rem]`}
                  >
                        <DivNativeRef className="min-w-[21rem] bg-inherit w-max xl:min-h-[16rem]  h-max p-[1.2rem] shadow-xl border-[.1rem] border-[var(--border-color-input)] flex flex-col  rounded-[.8rem] ">
                              {children}
                        </DivNativeRef>
                  </DivNativeRef>
            </ClickOutSide>
      );
};

export default InputSettingWrapper;
