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
import ButtonSidebar from "@/app/(NextClient)/_components/ui/button/ButtonSidebar";

const DashBoardRightHeader = () => {
      const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
      const { theme } = useContext(ThemeContext);
      const pathname = usePathname();
      return (
            <div
                  className={`w-full px-[.5rem] xl:px-[1.6rem] py-[1rem] xl:p-[2rem]  sticky  top-[0rem] z-[2]  h-[6rem]  flex flex-col gap-[1.6rem]  text-[1.3rem] bg-color-section-theme  `}
            >
                  <div className="h-full w-full flex items-center justify-between gap-[2rem] px-[1rem] xl:p-0">
                        <div className="hidden xl:flex gap-[1rem]">
                             
                              <p className="hidden xl:block text-text-theme text-[1.6rem] font-semibold w-max">{generateContentToUrl(pathname)}</p>
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

                        <div className="w-[60%] xl:w-[32%] " title="Tìm kiếm">
                              <DashboardSearchForm />
                        </div>

                        <div className="ml-auto hidden sm:block xl:hidden">
                              <ButtonDarkMode />
                        </div>
                        {/* 
                        <div className={`${theme === "light" ? "bg-transparent" : "bg-[#fff]"} hidden xl:flex items-center gap-[.8rem] rounded-md`}>
                              <div className="flex justify-center items-center">
                                    <p className="ml-[2rem] ">
                                          <span className="text-[#000] text-[2.8rem]">Kuro</span>
                                          <span className="text-color-main text-[2.8rem]">form</span>
                                    </p>
                                    <Image src={"/icon_core.png"} width={20} height={20} alt="avatar" unoptimized={true} className="w-[3rem] h-[3rem] " />
                                    
                              </div>
                        </div> */}
                        {/**
                        *  <div className="flex items-center gap-[1rem] text-color-main font-semibold text-[1.2rem]  xl:text-[2rem] w-[58%] xl:w-max ">
                              <Image
                                    src={
                                          "https://res.cloudinary.com/cloud304/image/upload/v1723200121/kuroform/users/user_id_66a0a5ca4ed899bf08b8f628/form_id_66b5d4c21795132645a3fbb7/avatar/file_u2uzlx.jpg"
                                    }
                                    width={30}
                                    height={30}
                                    alt="avatar"
                                    unoptimized={true}
                                    className="w-[3rem] h-[3rem] rounded-full"
                              />

                              <span>Created by KuroDev</span>
                        </div>
                        * 
                        */}

                        <div className=" xl:flex-auto flex items-center justify-end gap-[1rem] ">
                              <Link href={"/settings"} className="p-[.2rem_.8rem] flex items-center gap-[.8rem] text-text-theme rounded-md" title="Cài đặt">
                                    <Settings className="w-[1.6rem]" />
                              </Link>
                              <Notification />
                              <div className="hidden xl:block">
                                    <DashboardAccount />
                              </div>
                              <div className="hidden xl:block">
                                    <ButtonDarkMode />
                              </div>
                              <ButtonSidebar />
                        </div>
                  </div>
            </div>
      );
};

export default DashBoardRightHeader;
