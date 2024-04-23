import React from "react";

import DashBoardWork from "../DashBoardWork";
import DashboardAccount from "../DashboardAccount";
import DashboardWorkspaces from "../DashboardWorkspaces";
import DashboardProduct from "../DashboardProduct";
import DashboardHelp from "../DashboardHelp";

const DashBoardLeft = () => {
	return (
		<div className="p-[1rem_.4rem] flex flex-col gap-[1.1rem] bg-[#fffffff] text-[1.4rem]">
			<DashboardAccount />
			<DashBoardWork />
			<div className="mt-[1.6rem] flex flex-col gap-[1.8rem]">
				<DashboardWorkspaces />
				<DashboardProduct />
				<DashboardHelp />
			</div>
		</div>
	);
};
export default DashBoardLeft;
