import { SidebarContext } from "@/app/(NextClient)/(user)/dashboard/SidebarContext";
import { AlignJustify } from "lucide-react";
import React, { useContext } from "react";

const ButtonSidebar = () => {
      const { setOpenSidebar, openSidebar } = useContext(SidebarContext);
      return (
            <div
                  onClick={() => {
                        setOpenSidebar((prev) => !prev);
                  }}
                  className=" flex items-center opacity-65 hover:opacity-100 cursor-pointer hover:bg-color-main p-[.4rem_.6rem] text-text-theme hover:text-[#fff] rounded-[.4rem]"
            >
                  <AlignJustify size={18}/>
            </div>
      );
};

export default ButtonSidebar;
