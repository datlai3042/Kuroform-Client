import Button from "@/app/(NextClient)/_components/ui/button/Button";
import ButtonCreateForm from "@/app/(NextClient)/_components/ui/button/ButtonCreateForm";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { ChevronsRight, Flower, Plus, Search, Settings } from "lucide-react";
import React, { SetStateAction, Suspense, useContext } from "react";
import { SidebarContext } from "../../SidebarContext";
import DashBoardRightHeader from "../DashBoardRightHeader";
import DashboardForms from "../DashboardForms";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { generateFullNameUser } from "@/app/_lib/utils";
import DashboardFormAnalysis from "../DashboardFormAnalysis";
import { UserType } from "@/app/_schema/user/user.type";
import DashboardTotalForm from "../DashboardTotalForm";
import DashboardTotalView from "../DashboardTotalView";
import DashboardTotalCommon from "../DashboardTotalCommon";
import DashboardTotalWrapper from "../DashboardTotalWrapper";
import DashboardFilterFormDate from "../_dashboard-filter-date/DashboardFilterFormDate";
import Image from "next/image";
import ButtonDarkMode from "@/app/(NextClient)/_components/ui/button/ButtonDarkMode";
import LoadingClient from "@/app/(NextClient)/_components/LoadingClient";

const DashBoardRight = () => {
	const { openSidebar, setOpenSidebar } = useContext(SidebarContext);

	const user = useSelector((state: RootState) => state.authReducer.user) as UserType;

	const width = openSidebar ? " w-full" : "w-full";

	return (
		<div
			className={`${width} min-h-screen bg-color-gap-empty    h-max   flex flex-col  gap-[4rem] xl:gap-[2rem] text-[1.4rem] pb-[1rem] px-[1rem] xl:px-0`}
		>
			<DashBoardRightHeader />
			<div className=" sm:hidden w-full flex justify-end my-[1rem]">
				<ButtonDarkMode />
			</div>
			{/* <DashBoardRightHeader /> */}
			{/* <DashBoardRightHeader /> */}

			<div className="   w-full xl:w-full    flex flex-col gap-[2rem] ">
				<div className="w-full flex flex-col gap-[2rem]  bg-color-section-theme p-[2rem]">
					<p className="text-text-theme">Phân tích chung</p>
					<div className="flex flex-wrap items-center justify-center gap-[2rem] xl:gap-0 h-max xl:h-[30rem]">
						<div className="flex justify-center items-center  w-[33%] xl:w-[20%] h-full flex-col gap-[4rem]">
							<Image
								src={"/assets/images/icon/form/create_form.png"}
								width={20}
								height={20}
								alt="avatar"
								unoptimized={true}
								className="w-[12rem] h-[12rem] rounded-full"
							/>
							<ButtonCreateForm
								textContent="Tạo Form"
								urlNavigation="/"
								className=" xl:[&]:p-[4px_8px] !text-[1.4rem]"
								position="LEFT"
								icon={<Plus />}
							/>
						</div>
						<div className="w-[57%] xl:w-[50%] h-full">
							<DashboardTotalWrapper />
						</div>

						<div className="mt-[1rem] xl:mt-0 w-full xl:w-[30%] h-full">
							<DashboardFilterFormDate />
							{/* <DashboardFormAnalysis /> */}
						</div>
					</div>
				</div>
				<div className="min-h-[40rem]">
					<DashboardForms />
				</div>
			</div>
		</div>
	);
};

export default DashBoardRight;
