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
                  <div className={` w-full min-h-screen h-max   flex flex-col   text-[1.4rem] `}>
                        <SettingHeader />
                        <div className="flex-1 min-h-[60rem] flex flex-col h-full text-text-theme bg-[var(--bg-module-other)] p-[0rem_2.6rem_2rem_2.6rem] rounded-[1.2rem_1.2rem_0_0]">
                              <h3 className="my-[2rem] pl-[.8rem] !text-[2.3rem]">Cài đặt</h3>
                              <div className="w-full bg-[var(--color-section-theme)] flex-1 p-[2.8rem] rounded-[1.2rem_1.2rem_0_0]">
                                    <SettingSection tab={tab} setTab={setTab} />
                                    {user && tab === "account" && <SettingAccount />}
                                    {!user?.user_create_password && tab === "create_password" && <SettingCreatePassword setTab={setTab} />}
                                    {user && tab === "update_password" && <SettingUpdatePassword setTab={setTab} />}

                                    {!user && (
                                          <div className=" h-full flex flex-col gap-[1.8rem]">
                                                <div className="animate-pulse w-full h-[3rem] rounded-md bg-slate-200"></div>
                                                <div className="animate-pulse  h-[8rem] w-[8rem] rounded-full bg-slate-200"></div>

                                                <div className="animate-pulse w-full h-[3rem] rounded-md bg-slate-200"></div>
                                                <div className="animate-pulse bg-slate-200 w-[60%] p-[.2rem_.8rem] h-[2.7rem] "></div>

                                                <div className="animate-pulse bg-slate-200 w-full p-[.2rem_.8rem] h-[3.7rem] "></div>
                                                <div className="animate-pulse bg-slate-200 w-[70%] p-[.2rem_.8rem] h-[2.7rem] "></div>
                                                <div className="animate-pulse bg-slate-200 w-[80%] p-[.2rem_.8rem] h-[2.7rem] "></div>
                                                <div className="animate-pulse w-full h-[3rem] rounded-md bg-slate-200"></div>
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>
            </LayoutSidebar>
      );
};

export default SettingPage;
