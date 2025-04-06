import React from "react";
import DashboardTotalForm from "./DashboardTotalForm";
import DashboardTotalView from "./DashboardTotalView";
import { DashboardTotalFormV2 } from "./DashboardTotalFormV2";

const DashboardTotalWrapper = () => {
      return (
            <div className=" xl:mt-0 w-full flex flex-col mt-[2rem]  sm:flex-row justify-between xl:justify-center  h-full  text-[#fff]">
                  <div className=" h-[22rem] xl:h-full order-1 w-[33%]">
                        <DashboardTotalFormV2 />
                        {/* <DashboardTotalForm /> */}
                  </div>

                  <div className=" h-[22rem] xl:h-full order-1 w-[33%]">
                        <DashboardTotalFormV2 />
                        {/* <DashboardTotalForm /> */}
                  </div>

                  <div className=" h-[22rem] xl:h-full order-1 w-[33%]">
                        <DashboardTotalFormV2 />
                        {/* <DashboardTotalForm /> */}
                  </div>


                  {/* <div className=" mt-[4rem] xl:mt-0 sm:w-[50%] h-[22rem] xl:h-full  order-3 xl:order-2">
                        <DashboardTotalView />
                  </div> */}

                  {/* <div className="w-[48%] xl:w-[24%] h-full order-2 xl:order-3 ">
					<DashboardTotalCommon />
				</div> */}
            </div>
      );
};

export default DashboardTotalWrapper;
