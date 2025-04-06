import TrashEmpty from "@/app/(NextClient)/_components/_StatusCodeComponent/TrashEmpty";
import { Notification } from "@/type";
import React, { useMemo } from "react";
import NotificationAccountItem from "./NotificationAccountItem";
import NotificationFormAnswerItem from "./NotificationFormAnswerItem";
import NotificationSystemItem from "./NotificationSystemItem";
import NotificationEmpty from "@/app/(NextClient)/_components/_StatusCodeComponent/NotificationEmpty";
import LoadingArea from "@/app/(NextClient)/_components/ui/loading/LoadingArea";
import LoadingClient from "@/app/(NextClient)/_components/LoadingClient";

type TProps = {
	notification_data: Notification.NotificationUser["notifications"];
	nextPageCallback: () => void;
	isNextPage: boolean;
	isLoading: boolean;
};

const renderNotification = (notification_data: Notification.NotificationUser["notifications"]) => {
	return notification_data.map((notification) => {
		if (notification.type === "Account")
			return <NotificationAccountItem key={notification._id} notification_item={notification} />;

		if (notification.type === "Form_Answers")
			return <NotificationFormAnswerItem key={notification._id} notification_item={notification} />;

		if (notification.type === "System")
			return <NotificationSystemItem key={notification._id} notification_item={notification} />;
	});
};

const NotificationShow = (props: TProps) => {
	const { notification_data, isNextPage, isLoading, nextPageCallback } = props;

	const renderNotificationArray = useMemo(() => renderNotification(notification_data), [notification_data]);

	return (
		<div className="h-[80%] overflow-auto flex flex-col gap-[4rem] py-[2rem]">
			<div className="flex flex-col gap-[1rem]">{renderNotificationArray}</div>
			{!isLoading && notification_data.length > 0 && (
				<div className="flex sm:justify-center text-[1.4rem] ">
					<button onClick={nextPageCallback} className="bg-color-main rounded-[.4rem] h-[3.2rem] p-[.2rem_.8rem] text-[#fff]">
						{isNextPage ? "Tải thêm thông báo" : "Đã hết dữ liệu"}
					</button>
				</div>
			)}{" "}
			{!isLoading && notification_data.length === 0 && <NotificationEmpty />}
			{isLoading && (
				<div className="min-w-full h-[30rem]">
					<LoadingClient width="w-full" height="h-full" />
				</div>
			)}
		</div>
	);
};

export default NotificationShow;
