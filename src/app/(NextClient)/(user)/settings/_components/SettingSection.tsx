"use client";
import React, { SetStateAction, useEffect } from "react";
import SettingUpdateAvatar from "./SettingUpdateAvatar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { Tabs } from "antd";

type TProps = {
      tab: "account" | "create_password" | "update_password";
      setTab: React.Dispatch<SetStateAction<"account" | "create_password" | "update_password">>;
};

const SettingSection = (props: TProps) => {
      const { tab, setTab } = props;

      const user = useSelector((state: RootState) => state.authReducer.user);

      const styleEffect = {
            onActive: (check: boolean) => {
                  if (check) return "";
                  return "text-text-theme hover:text-[#1677ff]";
            },
      };

      return (
            <>
                  <Tabs
                        id="custom-tabs"
                        style={{ color: "#fff" }}
                        defaultActiveKey={"account"}
                        onChange={(value) => setTab(value as "account" | "create_password" | "update_password")}
                  >
                        <Tabs.TabPane
                              key="account"
                              tab={
                                    <div className=" min-h-[3rem] flex items-center justify-between  ">
                                          <button
                                                onClick={() => setTab("account")}
                                                className={`${styleEffect.onActive(tab === "account")} h-full pb-[.3rem]  font-semibold `}
                                          >
                                                Tài khoản của tôi
                                          </button>
                                    </div>
                              }
                        />

                        {user?.user_auth === "oAuth" && !user?.user_create_password && (
                              <Tabs.TabPane
                                    key="create_password"
                                    tab={
                                          <div className="min-h-[3rem] flex items-center justify-between  ">
                                                <button
                                                      onClick={() => setTab("create_password")}
                                                      className={`${styleEffect.onActive(
                                                            tab === "create_password",
                                                      )} h-full pb-[.3rem]  font-semibold `}
                                                >
                                                      Tạo mật khẩu
                                                </button>
                                          </div>
                                    }
                              />
                        )}

                        <Tabs.TabPane
                              key="update_password"
                              tab={
                                    <div className="min-h-[3rem] flex items-center justify-between  ">
                                          <button
                                                onClick={() => setTab("update_password")}
                                                className={`${styleEffect.onActive(
                                                      tab === "update_password",
                                                )} h-full pb-[.3rem]  font-semibold  `}
                                          >
                                                Cập nhật mật khẩu
                                          </button>
                                    </div>
                              }
                        />
                  </Tabs>
            </>
      );
};

export default SettingSection;
