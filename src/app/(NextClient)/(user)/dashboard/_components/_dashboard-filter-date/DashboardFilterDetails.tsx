import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { FormCore } from "@/type";
import moment from "moment";
import React, { SetStateAction } from "react";
import DashboardFormItem from "../DashboardFormItem";
import IconClose from "@/app/(NextClient)/_components/ui/input/IconClose";
import DashboardWorkspaceItemContent from "../_workspace/DashboardWorkspaceItemContent";
import Link from "next/link";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useDisableBodyScroll from "@/app/hooks/useDisalbeBodyScroll";

type TProps = {
      forms: FormCore.Form[];
      date_full: string;
      setOpenModel: React.Dispatch<SetStateAction<boolean>>;
};

const DashboardFilterDetails = (props: TProps) => {
      const { forms, date_full, setOpenModel } = props;
      useDisableBodyScroll()


      
      return (
            <div className="fixed top-[0] right-[0rem] z-[1000] bg-[rgba(0,0,0,.9)] w-screen h-screen flex items-center justify-center">
                  <div className="relative text-text-theme w-[94vw] mx-auto xl:mx-0 xl:w-[80rem] min-h-[26rem] flex flex-col gap-[2rem] p-[2rem_2rem_3rem]  bg-color-section-theme rounded-[.4rem]">
                        <div className="flex justify-between ">
                              <p className="py-[1rem] flex-1 text-[1.7rem]  text-color-main font-bold">
                                    Dữ liệu ngày {moment(date_full).format("DD-MMMM-YYYY")}
                              </p>

                              <button
                                    onClick={() => setOpenModel(false)}
                                    type="button"
                                    className="ml-auto  w-[12rem] h-[3.6rem] text-[1.4rem] text-white bg-color-main  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 me-2 mb-2  focus:outline-none dark:focus:ring-blue-800"
                              >
                                    Đóng Modal
                              </button>
                        </div>
                        <div className="max-h-full w-full flex flex-col items-center gap-[2rem]">
                              <div className={` ml-[1rem] w-full   transition-[height] duration-500   flex flex-col gap-[1.8rem] text-text-theme pr-[2rem]`}>
                                    <Table className="text-[1.4rem] max-h-[50rem] w-full overflow-auto !border-[0rem] hidden-border-table">
                                          <TableHeader>
                                                <TableRow className="text-text-theme">
                                                      <TableHead className="w-[100px] max-w-[20rem]">Chi tiết</TableHead>

                                                      <TableHead className="w-[100px] whitespace-pre text-right">Lượt xem</TableHead>
                                                      <TableHead className="w-[100px] whitespace-pre text-right">Phản hồi</TableHead>
                                                </TableRow>
                                          </TableHeader>
                                          <TableBody>
                                                {forms.map((form) => {
                                                      return (
                                                            <TableRow key={form._id} className="group">
                                                                  <DashboardWorkspaceItemContent formCore={form} />
                                                            </TableRow>
                                                      );
                                                })}
                                          </TableBody>
                                    </Table>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default DashboardFilterDetails;
