import { Notification } from "@/type";
import { Settings2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React from "react";

type TProps = {
	notification_item: Notification.System.NotificationSystem;
};

const NotificationSystem = (props: TProps) => {
	const { notification_item } = props;

	return (
		<div className=" my-[2rem] h-max px-[1.4rem] flex  gap-[1rem]   pb-[2rem] border-b-[.1rem] border-[var(--border-color-input)] text-text-theme">
			<Settings2 size={28} />

			<div className="w-[80%]  flex flex-col gap-[1rem] text-[1.4rem] leading-10">
				<p className="font-semibold text-left">Thông báo hệ thống</p>
				<p className="h-max text-left break-words max-w-full">
					<span className="font-bold">Tin nhắn: </span>

					<span className="h-max ">{notification_item.core.message}</span>
				</p>
				<span className="text-left">
					Thời gian: {moment(new Date(notification_item.create_time)).format("hh:mm Do MMMM YYYY")}
				</span>
			</div>
		</div>
	);
};

export default NotificationSystem;
