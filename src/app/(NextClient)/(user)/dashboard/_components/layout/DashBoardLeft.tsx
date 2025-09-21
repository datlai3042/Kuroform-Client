"use client";
import React, { useContext, useEffect } from "react";

import DashBoardWork from "../DashBoardWork";
import DashboardWorkspaces from "../_workspace/DashboardWorkspaces";
import DashboardProduct from "../DashboardProduct";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/_services/user.service";
import { onFetchUser } from "@/app/_lib/redux/authentication.slice";
import { useDispatch } from "react-redux";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { ChevronsLeft } from "lucide-react";
import { SidebarContext } from "../../SidebarContext";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import Logo from "@/app/(NextClient)/_components/logo/Logo";
import { useMediaQuery } from "@mantine/hooks";
import DashboardProjectInfo from "../DashboardProjectInfo";

const DashBoardLeft = () => {
      const dispatch = useDispatch();
      const { setOpenSidebar, setWidthSidebar, openSidebar } = useContext(SidebarContext);
      const { theme } = useContext(ThemeContext);
      const fetchMe = useQuery({
            queryKey: ["/me"],
            queryFn: () => UserService.me(),
      });

      useEffect(() => {
            const sidebar = document.getElementById("section-sidebar");
            if (sidebar) {
                  const widthSidebar = sidebar.clientWidth || 0;
                  setWidthSidebar(widthSidebar);
            }
      }, [openSidebar, setWidthSidebar]);

      useEffect(() => {
            if (fetchMe.isSuccess) {
                  const { user } = fetchMe.data.metadata;

                  dispatch(onFetchUser({ user }));
            }
      }, [fetchMe.isSuccess, dispatch]);

      const scrollThemeStyle = theme === "dark" ? "scroll-color-main" : "scroll-common";

      return (
            <>
                  <div
                        style={{ borderRight: ".1rem solid var(--border-color-side)" }}
                        className={` max-h-[97%] min-h-screen  p-[1rem]  flex flex-col gap-[2rem]  text-text-theme text-[1.4rem]`}
                  >
                        <div className="relative w-full mb-[2rem] flex items-center justify-center gap-[1.8rem]">
                              {/* <LogoColor /> */}
                              {/* <DashboardInfoUser /> */}

                              <Logo />
                             
                              <ButtonIcon
                                    Icon={<ChevronsLeft className="w-[1.4rem]" />}
                                    onClick={() => setOpenSidebar(false)}
                                    className=" absolute top-[1rem] right-[1rem] bg-transparent hover:bg-color-main text-text-theme hover:text-[#fff] rounded-lg"
                              />
                        </div>
                        <div className="flex flex-col  overflow-auto">
                              <DashBoardWork />
                              <div className="mt-[1rem] flex flex-col gap-[1.8rem] text-[1.4rem]">
                                    <DashboardWorkspaces />
                                    <DashboardProduct />
                                    {/* <DashboardHelp /> */}
                              </div>
                        </div>

                        {/* <div className="sticky w-max mx-auto bottom-0 mb-[1rem] mt-auto">
                              <DashboardProjectInfo />
                        </div> */}
                  </div>
            </>
      );
};
export default DashBoardLeft;
