"use client";
import { RootState } from "@/app/_lib/redux/store";
import { ChevronRight, ChevronsRight, Pencil, Settings } from "lucide-react";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SidebarContext } from "@/app/(NextClient)/(user)/dashboard/SidebarContext";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import { usePathname, useRouter } from "next/navigation";

import { FormCore, Toast } from "@/type";

import DashboardSearchForm from "@/app/(NextClient)/(user)/dashboard/_components/DashboardSearchForm";
import LogoHome from "@/app/(NextClient)/_components/logo/LogoHome";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import ButtonDarkMode from "@/app/(NextClient)/_components/ui/button/ButtonDarkMode";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import Link from "next/link";
import ModelFormState from "./ModelFormState";
import ButtonSidebar from "@/app/(NextClient)/_components/ui/button/ButtonSidebar";
import { useMediaQuery } from "@mantine/hooks";
import ButtonDeleteForm from "../../_components/ButtonDeleteForm";
import { addOneToastSuccess } from "@/app/_lib/redux/toast.slice";

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

      const [openModelFormState, setOpenModelFormState] = useState<boolean>(false);

      const pathName = usePathname();

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
      const matches = useMediaQuery(
            "(max-width: 767px)",
            false,

            {
                  getInitialValueInEffect: false,
            },
      );
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
                  className={`${top}    bg-color-section-theme sticky top-0  left-[28rem] right-[3rem] z-[200] flex-wrap   w-auto  flex  justify-between  gap-[.6rem]  p-[.6rem_1.8rem] text-[1.3rem]`}
            >
                  {!matches && (
                        <div className="w-[60%] hidden sm:flex  h-full items-center">
                              <DivNative className="flex h-[3.6rem]  items-center gap-[2rem]   text-textHeader ">
                                    <ButtonSidebar />
                                    <div className="mr-[2rem]">
                                          <DivNative className="h-full hidden xl:flex gap-[.2rem] items-center  min-w-max">
                                                <ButtonIcon Icon={<Pencil size={18} />} className="hidden xl:inline" style={{ minWidth: "2rem" }} />
                                                <div
                                                      className={`${styleEffect.onCheckLengthTitle()} h-[3.6rem] reset-editor truncate text-[1.5rem] font-bold p-[.6rem] rounded-lg text-text-theme `}
                                                      dangerouslySetInnerHTML={{ __html: formCore?.form_title.form_title_value || "Không tiêu đề" }}
                                                ></div>
                                          </DivNative>
                                    </div>
                              </DivNative>

                              <div className=" hidden sm:block w-[30rem]">
                                    <DashboardSearchForm widthInput="100%" />
                              </div>
                        </div>
                  )}
                  <div className={`${openFormDesign ? "!ml-0" : "w-max "} flex-grow-[1] w-full xl:w-auto flex items-center justify-end gap-[2rem]`}>
                        {showHeaderAction && (
                              <DivNative
                                    style={{ justifyContent: matches ? "start" : "" }}
                                    className="w-full  xl:ml-auto flex flex-wrap justify-end items-center gap-[1rem]"
                              >
                                    <DivNative className=" flex items-center justify-center " title="Review">
                                          <ButtonNative
                                                textContent={`Xem trước  `}
                                                className="min-w-[9rem] p-[.8rem] rounded-md text-text-theme"
                                                onClick={onSetScreen}
                                          />
                                    </DivNative>

                                    <DivNative className="relative  z-[103] xl:z-[105]  flex items-center justify-center " title={label}>
                                          <ButtonNative
                                                textContent={label}
                                                className=" min-w-[9rem] p-[.8rem] rounded-md bg-color-main text-white"
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

                                    <div style={{ marginLeft: matches ? "auto" : "" }} className="flex gap-[1rem]">
                                          <ButtonDarkMode />
                                          {matches && <ButtonSidebar />}
                                    </div>
                                    <ButtonDeleteForm
                                          title="Xóa Form"
                                          form_id={formCore._id}
                                          className="  flex items-center gap-[1rem] p-[.5rem_.7rem]  text-text-theme rounded-lg  "
                                    ></ButtonDeleteForm>
                              </DivNative>
                        )}
                  </div>
            </DivNative>
      );
};

export default HeaderEditForm;
