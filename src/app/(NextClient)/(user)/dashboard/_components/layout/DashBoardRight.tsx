import Button from "@/app/(NextClient)/_components/ui/button/Button";
import ButtonCreateForm from "@/app/(NextClient)/_components/ui/button/ButtonCreateForm";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { ChevronsRight, Flower, Plus, Search, Settings } from "lucide-react";
import React, { SetStateAction, useContext } from "react";
import { SidebarContext } from "../../SidebarContext";
import DashBoardRightHeader from "../DashBoardRightHeader";
import DashboardForms from "../DashboardForms";

const DashBoardRight = () => {
	return (
		<div className=" w-full min-h-full h-max   p-[.8rem_1.8rem] flex flex-col gap-[6rem] text-[1.4rem]">
			<DashBoardRightHeader />
			<div className="w-[90%] xl:w-[80%] h-max min-h-[30rem] mx-auto flex flex-col gap-[4rem]">
				<div className="min-h-[40px] flex flex-col xl:flex-row xl:items-center justify-between gap-[2rem] xl:gap-0  pb-[2rem] xl:pb-[1rem] border-b-[.1rem] border-slate-200 ">
					<h3 className="text-h3 !text-[2.8rem]">Trang chủ</h3>
					<ButtonCreateForm
						textContent="Tạo một form mới"
						urlNavigation="/"
						className=" xl:[&]:p-[4px_10px] !text-[1.4rem]"
						position="LEFT"
						icon={<Plus />}
					/>
				</div>
				<DashboardForms />
			</div>
		</div>
	);
};

export default DashBoardRight;