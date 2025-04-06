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
                        <div className="px-[2.8rem] fixed  sm:static top-0 left-0 right-0 border-b-[.1rem] border-[var(--border-color-input)] z-[999]  bg-color-section-theme">
                              <SettingHeader />
                        </div>

                        <div className="flex-1 min-h-[60rem] overflow-hidden h-full text-text-theme bg-[var(--bg-module-other)]">
                              <h3 className="my-[2rem] pl-[2.8rem] !text-[2.3rem]">Quản lí các thông báo</h3>
                              <div className="h-[94%] overflow-auto w-full bg-[var(--color-section-theme)] p-[2.8rem_2.8rem_0rem] ">
                                    <div className="h-full flex items-center justify-between pb-[1rem] border-b-[.1rem] border-[var(--border-color-input)] ">
                                          <NotificationMode />
                                    </div>
                              </div>
                        </div>
                  </div>
            </LayoutSidebar>
      );
};

export default NotficationPage;
