import ButtonCreateForm from "@/app/(NextClient)/_components/ui/button/ButtonCreateForm";
import { RootState } from "@/app/_lib/redux/store";
import { generateFullNameUser } from "@/app/_lib/utils";
import { UserType } from "@/app/_schema/user/user.type";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import DashboardFilterFormDate from "./_dashboard-filter-date/DashboardFilterFormDate";

const DashboardFormAnalysis = () => {
	const user = useSelector((state: RootState) => state.authReducer.user) as UserType;

	return (
		<div className="fixed top-[5rem] right-[0rem] z-[2] w-[28rem] py-[2rem] h-full min-h-[60rem] max-h-max flex flex-col items-center gap-[2.4rem] bg-color-section-theme">
			<div className="">
				<>
					{user && (
						<>
							<div className="py-[.73rem] min-w-full flex flex-col gap-[1.4rem] items-center justify-center text-text-theme ">
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
									{user?.user_email}
								</span>
								{/* <DashBoardButtonModel /> */}
							</div>
						</>
					)}

					{!user && <div className="animate-pulse w-full h-full rounded-md bg-slate-200"></div>}
				</>
			</div>

			<div className="">
				<div className=" w-full flex flex-col items-center justify-between gap-[2rem]  ">
					<p className="flex flex-col items-center gap-[1rem] font-extrabold text-text-theme">
						Chào mừng bạn trở lại ,
						<span className="text-color-main text-[2rem] ">{generateFullNameUser(user || undefined)}</span>
					</p>
					<ButtonCreateForm
						textContent="Tạo Form"
						urlNavigation="/"
						className=" xl:[&]:p-[4px_8px] !text-[1.4rem]"
						position="LEFT"
						icon={<Plus />}
					/>
				</div>
			</div>
			<div className="w-full min-h-[60rem] ">
				<DashboardFilterFormDate />
			</div>
		</div>
	);
};

export default DashboardFormAnalysis;
