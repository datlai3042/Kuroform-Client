

import { Bell, Home, LogOutIcon, Plus, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import ButtonCreateForm from "../ui/button/ButtonCreateForm";
import ButtonLogOut from "../ui/button/ButtonLogOut";

const Footer = () => {
      return (
            <div className="fixed left-0 right-0 bottom-[-.4rem] border-t-[.1rem] border-[var(--border-color-input)]  h-[6rem] text-text-theme z-[997] bg-[var(--color-section-theme)] md:hidden flex items-center justify-between px-[1rem]">
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
                                                className=" !p-[1rem] !text-[1.4rem] !w-[10rem]"
                                                position="LEFT"
                                          />

                  <Link href={"/notification"}>
                        <Bell size={24} />
                  </Link>
            </div>
      );
};

export default Footer;
