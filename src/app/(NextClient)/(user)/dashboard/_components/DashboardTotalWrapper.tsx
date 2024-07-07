import React from "react";
import DashboardTotalForm from "./DashboardTotalForm";
import DashboardTotalView from "./DashboardTotalView";
import DashboardTotalCommon from "./DashboardTotalCommon";

const DashboardTotalWrapper = () => {
	return (
		<div className="w-full flex flex-col xl:flex-row justify-center  h-full gap-[2rem] text-[#fff]">
			<div className="w-full h-[22rem] xl:h-full order-1 ">
				<DashboardTotalForm />
			</div>

			<div className="w-full h-[22rem] xl:h-full  order-3 xl:order-2">
				<DashboardTotalView />
			</div>

			{/* <div className="w-[48%] xl:w-[24%] h-full order-2 xl:order-3 ">
					<DashboardTotalCommon />
				</div> */}
		</div>
	);
};

export default DashboardTotalWrapper;
