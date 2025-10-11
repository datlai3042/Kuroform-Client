"use client";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../_components/provider/ThemeProvider";
import Portal from "../_components/Portal";
import AuthRecents from "./_components/AuthRecents";
import LogoApplication from "../_components/logo/LogoApplication";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [loader, setLoader] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const url = "/assets/images/home/application_desktop_dark.png";
  const urlMobi = "/assets/images/home/application_mobile.png";
  const urlRec = "/assets/images/home/rectangle.png";
  const dispatch = useDispatch();
  useEffect(() => {
    setLoader(true);
  }, []);

  if (!loader) return null;

  return (
    <Portal>
      <div
        style={{ lineHeight: 1.6 }}
        className="relative z-[500] w-full top-0 xl:top-0 left-0 min-h-screen  xl:pt-0 px-[2rem] md:px-[5rem]    bg-background-page-color  "
      >
        <div className=" flex  justify-center xl:justify-between gap-[3rem]">
          <div className="flex flex-col gap-[1rem]">
            <div className="py-[2rem] flex items-center">
              <LogoApplication />
            </div>
            <div className="hidden xl:block ">
              <AuthRecents />
            </div>
          </div>
          <div className="basis-[50rem] max-w-[100vw] justify-center min-h-screen   overflow-auto flex-grow-[1] flex-shrink-0 md:flex-grow-0 flex flex-col   px-[20px] py-[1rem]">
            <div className="flex-1 flex   w-full text-text-theme   auth-scroll">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default AuthLayout;
