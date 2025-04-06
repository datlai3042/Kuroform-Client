"use client";
import React, { useContext, useEffect, useState } from "react";
import Portal from "../_components/Portal";
import Link from "next/link";
import Image from "next/image";
import Logo from "../_components/logo/Logo";
import ButtonDarkMode from "../_components/ui/button/ButtonDarkMode";
import AuthorDat from "../_components/author/AuthorDat";
import { ThemeContext } from "../_components/provider/ThemeProvider";
import useDisableBodyScroll from "@/app/hooks/useDisalbeBodyScroll";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
      const [loader, setLoader] = useState<boolean>(false);
      const { theme } = useContext(ThemeContext);
      const url = theme === "light" ? "/assets/images/home/bg2.jpg" : "/assets/images/home/bg.jpg";
      useEffect(() => {
            setLoader(true);
      }, []);

      if (!loader) return null;

      return (
            <Portal>
                  <div
                        style={{ lineHeight: 1.6 }}
                        className="relative flex z-[500] w-full top-0 xl:top-0 left-0 min-h-screen h-max  xl:pt-0    bg-color-section-theme  "
                  >
                        <div className="basis-[40rem] overflow-auto flex-grow-[1] md:flex-grow-0 flex flex-col  items-center px-[20px] py-[1rem]">
                              <header className="w-full flex   justify-end items-center ">
                                    <ButtonDarkMode />
                              </header>
                              <div className="flex-1 flex items-center  w-full text-text-theme">{children}</div>
                              {/* <AuthorDat /> */}
                        </div>
                        <div className="hidden flex-1 relative  overflow-auto min-h-screen  md:flex justify-center items-center bg-color-section-theme ">
                        <Image src={url} width={20} height={20} unoptimized={true} alt="avatar" className="w-full  h-full z-[1]" />
                            
                              <div className="absolute inset-0  p-[1rem]">
                                    <div className="w-full h-full  border-[.1rem] border-[var(--border-color-input)] p-[1rem]"></div>
                              </div>
                        </div>
                  </div>
            </Portal>
      );
};

export default AuthLayout;
