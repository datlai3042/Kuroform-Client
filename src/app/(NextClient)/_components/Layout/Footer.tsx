

import { Bell, Home, LogOutIcon, Plus, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import ButtonCreateForm from "../ui/button/ButtonCreateForm";
import ButtonLogOut from "../ui/button/ButtonLogOut";

const Footer = () => {
      return (
            <div className="fixed left-0 right-0 bottom-[-.4rem] w-screen h-[6rem] text-[#000] z-[999] bg-[#fff] xl:hidden flex items-center justify-between px-[1rem]">
                  <Link href={"/settings"}>
                        <Settings size={24} />
                  </Link>
                  
                 <ButtonLogOut className="flex items-center gap-[1rem] text-[1.3rem]" />

                  <Link href={"/dashboard"}>
                        <Home size={24} />
                  </Link>
                  <ButtonCreateForm
                                                textContent="Tạo Form"
                                                urlNavigation="/"
                                                className=" xl:[&]:p-[4px_8px] !text-[1.2rem] !w-[10rem]"
                                                position="LEFT"
                                          />

                  <Link href={"/notification"}>
                        <Bell size={24} />
                  </Link>
            </div>
      );
};

export default Footer;
