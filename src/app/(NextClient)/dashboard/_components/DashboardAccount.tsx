import React, { useContext } from "react";
import { SidebarContext } from "../SidebarContext";

import { ChevronsLeft } from "lucide-react";
import ButtonIcon from "../../_components/ui/button/ButtonIcon";

import DashBoardButtonModel from "./DashBoardButtonModel";

const DashboardAccount = () => {
	const { openSidebar, setOpenSidebar } = useContext(SidebarContext);

	return (
		<div className="pl-[.6rem] group max-w-full h-[3rem] flex items-center justify-between ">
			<div className="max-w-[90%] flex gap-[1rem] items-center ">
				<div className="min-w-[2rem] h-[2rem] bg-green-300 rounded-full flex items-center justify-center">
					L
				</div>

				<span className="font-semibold w-[90%] break-words line-clamp-2 " title={"Nickname"}>
					Lại Huỳnh Phát Đạt
				</span>
				<DashBoardButtonModel />
			</div>
			<ButtonIcon
				Icon={<ChevronsLeft className="w-[1.4rem]" />}
				onClick={() => setOpenSidebar(false)}
				className="invisible group-hover:visible bg-transparent hover:bg-slate-200 rounded-lg"
			/>
		</div>
	);
};

export default DashboardAccount;
