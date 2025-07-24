"use client";
import useGetAllFormUser from "@/app/hooks/useGetAllFormUser";
import React from "react";
import LoadingClient from "../../_components/LoadingClient";
import { Circle } from "lucide-react";
import DashboardTotalForm from "../dashboard/_components/DashboardTotalForm";
import DashboardTotalView from "../dashboard/_components/DashboardTotalView";
import DashboardTotalTopView from "../dashboard/_components/DashboardTotalTopView";
import DashboardFilterFormDate from "../dashboard/_components/_dashboard-filter-date/DashboardFilterFormDate";
import DashBoardRightHeader from "../dashboard/_components/DashBoardRightHeader";

const AnalysisPage = () => {
      const { forms, pending } = useGetAllFormUser();

      return (
            <>
                  {pending ? (
                        <LoadingClient width="100%" />
                  ) : (
                        forms.length > 0 && (
                              <div className="flex flex-col h-full  bg-color-section-theme gap-[1.8rem]">
                                    <DashBoardRightHeader />
                                    <div className={` w-full flex flex-col h-full gap-[1.8rem]  p-[1rem_1.4rem] xl:p-[0rem_1rem]`}>
                                          <div className="flex justify-between">
                                                <p className="text-color-main font-bold text-[2rem] flex items-center gap-[1rem]">
                                                      <Circle width={16} />

                                                      <span>Phân tích chung</span>
                                                </p>
                                          </div>

                                          <>
                                                <div className="transition-all duration-300 flex  flex-wrap items-center justify-between  gap-[1.6rem] xl:gap-[2rem_1rem]">
                                                      {/* <div className="w-[50%] xl:w-[75%] h-full order-3 xl:order-2">
               <DashboardTotalWrapper />
         </div> */}

                                                      <>
                                                            <div className="w-full xl:w-[32%] rounded-lg border-[.1rem] border-[var(--border-color-side)] h-[30rem]">
                                                                  <div className=" min-h-[22rem] h-full order-1 w-full">
                                                                        <DashboardTotalForm />
                                                                        {/* <DashboardTotalForm /> */}
                                                                  </div>
                                                            </div>

                                                            <div className="w-full xl:w-[32%] rounded-lg border-[.1rem] border-[var(--border-color-side)] h-[30rem]">
                                                                  <div className="  min-h-[22rem] h-full order-1 w-full">
                                                                        <DashboardTotalView />
                                                                        {/* <DashboardTotalForm /> */}
                                                                  </div>
                                                            </div>

                                                            <div className="w-full xl:w-[32%] rounded-lg border-[.1rem] text-[1.4rem] border-[var(--border-color-side)] py-[2rem] h-[30rem]">
                                                                  <div className="  min-h-[22rem] h-full order-1 w-full">
                                                                        <DashboardFilterFormDate />

                                                                        {/* <DashboardTotalForm /> */}
                                                                  </div>
                                                            </div>
                                                            <div className="mt-auto xl:mb-auto w-full flex rounded-lg order-2 xl:order-4 pb-[2rem]">
                                                                  <div className="xl:w-[40%]  border-[.1rem] border-[var(--border-color-side)]">
                                                                        <DashboardTotalTopView />
                                                                  </div>
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
                              </div>
                        )
                  )}
            </>
      );
};

export default AnalysisPage;
