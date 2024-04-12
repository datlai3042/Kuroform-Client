import { cookies } from "next/headers";
import React from "react";
import ButtonLogOut from "../_components/ui/button/ButtonLogOut";

const DashBoardPage = () => {
	return (
		<div className="w-full h-screen flex justify-center items-center gap-[20px]">
			<p>DashBoardPage</p>
			<ButtonLogOut />
		</div>
	);
};

export default DashBoardPage;
