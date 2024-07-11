"use client";
import React, { SetStateAction, useEffect } from "react";
import SettingUpdateAvatar from "./SettingUpdateAvatar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";

type TProps = {
	tab: "account" | "create_password" | "update_password";
	setTab: React.Dispatch<SetStateAction<"account" | "create_password" | "update_password">>;
};

const SettingSection = (props: TProps) => {
	const { tab, setTab } = props;

	const user = useSelector((state: RootState) => state.authReducer.user);

	const styleEffect = {
		onActive: (check: boolean) => {
			if (check) return "border-b-[.4rem] border-text-theme";
			return "border-b-[.4rem] border-transparent";
		},
	};

	return (
		<div className="w-full h-[16rem]  flex flex-col gap-[4rem] ">
			<div className="flex flex-col gap-[2rem]">
				<h3 className=" !text-[2.8rem]">Cài đặt</h3>
				<div className="w-full flex gap-[3rem] border-b-[.1rem] border-gray-200">
					<div className="min-h-[3rem] flex items-center justify-between  ">
						<button
							onClick={() => setTab("account")}
							className={`${styleEffect.onActive(tab === "account")} h-full pb-[.3rem]  font-semibold `}
						>
							Tài khoản của tôi
						</button>
					</div>

					{user?.user_auth === "oAuth" && !user?.user_create_password && (
						<div className="min-h-[3rem] flex items-center justify-between  ">
							<button
								onClick={() => setTab("create_password")}
								className={`${styleEffect.onActive(
									tab === "create_password"
								)} h-full pb-[.3rem]  font-semibold `}
							>
								Tạo mật khẩu
							</button>
						</div>
					)}

					<div className="min-h-[3rem] flex items-center justify-between  ">
						<button
							onClick={() => setTab("update_password")}
							className={`${styleEffect.onActive(
								tab === "update_password"
							)} h-full pb-[.3rem]  font-semibold `}
						>
							Cập nhật mật khẩu
						</button>
					</div>
					{/* )} */}
				</div>
			</div>
		</div>
	);
};

export default SettingSection;
