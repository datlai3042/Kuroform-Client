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
const SettingPage = () => {
      const user = useSelector((state: RootState) => state.authReducer.user);

      const [tab, setTab] = useState<"account" | "create_password" | "update_password">("account");
      useEffect(() => {
            console.log({ user });
      }, [user?.user_create_password]);
      return (
            <LayoutSidebar>
                  <div className="w-full min-h-screen h-max    p-[.8rem_1.8rem_6rem_.8rem] flex flex-col gap-[5rem] text-[1.4rem]  bg-color-section-theme">
                        <SettingHeader />
                        <div className="w-[90%] xl:w-[69%] min-h-[60rem] mx-auto text-text-theme">
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
            </LayoutSidebar>
      );
};

export default SettingPage;
