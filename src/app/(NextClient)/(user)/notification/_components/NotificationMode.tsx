import useGetNotificationType from "@/app/hooks/notifications/useGetNotificationType";
import useGetListFormDelete from "@/app/hooks/useGetListFormDelete";
import { Notification } from "@/type";
import React, { useState } from "react";
import NotificationShow from "./NotificationShow";
import { Select } from "antd";

export type NotificationMode = "All" | Notification.Type.Common;

const NotificationMode = () => {
      const [modeNotification, setModeNotification] = useState<NotificationMode>("All");

      const getNotificationType = useGetNotificationType(modeNotification);

      const styleEffect = {
            onActiveRequireWrapper: (checked: boolean) => {
                  if (checked) return "bg-blue-400";
                  return "bg-gray-100";
            },
            onActiveRequireCircle: (checked: boolean) => {
                  if (checked) return "right-0";
                  return " left-0";
            },
      };

      const increasePage = () => {
            getNotificationType.fetchNextPage();
      };

      const descreasePage = () => {
            getNotificationType.fetchPreviousPage();
      };

      return (
            <div className="w-full h-full flex flex-col gap-[3rem]">
                  <Select
                        className="customSelect"
                        defaultValue="All"
                        style={{ width: 240 }}
                        onChange={(value) => setModeNotification(value as NotificationMode)}
                        options={[
                              { value: "All", label: "Tất cả thông báo" },
                              { value: "Form_Answers", label: "Thông báo của trả lời" },
                              { value: "System", label: "Thông báo hệ thống" },
                              { value: "Account", label: "Thông báo tài khoản" },
                        ]}
                  />

                  <NotificationShow
                        isLoading={getNotificationType.isLoading}
                        isNextPage={getNotificationType.hasNextPage}
                        notification_data={getNotificationType.data?.pages.flatMap((data) => data.metadata.notification_user.notifications) || []}
                        nextPageCallback={increasePage}
                  />
            </div>
      );
};

export default NotificationMode;
