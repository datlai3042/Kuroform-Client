"use client";
import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../(user)/dashboard/SidebarContext";
import DashBoardLeft from "../../(user)/dashboard/_components/layout/DashBoardLeft";
import useGetAllNotification from "@/app/hooks/notifications/useGetAllNotification";
import { usePathname } from "next/navigation";

const LayoutSidebar = ({ children }: { children: React.ReactNode }) => {
      const { openSidebar } = useContext(SidebarContext);

      //sidebar 26rem gap-2rem

      const styleEffect = {
            onCheckSidebar: (check: boolean) => {
                  if (check) return "w-screen  xl:w-[calc(100vw-24rem-1rem)]    duration-[300ms] min-h-screen";
                  return "w-full inset-0 duration-[600ms]";
            },
      };

            const pathname = usePathname()
      
            const gapSpace = pathname === '/dashboard' || pathname?.startsWith('/form')

      return (
            <div className={`${gapSpace ? 'gap-[1rem]': ''}  relative max-w-screen min-h-screen h-max w-full   flex  `}>
                  {openSidebar && (
                        <aside
                              className={`${
                                    openSidebar ? "hidden sm:block" : "hidden   sm:block "
                              } sticky top-0 z-[2] w-[0%] xl:w-[22rem] xl:min-w-[19rem] h-[100vh] overflow-hidden transition-[width]  duration-1000  bg-color-section-theme`}
                        >
                              {openSidebar && <DashBoardLeft />}
                        </aside>
                  )}
                  <div className={`${styleEffect.onCheckSidebar(openSidebar)} flex-1  min-h-full h-max transition-all   `}>{children}</div>
            </div>
      );
};

export default LayoutSidebar;
