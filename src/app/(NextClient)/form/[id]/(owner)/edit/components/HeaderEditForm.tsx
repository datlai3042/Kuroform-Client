"use client";
import React, { useContext, useState } from "react";
import { Bell, ChevronRight, ChevronsRight, ClipboardEdit, Flower, Search, Settings } from "lucide-react";
import { RootState } from "@/app/_lib/redux/store";
import { useSelector } from "react-redux";

import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import { SidebarContext } from "@/app/(NextClient)/(user)/dashboard/SidebarContext";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

import { FormCore } from "@/type";

import Link from "next/link";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import useChangeModeForm from "@/app/hooks/useChangeModeForm";
import ModelFormState from "./ModelFormState";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import Image from "next/image";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import ButtonDarkMode from "@/app/(NextClient)/_components/ui/button/ButtonDarkMode";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import LogoHome from "@/app/(NextClient)/_components/logo/LogoHome";
import DashboardSearchForm from "@/app/(NextClient)/(user)/dashboard/_components/DashboardSearchForm";
import { CiEdit } from "react-icons/ci";

type TProps = {
      showHeaderAction: boolean;
};

const renderText = (form_state: FormCore.FormState) => {
      let textMessage = "";
      if (form_state === "isPublic") textMessage = "Công khai";
      if (form_state === "isPrivate") textMessage = "Riêng tư";
      if (form_state === "isDelete") textMessage = "Xóa";
      return textMessage;
};
const HeaderEditForm = (props: TProps) => {
      const { showHeaderAction } = props;

      const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
      const { modeScreen, setModeScreen } = useContext(FormModeScreenContext);
      const { openFormDesign } = useContext(FormDesignContext);

      const { theme } = useContext(ThemeContext);

      const [openModelFormState, setOpenModelFormState] = useState<boolean>(false);

      const pathName = usePathname();

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

      const onSetScreen = () => {
            if (modeScreen === "FULL") return setModeScreen("NORMAL");
            setModeScreen("FULL");
            setOpenSidebar(false);
      };

      const styleEffect = {
            onCheckLengthTitle: () => {
                  return formCore?.form_title ? "w-max max-w-[9rem] xl:max-w-[20rem]" : "w-max";
            },
      };

      const label = renderText(formCore.form_state);

      if (modeScreen === "FULL") return null;

      const top = pathName.endsWith("/edit") ? "top-0" : "";

      return (
            <DivNative
                  className={`${top}    bg-color-section-theme sticky top-0  left-[28rem] right-[3rem] z-[101] flex-wrap  min-h-[8rem] w-auto  flex  justify-between  gap-[3rem]  p-[1.5rem_1rem] text-[1.3rem]`}
            >
                  <div className=" flex h-full items-center">
                        <DivNative className="flex h-[3.6rem]  items-center gap-[2rem]   text-textHeader ">
                              {!openSidebar && <ButtonIcon Icon={<ChevronsRight />} onClick={() => setOpenSidebar(true)} />}
                              <LogoHome />
                              <div className="mr-[2rem]">
                                    <DivNative className="h-full hidden xl:flex gap-[.2rem]  items-center  min-w-max">
                                          <ButtonIcon Icon={<ChevronRight size={18} />} className="hidden xl:inline" style={{ minWidth: "2rem" }} />
                                          <ParagraphNative
                                                className="hidden sm:block text-[1.5rem] font-bold p-[.6rem] rounded-lg text-text-theme"
                                                textContent="Nơi làm việc"
                                          />
                                    </DivNative>

                                    <DivNative className="h-full hidden xl:flex gap-[.2rem] items-center  min-w-max">
                                          <ButtonIcon Icon={<CiEdit size={18} />} className="hidden xl:inline" style={{ minWidth: "2rem" }} />

                                          <ParagraphNative
                                                className={`${styleEffect.onCheckLengthTitle()} truncate text-[1.5rem] font-bold p-[.6rem] rounded-lg text-text-theme `}
                                                textContent={formCore?.form_title.form_title_value || "Không tiêu đề"}
                                          />
                                    </DivNative>
                              </div>
                        </DivNative>

                        <div className="ml-auto  hidden sm:block">
                              <DashboardSearchForm />
                        </div>
                  </div>
                  <div className={`${openFormDesign ? "!ml-0" : "w-max "}  flex items-center justify-end gap-[2rem]`}>
                        {showHeaderAction && (
                              <DivNative className="w-full md:w-max ml-auto flex flex-wrap justify-end items-center gap-[1rem]">
                                    <DivNative className=" flex items-center justify-center " title="Review">
                                          <ButtonNative
                                                textContent={`Xem trước  `}
                                                className="min-w-[12rem] p-[.8rem] rounded-md text-text-theme"
                                                onClick={onSetScreen}
                                          />
                                    </DivNative>

                                    <DivNative className="relative  z-[103] xl:z-[105]  flex items-center justify-center " title={label}>
                                          <ButtonNative
                                                textContent={label}
                                                className=" min-w-[12rem] p-[.8rem] rounded-md bg-color-main text-white"
                                                onClick={() => setOpenModelFormState((prev) => !prev)}
                                          />
                                          {openModelFormState && (
                                                <div className="absolute z-[105] h-max min-w-full w-max top-[120%] right-0">
                                                      <ClickOutSide setOpenModel={setOpenModelFormState}>
                                                            <ModelFormState />
                                                      </ClickOutSide>
                                                </div>
                                          )}
                                    </DivNative>

                                    <Link
                                          href={"/settings"}
                                          className="p-[.2rem_.8rem] hidden xl:flex items-center gap-[.8rem] text-text-theme rounded-md"
                                          title="Cài đặt"
                                    >
                                          <Settings className="w-[1.6rem]" />
                                    </Link>
                                    <ButtonDarkMode />
                              </DivNative>
                        )}
                  </div>
            </DivNative>
      );
};

export default HeaderEditForm;
