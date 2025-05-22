"use client";
import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../(user)/dashboard/SidebarContext";
import DashBoardLeft from "../../(user)/dashboard/_components/layout/DashBoardLeft";
import useGetAllNotification from "@/app/hooks/notifications/useGetAllNotification";
import { usePathname } from "next/navigation";
import LeftSide from "./LeftSide";

const LayoutSidebar = ({ children }: { children: React.ReactNode }) => {
      const { openSidebar, widthSidebar } = useContext(SidebarContext);

      //sidebar 26rem gap-2rem

      const pathname = usePathname();

      const gapSpace = pathname === "/dashboard" || pathname?.startsWith("/form");
      const widthParent = pathname?.includes("/form") ? "100vw" : "100%";
      return (
            <div
                  className={`${gapSpace ? "" : ""} ${
                        pathname === "/dashboard" ? "gap-[1rem]" : ""
                  } relative max-w-screen min-h-screen h-max w-full   flex   bg-color-gap-empty`}
            >
                  {openSidebar && <LeftSide />}
                  <div style={{ width: `calc(${widthParent} - ${widthSidebar}px - 20px) ` }} className={` flex-1  `}>
                        {children}
                  </div>
            </div>
      );
};

export default LayoutSidebar;
