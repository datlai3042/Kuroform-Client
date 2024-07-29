import React, { useContext, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight, Notebook } from "lucide-react";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import useGetAllFormUser from "@/app/hooks/useGetAllFormUser";
import LoadingArea from "@/app/(NextClient)/_components/ui/loading/LoadingArea";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import DashboardWorkspaceItemContent from "./DashboardWorkspaceItemContent";

const DashboardWorkspaces = () => {
      const [openWorkspace, setOpenWorkspace] = useState<boolean>(false);
      const { forms, pending, success } = useGetAllFormUser();
      const { theme } = useContext(ThemeContext);

      const divWrapper = useRef<HTMLDivElement | null>(null);
      const divFormItem = useRef<HTMLAnchorElement | null>(null);

      const pathName = usePathname();

      const Icon = openWorkspace ? <ChevronDown className="w-[1.4rem] text-[#fff] " /> : <ChevronRight className="w-[1.4rem] text-[#fff] " />;

      const styleEffect = {
            onCheckFocus: (state: boolean) => {
                  if (state) return "bg-blue-400 text-[#fff] outline outline-[2px] outline-blue-200";
                  return "hover:border-[.1rem] hover:border-text-theme";
            },
      };

      const hoverThemeStyle = theme === "dark" ? "hover:bg-blue-400 scroll-color-main" : "hover:bg-blue-100 scroll-common";

      const scrollThemeStyle = theme === "dark" ? "scroll-color-main" : "scroll-common";

      const formIsFocusing = pathName.startsWith("/form") && pathName?.split("/form")[1].split("/edit")[0].slice(1);
      useEffect(() => {
            if (
                  forms.map((form) => {
                        if (form._id === formIsFocusing) {
                              return setOpenWorkspace(true);
                        }
                  })
            ) {
            }
      }, [pathName, forms]);

      useEffect(() => {
            if (openWorkspace) {
                  if (divFormItem.current && divWrapper.current) {
                        divWrapper.current.scrollTop = divFormItem.current.offsetTop;
                  }
            }
      }, [pathName, openWorkspace]);

      return (
            <div className="pl-[.6rem]  flex flex-col gap-[.6rem] hover:cursor-pointer" onClick={() => setOpenWorkspace((prev) => !prev)}>
                  {success && (
                        <>
                              <p className="text-[1.3rem] text-[rgb(137_136_132)]">Nơi làm việc</p>

                              <div
                                    className={`nav ${
                                          pathName.startsWith("/form") ? "nav__isActive" : "nav__normal !text-text-theme "
                                    } group p-[.1rem] flex items-center gap-[1rem] text-text-theme`}
                              >
                                    <ButtonIcon
                                          Icon={Icon}
                                          className={`${styleEffect.onCheckFocus(openWorkspace)} flex bg-color-main rounded-lg !w-[1.4rem] !h-[1.4rem]`}
                                    />
                                    <span className="group-hover:!text-[#fff]">Nơi làm việc</span>
                              </div>
                              {openWorkspace && forms.length > 0 && (
                                    <div
                                          ref={divWrapper}
                                          className={`${scrollThemeStyle} ml-[1rem]  min-h-[2rem] max-h-[34rem]  transition-[height] duration-500 overflow-y-scroll  flex flex-col gap-[1.4rem] text-text-them e pr-[2rem]`}
                                    >
                                          {forms.map((form) => {
                                                if (formIsFocusing == form._id) {
                                                      return (
                                                            <Link
                                                                  ref={divFormItem}
                                                                  key={form._id}
                                                                  href={`/form/${form._id}/edit`}
                                                                  className={`${hoverThemeStyle} ${
                                                                        formIsFocusing === form._id ? "bg-color-main text-[#fff] " : ""
                                                                  } flex items-center w-full h-[4rem]  gap-[1rem] text-[1.4rem]  p-[.6rem_1rem] rounded-xl`}
                                                            >
                                                                  <DashboardWorkspaceItemContent formCore={form} />
                                                            </Link>
                                                      );
                                                }
                                                return (
                                                      <Link
                                                            key={form._id}
                                                            href={`/form/${form._id}/edit`}
                                                            className={`${hoverThemeStyle} ${
                                                                  formIsFocusing === form._id ? "bg-color-main" : ""
                                                            } flex items-center w-full h-[5rem]  gap-[1rem] text-[1.4rem]  p-[.6rem_1rem] `}
                                                      >
                                                            <DashboardWorkspaceItemContent formCore={form} />
                                                      </Link>
                                                );
                                          })}
                                    </div>
                              )}
                              {openWorkspace && forms.length === 0 && (
                                    <div className="p-[.4rem_2rem] text-[1.3rem] text-gray-400">Danh sách hiện đang trống</div>
                              )}
                        </>
                  )}

                  {pending && (
                        <div className="w-full h-[2rem]">
                              <LoadingArea />
                        </div>
                  )}
            </div>
      );
};

export default DashboardWorkspaces;
