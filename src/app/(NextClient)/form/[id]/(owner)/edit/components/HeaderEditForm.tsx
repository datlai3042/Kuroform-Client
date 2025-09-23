"use client";
import { RootState } from "@/app/_lib/redux/store";
import { ChevronRight, ChevronsRight, Ellipsis, LinkIcon, Pencil, Settings, Trash2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
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
      const [showMore, setShowMore] = useState(false);
      const pathName = usePathname();
      const { theme, setTheme } = useContext(ThemeContext);

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
      useEffect(() => {
            const container = document.querySelector<HTMLDivElement>(".header_container");
            if (!container) return;

            const checkWrap = () => {
                  const headerLeft = document.querySelector(".header-left");
                  const headerRight = document.querySelector(".header-right");
                  let check = true;
                  if (headerLeft && headerRight) {
                        const headerLeftWidth = headerLeft?.getBoundingClientRect().width;
                        const containerWidth = container?.getBoundingClientRect().width;

                        if (headerLeftWidth + 320 > containerWidth) {
                              check = true;
                        } else {
                              check = false;
                        }
                        // console.log({headerLeftWidth, containerWidth})
                        // if (headerLeftWidth + 270 < containerWidth) {
                        //       check = false;
                        // } else {
                        //       check = true
                        // }
                  }
                  return check;
            };

            const resizeObs = new ResizeObserver(() => {
                  const headerLeft = document.querySelector(".header-left");
                  const headerRight = document.querySelector(".header-right");
                  if (headerLeft && headerRight) {
                        const headerLeftWidth = headerLeft?.getBoundingClientRect().width;
                        const containerWidth = container?.getBoundingClientRect().width;

                        let check;
                        if (headerLeftWidth + 300 > containerWidth) {
                              check = true;
                        } else {
                              check = false;
                        }
                        // console.log({headerLeftWidth, containerWidth})
                        // if (headerLeftWidth + 270 < containerWidth) {
                        //       check = false;
                        // } else {
                        //       check = true
                        // }
                        setShowMore(check);
                  }
            });
            resizeObs.observe(container);
            setShowMore(checkWrap());

            return () => resizeObs.disconnect();
      }, []);

      if (modeScreen === "FULL") return null;

      const top = pathName.endsWith("/edit") ? "top-0" : "";

      const onChangeTheme = () => {
            setTheme((prev) => (prev === "dark" ? "light" : "dark"));
      };

      return (
            <DivNative
                  className={`${top}  header_container  bg-color-section-theme sticky top-0  left-[28rem] right-[3rem] z-[200] flex-wrap   w-auto  flex  justify-between  gap-[.6rem]  p-[.6rem_1.8rem] text-[1.3rem]`}
            >
                  {!matches && (
                        <div className="w-[60%] hidden sm:flex  h-full items-center header-left">
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
                              <>
                                    {showMore ? (
                                          <div className="header-right">
                                                <HeaderMoreAction>
                                                      <DivNative
                                                            className="hover:bg-color-main flex items-center hover:text[#fff]  justify-start"
                                                            title="Review"
                                                      >
                                                            <ButtonNative
                                                                  textContent={`Xem trước  `}
                                                                  className="w-full  p-[.8rem] rounded-md "
                                                                  onClick={onSetScreen}
                                                            />
                                                      </DivNative>

                                                      <DivNative className="relative  z-[103] xl:z-[105]  flex items-center justify-start " title={label}>
                                                            <ButtonNative
                                                                  textContent={label}
                                                                  className=" w-full p-[.8rem] rounded-md bg-color-main text-white"
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
                                                            <button
                                                                  onClick={() => {
                                                                        if (theme === "light") {
                                                                              return setTheme("dark");
                                                                        } else {
                                                                              return setTheme("light");
                                                                        }
                                                                  }}
                                                                  className="flex w-full hover:bg-color-main hover:text-[#fff] justify-center items-center gap-[.6rem]"
                                                            >
                                                                  <ButtonDarkMode disable={true} />
                                                                  <span>Giao diện</span>
                                                            </button>
                                                      </div>
                                                      {matches && <ButtonSidebar />}

                                                      <div className="flex hover:bg-red-700 hover:text-[#fff] w-full justify-center items-center gap-[.6rem]">
                                                            <ButtonDeleteForm
                                                                  title="Xóa Form"
                                                                  form_id={formCore._id}
                                                                  className="  flex items-center gap-[1rem] p-[.5rem_.7rem]  rounded-lg  "
                                                            ></ButtonDeleteForm>
                                                            <span>Xóa Form</span>
                                                      </div>
                                                </HeaderMoreAction>
                                          </div>
                                    ) : (
                                          <DivNative
                                                style={{ justifyContent: matches ? "start" : "" }}
                                                className="w-[27rem] header-right  xl:ml-auto flex flex-wrap justify-end items-center gap-[1rem]"
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
                              </>
                        )}
                  </div>
            </DivNative>
      );
};

const HeaderMoreAction = ({ children }: { children: React.ReactNode }) => {
      return (
            <>
                  <div className="text-text-theme relative cursor-pointer group">
                        <Ellipsis />
                        <div className="absolute hidden group-hover:flex z-[3] top-[90%] right-0">
                              <div className=" text-[1.2rem]  w-[16rem]  h-max bg-color-section-theme text-text-theme rounded-lg border-[.1rem]  border-[var(--border-color-input)] shadow-lg flex flex-col gap-[.5rem]  ">
                                    {children}
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default HeaderEditForm;
