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
                  <div className=" flex flex-col  bg-color-gap-empty text-text-theme ">
                        <SettingHeader />

                        <div className="flex-1 min-h-[60rem] h-full text-text-theme bg-[var(--bg-space)] p-[0rem_2.6rem_2rem_2.6rem] rounded-[1.2rem_1.2rem_0_0]">
                              <h3 className="my-[2.2rem] !text-[2.8rem]">Quản lí các thông báo</h3>
                              <div className="w-full bg-[var(--color-section-theme)] p-[2.8rem] rounded-[1.2rem_1.2rem_0_0]">
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
