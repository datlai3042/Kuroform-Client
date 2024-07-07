import { RootState } from "@/app/_lib/redux/store";
import { UserType } from "@/app/_schema/user/user.type";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const DashboardInfoUser = () => {
	const user = useSelector((state: RootState) => state.authReducer.user) as UserType;

	return (
		<>
			{user && (
				<>
					<div className="py-[.73rem] min-w-full flex flex-col gap-[1rem] items-center justify-center border-b-[.1rem] border-border-color ">
						{user?.user_avatar_current && (
							<Image
								src={user.user_avatar_current}
								width={20}
								height={20}
								alt="avatar"
								unoptimized={true}
								className="w-[6rem] h-[6rem] rounded-full"
							/>
						)}
						{!user?.user_avatar_current && (
							<div className="min-w-[2rem] h-[2rem] bg-green-300 rounded-full flex items-center justify-center">
								{user?.user_first_name.slice(0, 1)}
							</div>
						)}

						<span className="font-semibold w-fullbreak-words line-clamp-2 " title={"Nickname"}>
							{user?.user_first_name + " " + user?.user_last_name}
						</span>
						{/* <DashBoardButtonModel /> */}
					</div>
				</>
			)}

			{!user && <div className="animate-pulse w-full h-full rounded-md bg-slate-200"></div>}
		</>
	);
};

export default DashboardInfoUser;
