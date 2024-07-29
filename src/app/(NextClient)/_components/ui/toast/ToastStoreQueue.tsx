import { resetQueueToast } from "@/app/_lib/redux/toast.slice";
import { RootState } from "@/app/_lib/redux/store";
import { Bell, X } from "lucide-react";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../../provider/ThemeProvider";

const ToastStoreQueue = () => {
      const { theme } = useContext(ThemeContext);

      const toast_queue = useSelector((state: RootState) => state.toast.toast_queue);
      const dispatch = useDispatch();
      const onResetQueueToast = () => {
            dispatch(resetQueueToast());
      };

      return (
            // <div className="fixed bottom-[2rem] border-[.1rem] border-gray-200 rounded-md p-[1rem_2rem] min-h-[10rem] w-full text-[1.6rem] flex flex-col justify-between">
            // 	<p>
            // 		Số toast đang lưu trữ <span>{toast_queue.length}</span>
            // 	</p>
            // 	<button
            // 		onClick={onResetQueueToast}
            // 		className="text-left bg-slate-800 max-w-[20rem] h-[4rem] text-[#ffffff] p-[1rem] rounded-lg flex items-center"
            // 	>
            // 		Reset hàng đợi
            // 	</button>
            // </div>
            <div className="fixed bottom-[2rem] right-[2rem]  rounded-full p-[1rem_2rem]  w-[8rem] h-[8rem] flex items-center justify-center bg-color-main text-[1.6rem] ">
                  <div className="absolute left-[-2rem] w-[4rem] bottom-[1rem] h-[2rem] rounded-lg flex items-center justify-center bg-[#fff] text-color-main">
                        <span className=" font-semibold">{toast_queue.length}</span>
                  </div>
                  <Bell size={40} style={{ color: theme === "dark" ? "#fff" : "#000" }} />
                  <button
                        onClick={onResetQueueToast}
                        className="absolute right-[2rem] top-[-1rem] w-[2rem] h-[2rem]  rounded-full  flex items-center justify-center text-color-main bg-[#fff]"
                  >
                        <X size={14} />
                  </button>
            </div>
      );
};

export default ToastStoreQueue;
