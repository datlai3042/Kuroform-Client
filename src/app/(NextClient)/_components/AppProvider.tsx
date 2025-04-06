"use client";

import { QueryCache, QueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect, useRef, useState } from "react";
import LoadingSpinner from "./ui/loading/LoadingSpinner";
import LoadingClient from "./LoadingClient";
import { ThemeContext } from "./provider/ThemeProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import Code500 from "./_StatusCodeComponent/Code500";
import { usePathname, useSearchParams } from "next/navigation";
import Footer from "./Layout/Footer";

type TProps = {
      children: React.ReactNode;
};

const AppProvider = (props: TProps) => {
      const { children } = props;

      const [isLoading, setIsLoading] = useState(false);

      const statusCode = useSelector((state: RootState) => state.renderBaseOnApi.type);
     
      const { setTheme } = useContext(ThemeContext);

      const searchParams = useSearchParams();
      const code = searchParams.get("code");

      useEffect(() => {
            if (!isLoading) {
                  setIsLoading(true);
            }
      }, [isLoading]);

      useEffect(() => {
            console.log("%cHi, Welcome to Kuroform", `color:#fff;font-size:1.4rem;background: var(--color-main);padding:0.2rem;border-radius:.4rem`);
      }, []);

      useEffect(() => {}, [statusCode]);
      if (statusCode === "500" || code === "500") return <Code500 />;

      return (
            <div className="">
                  {!isLoading ? (
                        <LoadingClient style={{ background: "#17174bb0" }} />
                  ) : (
                        <>
                              {children}
                        </>
                  )}
            </div>
      );
};

export default AppProvider;
