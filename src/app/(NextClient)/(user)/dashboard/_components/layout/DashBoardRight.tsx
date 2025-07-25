import ButtonCreateForm from "@/app/(NextClient)/_components/ui/button/ButtonCreateForm";
import ButtonDarkMode from "@/app/(NextClient)/_components/ui/button/ButtonDarkMode";
import { RootState } from "@/app/_lib/redux/store";
import { UserType } from "@/app/_schema/user/user.type";
import { Plus, Circle } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { SidebarContext } from "../../SidebarContext";
import DashBoardRightHeader from "../DashBoardRightHeader";
import DashboardForms from "../DashboardForms";
import DashboardTotalWrapper from "../DashboardTotalWrapper";
import DashboardFilterFormDate from "../_dashboard-filter-date/DashboardFilterFormDate";
import DashboardAccount from "../DashboardAccount";
import { DashboardTotalFormV2 } from "../DashboardTotalFormV2";
import DashboardTotalForm from "../DashboardTotalForm";
import DashboardTotalView from "../DashboardTotalView";
import DashboardTotalTopView from "../DashboardTotalTopView";
import ButtonExpand from "../ButtonExpand";
import useGetAllFormUser from "@/app/hooks/useGetAllFormUser";
import LoadingClient from "@/app/(NextClient)/_components/LoadingClient";

const DashBoardRight = () => {
     

      return (
            <div className={`  min-h-screen bg-color-gap-empty    h-max   flex flex-col   text-[1.4rem] pb-[1rem] px-0`}>
                  <DashBoardRightHeader />
                  <div className="flex xl:hidden justify-end w-full bg-color-section-theme p-[1rem]">
                        <DashboardAccount />
                  </div>

                  {/* <DashBoardRightHeader /> */}
                  {/* <DashBoardRightHeader /> */}

                  <div className={` flex-1 w-full xl:w-full    flex flex-col gap-[1rem] `}>
                    
                        <div className="flex-1 flex min-h-[40rem] max-w-full w-full  xl:px-0">
                              <DashboardForms />
                        </div>
                  </div>
            </div>
      );
};



export default DashBoardRight;
