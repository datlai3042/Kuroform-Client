"use client";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../_components/provider/ThemeProvider";
import Portal from "../_components/Portal";
import LogoApplication from "../_components/logo/LogoApplication";
import AuthRecents from "./_components/AuthRecents";
import { on } from "events";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
      const [loader, setLoader] = useState<boolean>(false);
      const { theme, onReset, setTheme } = useContext(ThemeContext);
      const url = "/assets/images/home/application_desktop_dark.png";
      const urlMobi = "/assets/images/home/application_mobile.png";
      const urlRec = "/assets/images/home/rectangle.png";
      const dispatch = useDispatch();
      useEffect(() => {
            setLoader(true);
      }, []);

      useEffect(() => {
            setTheme("dark");
      }, []);
      if (!loader) return null;


      return (
            <Portal>
                  <div
                        style={{ lineHeight: 1.6 }}
                        className="relative flex items-center justify-center z-[500] w-full top-0 xl:top-0 left-0 min-h-screen   px-[2rem] md:px-[12rem] md:py-[2rem]   bg-[#f2f4f7]  "
                  >
                        <div
                              className="absolute inset-0"
                              style={{
                                    backgroundSize: "cover",
                                    backgroundImage: 'url("/assets/images/home/background.png")',
                              }}
                        ></div>
                        <div className="relative z-20 flex w-full  justify-center xl:justify-between  gap-[18rem]">
                              <div className="hidden xl:flex  flex-col gap-[3rem]">
                                    <div className=" flex items-center">
                                          <LogoApplication />
                                    </div>
                                    <div className=" ">
                                          <AuthRecents />
                                    </div>
                              </div>
                              <div className="basis-[42rem] rounded-lg  max-w-[100vw] justify-between items-center   overflow-auto flex-grow-[1] flex-shrink-0 md:flex-grow-0 flex flex-col   ">
                                    <div className="bg-[#06122e] shadow-2xl rounded-md p-[3.2rem_2.8rem] flex h-max   w-full text-[#fff]   auth-scroll">
                                          {children}
                                    </div>
                              </div>
                        </div>
                  </div>
            </Portal>
      );
};

export default AuthLayout;
