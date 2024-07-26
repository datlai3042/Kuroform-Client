"use client";
import React, { useContext } from "react";
import { Bell, ChevronsRight, Flower, Plus, Search, Settings } from "lucide-react";
import { SidebarContext } from "../SidebarContext";
import Link from "next/link";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import Notification from "@/app/(NextClient)/_components/notification/Notification";
import Image from "next/image";
import DashboardAccount from "./DashboardAccount";
import ButtonCreateForm from "@/app/(NextClient)/_components/ui/button/ButtonCreateForm";
import ButtonDarkMode from "@/app/(NextClient)/_components/ui/button/ButtonDarkMode";
import { usePathname } from "next/navigation";
import { generateContentToUrl, generateFullNameUser } from "@/app/_lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import DashboardSearchForm from "./DashboardSearchForm";
import Logo from "@/app/(NextClient)/_components/logo/Logo";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";

const DashBoardRightHeader = () => {
      const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
      const { theme } = useContext(ThemeContext);
      const pathname = usePathname();
      return (
            <div
                  className={`w-full py-[2rem] xl:p-[2rem]  sticky  top-[0rem] z-[2]  h-[6rem]  flex flex-col gap-[1.6rem]  text-[1.3rem] bg-color-section-theme  `}
            >
                  <div className="h-full w-full flex items-center justify-between">
                        <div className="flex gap-[1rem]">
                              {!openSidebar && (
                                    <div className="flex items-center gap-[1rem] ">
                                          <ButtonIcon Icon={<ChevronsRight className="text-text-theme " size={18} />} onClick={() => setOpenSidebar(true)} />
                                    </div>
                              )}
                              <p className="hidden xl:block text-text-theme text-[2rem] font-semibold">{generateContentToUrl(pathname)}</p>
                        </div>
                        <div className="hidden sm:block xl:hidden">
                              <Link href={"/dashboard"}>
                                    <Image
                                          src={"/assets/images/icon/logo/logo_home.png"}
                                          width={70}
                                          height={70}
                                          quality={100}
                                          alt="logo"
                                          className="w-[6rem] h-[5rem] "
                                          unoptimized={true}
                                    />
                              </Link>
                        </div>

                        <div className="w-[40%] xl:w-[32%] " title="Tìm kiếm">
                              <DashboardSearchForm />
                        </div>

                        <div className="hidden sm:block xl:hidden">
                              <ButtonDarkMode />
                        </div>

                        <div className="hidden xl:flex items-center gap-[.8rem]">
                              <div
                                    className={`${
                                          theme === "light" ? "bg-transparent" : "bg-[#fff]"
                                    }  w-[4rem] h-[4rem] rounded-full flex items-center justify-center`}
                              >
                                    <Image src={"/icon_core.png"} width={20} height={20} alt="avatar" unoptimized={true} className="w-[3.4rem] h-[3.4rem] " />
                              </div>
                              <ButtonCreateForm
                                    textContent="Tạo Form"
                                    urlNavigation="/"
                                    className=" xl:[&]:p-[4px_8px] !text-[1.4rem]"
                                    position="LEFT"
                                    icon={<Plus />}
                              />
                        </div>

                        <div className="flex justify-end gap-[1rem] xl:gap-[20px]">
                              <Link href={"/settings"} className="p-[.2rem_.8rem] flex items-center gap-[.8rem] text-text-theme rounded-md" title="Cài đặt">
                                    <Settings className="w-[1.6rem]" />
                              </Link>
                              <Notification />
                              <DashboardAccount />
                              <div className="hidden xl:block">
                                    <ButtonDarkMode />
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default DashBoardRightHeader;
