"use client";
import { Home, HomeIcon, LogOutIcon, Search, Settings } from "lucide-react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@/app/_services/auth.service";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import path from "path";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import { onFocusSearch } from "@/app/_lib/redux/formEdit.slice";
import ButtonLogOut from "@/app/(NextClient)/_components/ui/button/ButtonLogOut";

const WorkItem = [
      {
            Title: "Trang chủ",
            Icon: <Home />,
            Href: "/dashboard",
      },

      {
            Title: "Tìm kiếm",
            Icon: <Image src={"/assets/images/icon/navigation/search.png"} width={18} height={18} alt="icon" className="w-[2.4rem] h-[2.4rem]" />,
            Model: "search",
      },
      {
            Title: "Cài đặt",
            Icon: <Image src={"/assets/images/icon/navigation/setting.png"} width={18} height={18} alt="icon" className="w-[2.4rem] h-[2.4rem]" />,
            Href: "/settings",
      },
];

const DashBoardWork = () => {
      const { theme } = useContext(ThemeContext);

      const user = useSelector((state: RootState) => state.authReducer.user);
      // const focusSearch = useSelector((state: RootState) => state.form.focus_search);

      const router = useRouter();

      const pathName = usePathname();

      const dispatch = useDispatch();


      const handleSearch = () => {
            dispatch(onFocusSearch({ focus: true }));
      };

      const matchPathName = (link: string) => link === pathName 

      const urlProlife = `/profile/${user?.user_atlas}`;

      const colorTheme = theme === "light" ? "text-text-theme hover:text-[#fff]" : "!text-text-theme ";

      return (
            <div className={`flex flex-col gap-[.8rem] text-[1.4rem] `}>
                  <Link href={"/"} className={`nav ${colorTheme} ${matchPathName("/dashboard") ? "nav__isActive" : "nav__normal  "} group  `}>
                        <HomeIcon size={18} />
                        <span className="font-medium">Trang chủ</span>
                  </Link>

                  <button
                        onClick={handleSearch}
                        className={`nav ${colorTheme}  group hover:text-[#fff] `}
                  >
                        <Search size={18} />
                        <span className="font-medium">Tìm kiếm</span>
                  </button>

                  <Link
                        href={"/settings"}
                        className={`nav ${colorTheme} ${matchPathName("/settings") ? "nav__isActive" : "nav__normal text-text-theme"} group hover:text-[#fff]`}
                  >
                        <Settings size={18} />
                        <span className="font-medium">Cài đặt</span>
                  </Link>

                <ButtonLogOut  className={`${colorTheme} nav nav__normal `}/>
            </div>
      );
};

export default DashBoardWork;
