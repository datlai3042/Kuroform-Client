"use client";
import { useMediaQuery } from "@mantine/hooks";
import { memo, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../../(user)/dashboard/SidebarContext";
import DashBoardLeft from "../../(user)/dashboard/_components/layout/DashBoardLeft";
import Portal from "../Portal";

const SidebarMoblie = () => {
      const { setOpenSidebar, openSidebar, setWidthSidebar } = useContext(SidebarContext);
      const wrapperSidebar = useRef<HTMLDivElement | null>(null);
      const [triggerAnimation, setTriggerAnimation] = useState(false);
      const flag = useRef(false);
      const hiddenSidebar = () => {
            if (wrapperSidebar.current) {
                  wrapperSidebar.current.classList.remove("showSidebarMobile");
                  wrapperSidebar.current.classList.add("hideSidebarMobile");
            }
            setTimeout(() => {
                  setTriggerAnimation(true);
            }, 200);
      };

      useEffect(() => {
            if (triggerAnimation) {
                  setOpenSidebar(false);
                  if (wrapperSidebar.current) {
                        wrapperSidebar.current.classList.remove("hideSidebarMobile");
                        wrapperSidebar.current.classList.add("showSidebarMobile");
                  }
            }
      }, [triggerAnimation, setOpenSidebar]);

  
      return (
            <Portal>
                  <div
                        className="fixed top-[0] right-[0rem] z-[998] bg-[rgba(0,0,0,.9)] w-full h-screen "
                        onClick={() => {
                              if (openSidebar) {
                                    hiddenSidebar();
                              }
                        }}
                  >
                        <div
                              ref={wrapperSidebar}
                              onClick={(e) => {
                                    e.stopPropagation();
                              }}
                              className={`showSidebarMobile absolute  w-[50vw] bg-color-section-theme`}
                        >
                              <DashBoardLeft />
                        </div>
                  </div>
            </Portal>
      );
};

const LeftSide = () => {
      const { openSidebar, setWidthSidebar } = useContext(SidebarContext);
      const matches = useMediaQuery(
            "(max-width: 767px)",
            false,

            {
                  getInitialValueInEffect: false,
            },
      );

   

      return (
            <>
                  {matches && openSidebar && <SidebarMoblie />}

                  {!matches && openSidebar && (
                        <aside
                              id="section-sidebar"
                              className={`sticky top-0 z-[2] min-w-[24rem] xl:min-w-[22rem] h-[100vh] overflow-hidden transition-[width]  duration-1000  bg-color-section-theme`}
                        >
                              <DashBoardLeft />
                        </aside>
                  )}
            </>
      );
};

export default LeftSide;
