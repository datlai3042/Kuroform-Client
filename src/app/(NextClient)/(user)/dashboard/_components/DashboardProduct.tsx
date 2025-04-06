"use client";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import { Bell, LayoutPanelTop, LayoutTemplate, Map, SmilePlus, Sparkles, Store, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

const DashboardProduct = () => {
      const { theme } = useContext(ThemeContext);

      const pathName = usePathname();

      const colorTheme = theme === "light" ? "text-text-theme hover:text-[#fff]" : "!text-text-theme ";

      return (
            <div className={` flex flex-col gap-[.6rem] text-text-theme `}>
                  <p className="pl-[.6rem] text-[1.2rem] ">Các đường dẫn khác</p>

                  <Link href={"/notification"} className={`nav ${colorTheme} ${pathName === "/notification" ? "nav__isActive" : "nav__normal hover:bg-color-main"}  `}>
                        <Bell size={18} />
                        <span className="font-medium ">Quản lí thông báo</span>
                  </Link>

                  <Link href={"/trash"} className={`nav ${colorTheme} ${pathName === "/trash" ? "nav__isActive" : "nav__normal hover:bg-color-main"}  `}>
                        <Trash2 size={18}/>
                        <span className="font-medium ">Thùng rác</span>
                  </Link>
            </div>
      );
};

export default DashboardProduct;
