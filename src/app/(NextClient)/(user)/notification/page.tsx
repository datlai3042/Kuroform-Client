"use client";
import React from "react";
import LayoutSidebar from "../../_components/Layout/LayoutSidebar";
import Image from "next/image";
import NotificationMode from "./_components/NotificationMode";
import ButtonDarkMode from "../../_components/ui/button/ButtonDarkMode";
import SettingHeader from "../settings/_components/SettingHeader";

const NotficationPage = () => {
      return (
            <LayoutSidebar>
                  <div className=" flex flex-col h-screen   bg-color-gap-empty text-text-theme ">
                        <div className="px-[1rem]  bg-color-section-theme">
                        <SettingHeader />


                        </div>

                        <div className="flex-1 min-h-[60rem] h-full text-text-theme bg-[var(--bg-module-other)] p-[0rem_2.6rem_2rem_2.6rem]">
                              <h3 className="my-[2rem] pl-[.8rem] !text-[2.3rem]">Quản lí các thông báo</h3>
                              <div className="h-[88%] overflow-auto w-full bg-[var(--color-section-theme)] p-[2.8rem] ">
                                    <div className="min-h-[40px] flex items-center justify-between pb-[1rem] border-b-[.1rem] border-slate-200 ">
                                          <NotificationMode />
                                    </div>
                              </div>
                        </div>
                  </div>
            </LayoutSidebar>
      );
};

export default NotficationPage;
