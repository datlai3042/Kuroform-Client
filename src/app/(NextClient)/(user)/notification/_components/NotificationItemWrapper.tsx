import { Trash2 } from "lucide-react";
import React from "react";

type TProps = {
      children: React.ReactNode;
      callbackDelete: () => void;
};

const NotificationItemWrapper = (props: TProps) => {
      const { children, callbackDelete } = props;

      return (
            <div className="group relative h-max p-[2rem_1rem] xl:p-[2rem_1.8rem] flex flex-col sm:flex-row sm:items-center gap-[2rem] bg-color-section-theme hover:bg-color-main hover:text-[#fff] text-text-theme rounded-xl hover:cursor-pointer">
                  {children}

                  <button
                        onClick={callbackDelete}
                        className="sm:ml-auto w-max flex items-center gap-[1rem] p-[.5rem_.7rem] h-[3.2rem] hover:bg-[#ffffff]  group-hover:bg-[#ffffff] hover:text-red-600 rounded-lg no-underline"
                  >
                        <span className="text-red-600 no-underline text-[1.4rem] w-max">Xóa thông báo này</span>
                  </button>
            </div>
      );
};

export default NotificationItemWrapper;
