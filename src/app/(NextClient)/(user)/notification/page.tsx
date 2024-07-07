"use client";
import React from "react";
import LayoutSidebar from "../../_components/Layout/LayoutSidebar";
import Image from "next/image";
import NotificationMode from "./_components/NotificationMode";
import ButtonDarkMode from "../../_components/ui/button/ButtonDarkMode";

const NotficationPage = () => {
	return (
		<LayoutSidebar>
			<div className="p-[4rem] xl:p-[10rem] flex flex-col gap-[4rem] bg-color-gap-empty text-text-theme">
				<div className="min-h-[40px] flex items-center justify-between pb-[1rem] border-b-[.1rem] border-slate-200 ">
					<div className="w-full flex items-center gap-[2rem]">
						<Image
							src={"/assets/images/icon/notification_control_item1.png"}
							width={18}
							height={18}
							alt="icon"
							className="w-[3rem] h-[3rem]"
						/>
						<div className="w-full flex  justify-between">
							<h3 className="!text-[2.8rem]">Quản lí các thông báo</h3>
							<ButtonDarkMode />
						</div>
					</div>
				</div>
				<NotificationMode />
			</div>
		</LayoutSidebar>
	);
};

export default NotficationPage;
