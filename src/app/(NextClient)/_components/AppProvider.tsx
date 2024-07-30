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
                        setTheme("dark");
            }
      }, [isLoading]);

      useEffect(() => {
            console.log(
                  "%cXin chào đến với dự án này của mình",
                  `color:#64aaa8;font-size:20px;`,
            );
      }, []);

      useEffect(() => {}, [statusCode]);
      if (statusCode === "500" || code === "500") return <Code500 />;

      return <div className="">{!isLoading ? <LoadingClient /> : children}</div>;
};

export default AppProvider;
