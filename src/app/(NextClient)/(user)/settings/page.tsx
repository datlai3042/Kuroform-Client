"use client";

import React, { useEffect, useState } from "react";
import SettingHeader from "./_components/SettingHeader";
import SettingSection from "./_components/SettingSection";
import SettingAccount from "./_components/SettingAccount";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import SettingCreatePassword from "./_components/SettingCreatePassword";
import SettingUpdatePassword from "./_components/SettingUpdatePassword";
import LayoutSidebar from "../../_components/Layout/LayoutSidebar";
import { usePathname } from "next/navigation";
const SettingPage = () => {
      const user = useSelector((state: RootState) => state.authReducer.user);

      const [tab, setTab] = useState<"account" | "create_password" | "update_password">("account");
      useEffect(() => {}, [user?.user_create_password]);

      return (
            <LayoutSidebar>
                  <div className={` w-full min-h-screen h-max    p-[.8rem_0rem_0rem_0rem] flex flex-col gap-[2rem]  text-[1.4rem]  bg-color-section-theme`}>
                        <SettingHeader />
                        <div className="flex-1 min-h-[60rem] h-full text-text-theme bg-[var(--bg-space)] p-[0rem_2.6rem_2rem_2.6rem] rounded-[1.2rem_1.2rem_0_0]">
                              <h3 className="my-[2.2rem] !text-[2.8rem]">Cài đặt</h3>
                              <div className="w-full bg-[var(--color-section-theme)] p-[2.8rem] rounded-[1.2rem_1.2rem_0_0]">
                                    <SettingSection tab={tab} setTab={setTab} />
                                    {user && tab === "account" && <SettingAccount />}
                                    {!user?.user_create_password && tab === "create_password" && <SettingCreatePassword setTab={setTab} />}
                                    {user && tab === "update_password" && <SettingUpdatePassword setTab={setTab} />}

                                    {!user && (
                                          <div className="flex flex-col gap-[1.8rem]">
                                                <div className="animate-pulse w-full h-[10rem] rounded-md bg-slate-200"></div>
                                                <div className="animate-pulse w-full h-[10rem] rounded-md bg-slate-200"></div>
                                                <div className="animate-pulse w-full h-[10rem] rounded-md bg-slate-200"></div>
                                                <div className="animate-pulse w-full h-[10rem] rounded-md bg-slate-200"></div>
                                                <div className="animate-pulse bg-slate-200 w-[10%] p-[.2rem_.8rem] h-[20.7rem] d"></div>
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>
            </LayoutSidebar>
      );
};

export default SettingPage;
