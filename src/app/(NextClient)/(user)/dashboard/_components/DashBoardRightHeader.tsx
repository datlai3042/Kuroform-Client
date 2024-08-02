"use client";
import React, { useContext } from "react";
import { Bell, ChevronsRight, Flower, Plus, Search, Settings } from "lucide-react";
import { SidebarContext } from "../SidebarContext";
import Link from "next/link";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import Notification from "@/app/(NextClient)/_components/notification/Notification";
import Image from "next/image";
import DashboardAccount from "./DashboardAccount";
import ButtonDarkMode from "@/app/(NextClient)/_components/ui/button/ButtonDarkMode";
import { usePathname } from "next/navigation";
import { generateContentToUrl, generateFullNameUser } from "@/app/_lib/utils";
import DashboardSearchForm from "./DashboardSearchForm";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";

const DashBoardRightHeader = () => {
      const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
      const { theme } = useContext(ThemeContext);
      const pathname = usePathname();
      return (
            <div
                  className={`w-full px-[.5rem] xl:px-[1rem] py-[2rem] xl:p-[2rem]  sticky  top-[0rem] z-[2]  h-[6rem]  flex flex-col gap-[1.6rem]  text-[1.3rem] bg-color-section-theme  `}
            >
                  <div className="h-full w-full flex items-center justify-between">
                        <div className="hidden xl:flex gap-[1rem]">
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

                        <div className={`${theme === "light" ? "bg-transparent" : "bg-[#fff]"} hidden xl:flex items-center gap-[.8rem] rounded-md`}>
                              <div className="flex justify-center items-center">
                                    <p className="ml-[2rem] ">
                                          <span className="text-[#000] text-[2.8rem]">Kuro</span>
                                          <span className="text-color-main text-[2.8rem]">form</span>
                                    </p>
                                    <Image src={"/icon_core.png"} width={20} height={20} alt="avatar" unoptimized={true} className="w-[3rem] h-[3rem] " />
                              </div>
                        </div>

                        <div className="flex-1 xl:flex-auto flex xl:justify-end gap-[1.6rem] xl:gap-[2rem]">
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
