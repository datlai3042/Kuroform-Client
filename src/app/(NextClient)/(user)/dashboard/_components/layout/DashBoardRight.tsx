import ButtonCreateForm from "@/app/(NextClient)/_components/ui/button/ButtonCreateForm";
import ButtonDarkMode from "@/app/(NextClient)/_components/ui/button/ButtonDarkMode";
import { RootState } from "@/app/_lib/redux/store";
import { UserType } from "@/app/_schema/user/user.type";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { SidebarContext } from "../../SidebarContext";
import DashBoardRightHeader from "../DashBoardRightHeader";
import DashboardForms from "../DashboardForms";
import DashboardTotalWrapper from "../DashboardTotalWrapper";
import DashboardFilterFormDate from "../_dashboard-filter-date/DashboardFilterFormDate";

const DashBoardRight = () => {
      const { openSidebar, setOpenSidebar } = useContext(SidebarContext);

      const user = useSelector((state: RootState) => state.authReducer.user) as UserType;

      const width = openSidebar ? " w-full" : "w-full";

      return (
            <div
                  className={`${width} w-full min-h-screen bg-color-gap-empty    h-max   flex flex-col  gap-[4rem] xl:gap-[2rem] text-[1.4rem] pb-[5rem] px-0`}
            >
                  <DashBoardRightHeader />

                  {/* <DashBoardRightHeader /> */}
                  {/* <DashBoardRightHeader /> */}

                  <div className="p-0  w-full xl:w-full    flex flex-col gap-[2rem] ">
                        <div className="w-full flex flex-col gap-[4rem] xl:gap-[2rem]  bg-color-section-theme p-[2rem_1.4rem] xl:p-[2rem]">
                              <div className="flex justify-between">
                                    <p className="text-color-main font-bold text-[2rem] ">Phân tích chung</p>
                                    <div className=" sm:hidden  flex justify-end my-[1rem]">
                                          <ButtonDarkMode />
                                    </div>
                              </div>
                              <div className="flex flex-wrap items-center justify-center gap-[2rem] xl:gap-0 h-max xl:h-[38rem]">
                                    <div className="flex justify-center items-center order-1 w-[40%] xl:w-[20%] h-full flex-col gap-[4rem]">
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
                                    <div className="w-full xl:w-[50%] h-full order-3 xl:order-2">
                                          <DashboardTotalWrapper />
                                    </div>

                                    <div className="mt-[1rem] xl:mt-0 w-[53%] xl:w-[30%] min-h-full h-max order-2 xl:order-4">
                                          <DashboardFilterFormDate />
                                          {/* <DashboardFormAnalysis /> */}
                                    </div>
                              </div>
                        </div>
                        <div className="min-h-[40rem] max-w-full w-full px-[1rem] xl:px-0">
                              <DashboardForms />
                        </div>
                  </div>
            </div>
      );
};

export default DashBoardRight;
