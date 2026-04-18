import { Bell, Home, LogOutIcon, Plus, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import ButtonCreateForm from "../ui/button/ButtonCreateForm";
import ButtonLogOut from "../ui/button/ButtonLogOut";
import LogoApplication from "../logo/LogoApplication";
import Image from "next/image";

const Footer = () => {
      return (
            <div className="fixed left-0 right-0 bottom-[-.4rem] border-t-[.1rem] justify-center border-[var(--border-color-input)]  h-[6rem] text-text-theme z-[997] bg-[var(--color-section-theme)] md:hidden flex items-center  py-[1rem] px-[1.8rem]">
                  {/* <Link href={"/settings"}>
                        <Settings size={24} />
                  </Link> */}
                  {/* <Link href={"/"} className="flex items-center gap-[1rem]">
                        <Image
                              unoptimized={true}
                              src={"/assets/images/logo/main_logo.png"}
                              width={20}
                              height={20}
                              alt="avatar"
                              className="w-[2rem] h-[2rem] object-cover rounded-full"
                        />
                        <span className="gradient-app-name text-[2.4rem] font-semibold">Kuroform</span>
                  </Link> */}
                  {/* <ButtonLogOut className="flex items-center gap-[1rem] text-[1.3rem]" /> */}

                  <Link href={"/dashboard"} className="">
                        <Home size={24} />
                  </Link>
                  {/* <ButtonCreateForm textContent="Tạo Form" urlNavigation="/" className=" !p-[.2rem_1rem] h-auto !text-[1.4rem] !w-[10rem]" position="LEFT" /> */}

                  {/* <Link href={"/notification"}>
                        <Bell size={24} />
                  </Link> */}
            </div>
      );
};

export default Footer;
