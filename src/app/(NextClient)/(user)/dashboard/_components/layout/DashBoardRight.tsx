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
      const { openSidebar, setOpenSidebar } = useContext(SidebarContext);

      const user = useSelector((state: RootState) => state.authReducer.user) as UserType;
      const [expand, setExpand] = useState(false);
      const { forms, pending } = useGetAllFormUser();

      return (
            <div className={`  min-h-screen bg-color-gap-empty    h-max   flex flex-col  gap-[.4rem] text-[1.4rem] pb-[1rem] px-0`}>
                  <DashBoardRightHeader />
                  <div className="flex xl:hidden justify-end w-full bg-color-section-theme p-[1rem]">
                        <DashboardAccount />
                  </div>

                  {/* <DashBoardRightHeader /> */}
                  {/* <DashBoardRightHeader /> */}

                  <div className={` flex-1 w-full xl:w-full    flex flex-col gap-[.4rem] `}>
                        {pending ? (
                              <LoadingClient width="100%" />
                        ) : (
                              forms.length > 0 && (
                                    <div
                                          className={`${
                                                !expand ? " gap-[2rem] xl:gap-[3.2rem]" : ""
                                          } w-full flex flex-col  bg-color-section-theme p-[2rem_1.4rem] xl:p-[2rem]`}
                                    >
                                          <div className="flex justify-between">
                                                <p className="text-color-main font-bold text-[2rem] flex items-center gap-[1rem]">
                                                      <Circle />

                                                      <span>Phân tích chung</span>
                                                </p>
                                                <ButtonExpand active={expand} onClick={() => setExpand((prev) => !prev)} />
                                          </div>

                                          <>
                                                <div
                                                      style={expand ? { height: ".1rem", overflow: "hidden", opacity: 0 } : { opacity: 1 }}
                                                      className="transition-all duration-300 flex flex-wrap items-center justify-between xl:justify-normal gap-[1.6rem] xl:gap-[2rem_1rem]"
                                                >
                                                      {/* <div className="w-[50%] xl:w-[75%] h-full order-3 xl:order-2">
               <DashboardTotalWrapper />
         </div> */}

                                                      <>
                                                            <div className="w-full sm:w-[48%] xl:w-[24%] h-[28rem]">
                                                                  <div className=" min-h-[22rem] h-full order-1 w-full">
                                                                        <DashboardTotalForm />
                                                                        {/* <DashboardTotalForm /> */}
                                                                  </div>
                                                            </div>

                                                            <div className="w-full  sm:w-[48%] xl:w-[24%] h-[28rem]">
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
                                                            <div className="mt-auto xl:mb-auto flex-grow-1 w-full sm:w-[48%]  xl:w-[24%] h-[28rem]  order-2 xl:order-4">
                                                                  <DashboardFilterFormDate />
                                                                  {/* <DashboardFormAnalysis /> */}
                                                            </div>
                                                      </>

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
                                                </div>
                                          </>
                                    </div>
                              )
                        )}
                        <div className="flex-1 flex min-h-[40rem] max-w-full w-full  xl:px-0">
                              <DashboardForms />
                        </div>
                  </div>
            </div>
      );
};

export default DashBoardRight;
