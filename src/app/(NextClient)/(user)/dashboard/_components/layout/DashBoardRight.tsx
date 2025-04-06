import ButtonCreateForm from "@/app/(NextClient)/_components/ui/button/ButtonCreateForm";
import ButtonDarkMode from "@/app/(NextClient)/_components/ui/button/ButtonDarkMode";
import { RootState } from "@/app/_lib/redux/store";
import { UserType } from "@/app/_schema/user/user.type";
import { Plus, Circle } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
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

const DashBoardRight = () => {
      const { openSidebar, setOpenSidebar } = useContext(SidebarContext);

      const user = useSelector((state: RootState) => state.authReducer.user) as UserType;

      return (
            <div className={`  min-h-screen bg-color-gap-empty    h-max   flex flex-col  gap-[.4rem] text-[1.4rem] pb-[1rem] px-0`}>
                  <DashBoardRightHeader />
                  <div className="flex xl:hidden justify-end w-full bg-color-section-theme p-[1rem]">
                        <DashboardAccount />
                  </div>

                  {/* <DashBoardRightHeader /> */}
                  {/* <DashBoardRightHeader /> */}

                  <div className={`  w-full xl:w-full    flex flex-col gap-[.4rem] `}>
                        <div className="w-full flex flex-col gap-[2rem] xl:gap-[3.2rem]  bg-color-section-theme p-[2rem_1.4rem] xl:p-[2rem]">
                              <div className="flex justify-between">
                                    <p className="text-color-main font-bold text-[2rem] flex items-center gap-[1rem]">
                                          <Circle />

                                          <span>Phân tích chung</span>
                                    </p>
                                    <ButtonCreateForm
                                          textContent="Tạo Form"
                                          urlNavigation="/"
                                          className="flex  xl:[&]:p-[2px] !gap-[.5rem] !h-[3rem] !min-w-[10rem] !w-max !text-[1.3rem]"
                                          position="LEFT"
                                          icon={<Plus size={16} />}
                                    />
                              </div>
                              <div className="flex flex-wrap items-center justify-between xl:justify-normal gap-[1.6rem] xl:gap-[2rem_1rem]">
                                    {/* <div className="w-[50%] xl:w-[75%] h-full order-3 xl:order-2">
                                          <DashboardTotalWrapper />
                                    </div> */}
                                    <div className="w-full sm:w-[48%] xl:w-[24.5%] h-[28rem]">
                                          <div className=" min-h-[22rem] h-full order-1 w-full">
                                                <DashboardTotalForm />
                                                {/* <DashboardTotalForm /> */}
                                          </div>
                                    </div>

                                    <div className="w-full  sm:w-[48%] xl:w-[24.5%] h-[28rem]">
                                          <div className="  min-h-[22rem] h-full order-1 w-full">
                                                <DashboardTotalView />
                                                {/* <DashboardTotalForm /> */}
                                          </div>
                                    </div>

                                    <div className="w-full  sm:w-[48%] xl:w-[24%] h-[28rem]">
                                          <div className="  min-h-[22rem] h-full order-1 w-full">
                                                <DashboardTotalTopView />
                                                {/* <DashboardTotalForm /> */}
                                          </div>
                                    </div>
                                    {/* <div className="flex  items-center order-4  w-[40%] xl:w-[12%] h-full flex-col gap-[4rem]">
                                          <Image
                                                src={"/assets/images/icon/form/create_form.png"}
                                                width={20}
                                                height={20}
                                                alt="avatar"
                                                unoptimized={true}
                                                className="mt-[4rem] w-[12rem] h-[12rem] rounded-full"
                                          />
                                          <ButtonCreateForm
                                                textContent="Tạo Form"
                                                urlNavigation="/"
                                                className=" xl:[&]:p-[4px_8px] !text-[1.4rem]"
                                                position="LEFT"
                                                icon={<Plus />}
                                          />
                                    </div> */}
                                    <div className="mt-auto xl:mb-auto w-full sm:w-[48%]  xl:w-[24%] h-[28rem]  order-2 xl:order-4">
                                          <DashboardFilterFormDate />
                                          {/* <DashboardFormAnalysis /> */}
                                    </div>
                              </div>
                        </div>
                        <div className="min-h-[40rem] max-w-full w-full  xl:px-0">
                              <DashboardForms />
                        </div>
                  </div>
            </div>
      );
};

export default DashBoardRight;
