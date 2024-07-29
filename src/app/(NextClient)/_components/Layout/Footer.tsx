import { Bell, Home, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
      return (
            <div className="fixed left-0 right-0 bottom-[-.4rem] w-screen h-[6rem] text-[#000] z-[999] bg-[#fff] xl:hidden flex items-center justify-between px-[1rem]">
                  <Link href={"/settings"}>
                        <Settings size={24} />
                  </Link>

                  <Link href={"/dashboard"}>
                        <Home size={24} />
                  </Link>

                  <Link href={"/notification"}>
                        <Bell size={24} />
                  </Link>
            </div>
      );
};

export default Footer;
