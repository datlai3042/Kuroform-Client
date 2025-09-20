import { RootState } from "@/app/_lib/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NotificationSystem from "./_notification_type/NotificationSystem";
import NotificationAccount from "./_notification_type/NotificationAccount";
import NotificationFormAnswers from "./_notification_type/NotificationFormAnswers";
import NotificationEmpty from "../_StatusCodeComponent/NotificationEmpty";

type TProps = {
      onClose: () => void;
};

const ModelNotification = (props: TProps) => {
      const { onClose } = props;
      const notifications = useSelector((state: RootState) => state.notification.notification);

      useEffect(() => {
            document.body.style.overflow = "hidden";
            return () => {
                  document.body.style.overflow = "scroll";
            };
      }, []);

      return (
            <div onClick={(e) => e.stopPropagation()} className="bg-color-section-theme text-text-theme w-[55rem]  text-[1.4rem] max-h-screen flex flex-col gap-[3rem] min-h-[4rem] h-max p-[3rem]  shadow-xl">
                  <div className="flex justify-between">
                        <p className="text-left text-[1.6rem] text-color-main font-extrabold">Thông báo</p>
                        <button
                              onClick={() => onClose && onClose()}
                              className="bg-[#cccccca1] hover:bg-color-main w-[3rem] !h-[3rem] text-[1.4rem] rounded-full text-[#000] hover:text-[#fff]"
                        >
                              <>X</>
                        </button>
                  </div>

                  <div onClick={(e) => e.stopPropagation()} className=" overflow-y-scroll overflow-x-hidden pb-[1rem] pr-[2rem] flex flex-col gap-[.5rem] ">
                        {notifications &&
                              notifications.map((notification) => {
                                    if (notification.type === "System") return <NotificationSystem key={notification._id} notification_item={notification} />;
                                    if (notification.type === "Account") return <NotificationAccount key={notification._id} notification_item={notification} />;
                                    if (notification.type === "Form_Answers")
                                          return <NotificationFormAnswers key={notification._id} notification_item={notification} />;
                              })}

                        {notifications && notifications.length == 0 && <NotificationEmpty />}
                  </div>
            </div>
      );
};

export default ModelNotification;
