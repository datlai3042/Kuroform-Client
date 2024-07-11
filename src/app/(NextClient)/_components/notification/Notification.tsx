"use client";
import React, { useEffect, useState } from "react";
import DivNative from "../ui/NativeHtml/DivNative";
import { Bell } from "lucide-react";
import useGetAllNotification from "@/app/hooks/notifications/useGetAllNotification";
import ClickOutSide from "../Model/ClickOutSide";
import ModelNotification from "./ModelNotification";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { notification } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { onDisableAnimation, onFetchNotification } from "@/app/_lib/redux/features/notification.slice";
import Portal from "../Portal";
const Notification = () => {
	const notification = useSelector((state: RootState) => state.notification.notification);
	const animation = useSelector((state: RootState) => state.notification.animation);

	const queryClient = useQueryClient();

	const dispatch = useDispatch();

	const getAllNotification = useGetAllNotification();

	useEffect(() => {
		if (getAllNotification.isSuccess) {
			const { notifications } = getAllNotification.data.metadata?.notification_user || [];
			dispatch(onFetchNotification({ notification: notifications || [] }));
		}
	}, [getAllNotification.isSuccess, getAllNotification.data?.metadata?.notification_user?.notifications]);

	const [openModelNotification, setOpenNotification] = useState<boolean>(false);

	return (
		<button
			className={`${
				openModelNotification ? "bg-color-main !text-[#fff]" : ""
			} relative flex items-center p-[.4rem] rounded-xl text-text-theme `}
			onClick={() => {
				setOpenNotification((prev) => !prev);
				dispatch(onDisableAnimation({ animation: false }));
			}}
		>
			<Bell className="w-[1.8rem]" />
			<div
				className={`${
					animation ? "animate-ping" : ""
				} absolute top-[-.6rem] right-[-.6rem] w-[1.8rem] h-[1.8rem] flex items-center justify-center bg-red-600 rounded-full`}
			>
				<span className="text-[#fff] text-[1rem]">{notification?.length || 0}</span>
			</div>

			{openModelNotification && (
				<Portal>
					<div className="fixed top-[0] right-[0rem] z-[999] bg-[rgba(0,0,0,.2)] w-screen h-screen">
						<div className="absolute z-[999] top-[4.7rem] right-[3rem]">
							<ClickOutSide setOpenModel={setOpenNotification}>
								<ModelNotification />
							</ClickOutSide>
						</div>
					</div>
				</Portal>
			)}
		</button>
	);
};

export default Notification;
