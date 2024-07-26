import React from "react";
import DashboardTotalForm from "./DashboardTotalForm";
import DashboardTotalView from "./DashboardTotalView";

const DashboardTotalWrapper = () => {
      return (
            <div className="w-full flex  justify-center  h-full gap-[4rem] text-[#fff]">
                  <div className="w-[65%] h-[22rem] xl:h-full order-1 ">
                        <DashboardTotalForm />
                  </div>

                  <div className="w-[38%] h-[22rem] xl:h-full  order-3 xl:order-2">
                        <DashboardTotalView />
                  </div>

                  {/* <div className="w-[48%] xl:w-[24%] h-full order-2 xl:order-3 ">
					<DashboardTotalCommon />
				</div> */}
            </div>
      );
};

export default DashboardTotalWrapper;
