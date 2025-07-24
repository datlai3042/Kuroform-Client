"use client";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import ButtonLogOut from "@/app/(NextClient)/_components/ui/button/ButtonLogOut";
import { onFocusSearch } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import {  BarChartHorizontalBig ,Home, HomeIcon, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
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

      const matchPathName = (link: string) => link === pathName;

      const urlProlife = `/profile/${user?.user_atlas}`;

      const colorTheme = theme === "light" ? "text-text-theme hover:text-[#fff]" : "!text-text-theme ";

      return (
            <div className={`flex flex-col gap-[.8rem] text-[1.4rem] `}>
                  <Link
                        href={"/"}
                        className={`nav ${colorTheme} ${matchPathName("/dashboard") ? "nav__isActive" : "nav__normal hover:bg-color-main "} group  `}
                  >
                        <HomeIcon size={18} />
                        <span className="font-medium">Trang chủ</span>
                  </Link>

                  {/* <button
                        onClick={handleSearch}
                        className={`nav ${colorTheme}  group hover:text-[#fff] `}
                  >
                        <Search size={18} />
                        <span className="font-medium">Tìm kiếm</span>
                  </button> */}
                  <Link
                        href={"/analysis"}
                        className={`nav ${colorTheme} ${
                              matchPathName("/analysis") ? "nav__isActive" : "nav__normal text-text-theme hover:bg-color-main"
                        } group hover:text-[#fff]`}
                  >
                        <BarChartHorizontalBig  size={18}/>
                     
                        <span className="font-medium">Phân tích</span>
                  </Link>
                  <Link
                        href={"/settings"}
                        className={`nav ${colorTheme} ${
                              matchPathName("/settings") ? "nav__isActive" : "nav__normal text-text-theme hover:bg-color-main"
                        } group hover:text-[#fff]`}
                  >
                        <Settings size={18} />
                        <span className="font-medium">Cài đặt</span>
                  </Link>

                  <ButtonLogOut className={`${colorTheme} nav nav__normal hover:bg-color-main`} />
            </div>
      );
};

export default DashBoardWork;
