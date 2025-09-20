import React, { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight, Notebook } from "lucide-react";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import useGetAllFormUser from "@/app/hooks/useGetAllFormUser";
import LoadingArea from "@/app/(NextClient)/_components/ui/loading/LoadingArea";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import DashboardWorkspaceItemContent from "./DashboardWorkspaceItemContent";
import { FormCore } from "@/type";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import Portal from "@/app/(NextClient)/_components/Portal";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useDisableBodyScroll from "@/app/hooks/useDisalbeBodyScroll";
import { SidebarContext } from "../../SidebarContext";

const DashboardWorkspaces = () => {
      const [openWorkspace, setOpenWorkspace] = useState<boolean>(false);
      const { forms, pending, success } = useGetAllFormUser();
      const { theme } = useContext(ThemeContext);
      const { setOpenSidebar } = useContext(SidebarContext);

      const [openModalWorkSpace, setOpenModalWorkSpace] = useState(false);

      const divWrapper = useRef<HTMLDivElement | null>(null);
      const divFormItem = useRef<HTMLAnchorElement | null>(null);

      const pathName = usePathname();

      const Icon = openWorkspace ? <ChevronDown className="w-[1.4rem] text-[#fff] " /> : <ChevronRight className="w-[1.4rem] text-[#fff] " />;

      const styleEffect = {
            onCheckFocus: (state: boolean) => {
                  if (state) return "rounded-sm bg-blue-400 text-[#fff]  outline outline-[2px] outline-blue-200";
                  return "hover:border-[.1rem] hover:border-text-theme rounded-sm";
            },
      };

      const hoverThemeStyle = theme === "dark" ? "hover:bg-blue-400 scroll-color-main" : "hover:bg-blue-100 scroll-common";

      const scrollThemeStyle = theme === "dark" ? "scroll-color-main" : "scroll-common";

      useEffect(() => {
            if (openWorkspace) {
                  if (divFormItem.current && divWrapper.current) {
                        divWrapper.current.scrollTop = divFormItem.current.offsetTop;
                  }
            }
      }, [pathName, openWorkspace]);

      return (
            <div
                  className="pl-[.6rem]  flex flex-col gap-[.6rem] hover:cursor-pointer"
                  onClick={() => {
                        setOpenModalWorkSpace((prev) => {
                              // if (!prev) {
                              //       setOpenSidebar(false);
                              // }

                              return !prev;
                        });
                  }}
            >
                  {success && (
                        <>
                              <p className="text-[1.3rem] text-[rgb(137_136_132)]">Các form đã tạo</p>

                              <div
                                    className={`nav ${
                                          pathName.startsWith("/form") ? "nav__isActive" : "nav__normal !text-text-theme hover:bg-color-main"
                                    } group !p-[.1rem] rounded-sm flex items-center gap-[1rem] text-text-theme`}
                              >
                                    <ButtonIcon
                                          Icon={Icon}
                                          className={`${styleEffect.onCheckFocus(openWorkspace)}  flex bg-color-main !rounded-full !w-[1rem] !h-[1rem]`}
                                    />
                                    <span className="group-hover:!text-[#fff]">Mở danh sách Form</span>
                              </div>
                        </>
                  )}

                  {pending && (
                        <div className="w-full h-[2rem]">
                              <LoadingArea />
                        </div>
                  )}

                  {openModalWorkSpace && <ModalWorkSpace forms={forms} openWorkspace={openModalWorkSpace} setOpenWorkspace={setOpenModalWorkSpace} />}
            </div>
      );
};

const ModalWorkSpace = ({
      openWorkspace,
      forms,
      setOpenWorkspace,
}: {
      openWorkspace: boolean;
      forms: FormCore.Form[];
      setOpenWorkspace: React.Dispatch<SetStateAction<boolean>>;
}) => {
      return (
            <Portal>
                  <DivNative className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-[999] px-[1rem] flex justify-center items-center">
                        <div
                              className="relative  max-w-[90vw] w-[60vw]  h-[50rem]    flex flex-col bg-color-section-theme text-text-theme rounded-lg  p-[1.6rem_1rem] "
                              onClick={(e) => e.stopPropagation()}
                        >
                              <button
                                    onClick={() => setOpenWorkspace(false)}
                                    type="button"
                                    className="ml-auto  w-[12rem] h-[3.6rem] text-[1.4rem] text-white bg-color-main  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800"
                              >
                                    Đóng Modal
                              </button>

                              <div className="w-full h-[30rem] overflow-auto mt-[2rem] px-[.5rem] flex-1  min-h-[10rem] py-[1rem] rounded-lg  flex flex-col gap-[.5rem] text-[1.4rem] text-[#000]">
                                    {forms.length > 0 && (
                                          <div
                                                className={` ml-[1rem] overflow-x-auto  transition-[height] duration-500   flex flex-col gap-[1.8rem] text-text-theme pr-[2rem]`}
                                          >
                                                <Table className="text-[1.4rem] !border-[0rem] hidden-border-table">
                                                      <TableHeader>
                                                            <TableRow>
                                                                  <TableHead className="w-[100px] max-w-[20rem]">Chi tiết</TableHead>

                                                                  <TableHead className="w-[100px] whitespace-pre text-right">Lượt xem</TableHead>
                                                                  <TableHead className="w-[100px] whitespace-pre text-right">Phản hồi</TableHead>
                                                            </TableRow>
                                                      </TableHeader>
                                                      <TableBody>
                                                            {forms.map((form) => {
                                                                  return (
                                                                        <TableRow key={form._id} className="group">
                                                                              <DashboardWorkspaceItemContent formCore={form} />
                                                                        </TableRow>
                                                                  );
                                                            })}
                                                      </TableBody>
                                                </Table>
                                          </div>
                                    )}
                                    {openWorkspace && forms.length === 0 && (
                                          <div className="p-[.4rem_2rem] text-[1.3rem] text-gray-400">Danh sách hiện đang trống</div>
                                    )}
                              </div>
                        </div>
                  </DivNative>
            </Portal>
      );
};

export default DashboardWorkspaces;
