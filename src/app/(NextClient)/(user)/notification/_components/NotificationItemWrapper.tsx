import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import { Trash2 } from "lucide-react";
import React, { useContext } from "react";

type TProps = {
      children: React.ReactNode;
      callbackDelete: () => void;
};

const NotificationItemWrapper = (props: TProps) => {
      const { children, callbackDelete } = props;
      const { theme } = useContext(ThemeContext);

      return (
            <div
                  className={`${
                        theme === "dark" ? "hover:text-[#fff]" : ""
                  } group relative w-[90%] h-max p-[2rem_1rem] xl:p-[2rem_1.8rem] flex flex-col sm:flex-row gap-[2rem] sm:gap-[3.6rem] bg-color-section-theme   text-text-theme rounded-xl hover:cursor-pointer`}
            >
                  {children}

                  <button
                        onClick={callbackDelete}
                        className="sm:ml-auto w-max flex items-center gap-[1rem] p-[.5rem_.7rem] h-[2.4rem] text-[#fff] opacity-75 group-hover:opacity-100 hover:opacity-100 bg-red-500 rounded-[.4rem] no-underline"
                  >
                        <span className=" no-underline text-[1.2rem] w-max">Xóa thông báo này</span>
                  </button>
            </div>
      );
};

export default NotificationItemWrapper;
