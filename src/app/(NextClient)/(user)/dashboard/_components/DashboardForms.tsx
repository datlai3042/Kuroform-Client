import LoadingClient from "@/app/(NextClient)/_components/LoadingClient";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { LIMIT_PAGINATION_FORM } from "@/app/_constant/api.constant";
import useGetFormPagination from "@/app/hooks/form/useGetFormPagination";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work
import { useState } from "react";
import DashboardPagination from "../DashboardPagination";
import DashboardFormItem from "./DashboardFormItem";
import FormEmpty from "./FormEmpty";
import { Circle, Plus } from "lucide-react";
import ButtonCreateForm from "@/app/(NextClient)/_components/ui/button/ButtonCreateForm";

moment.locale("vi");

const DashboardForms = () => {
      const [page, setPage] = useState<number>(1);
      const getFormPagination = useGetFormPagination({ page, limit: LIMIT_PAGINATION_FORM });

      return (
            <DivNative className="flex-1 w-full flex bg-color-section-theme   min-h-[40rem]   flex-col gap-[0rem] p-[1.8rem_2rem_4rem_2rem] ">
                  <div className="flex flex-col gap-[1.8rem] h-full">
                        <div className="flex flex-wrap justify-end items-center gap-[1rem]">
                              {/* <Image
                                    src={"/assets/images/home/form_controller.png"}
                                    width={20}
                                    height={20}
                                    alt="avatar"
                                    unoptimized={true}
                                    className="w-[4rem] h-[4rem] "
                              /> */}

                              {/* <p className="text-color-main font-bold text-[2rem] flex items-center gap-[1rem]">
                                    <Circle width={16}/>

                                    <span>Danh sách Form</span>
                              </p> */}

                              <ButtonCreateForm
                                    textContent="Tạo Form"
                                    urlNavigation="/"
                                    className="flex  xl:[&]:p-[2px] !gap-[.5rem] !h-[3rem] !min-w-[10rem] !w-max !text-[1.3rem]"
                                    position="LEFT"
                                    icon={<Plus size={16} />}
                              />
                        </div>
                        {!getFormPagination.isPending && getFormPagination.isSuccess && getFormPagination.data.metadata.forms.length > 0 && (
                              <DivNative className={`max-w-full flex flex-wrap  gap-[2.4rem] pb-[2rem] text-[1.3rem] `}>
                                    {getFormPagination.data.metadata.forms.map((form, index) => (
                                          <div className="w-full lg:w-[48%] xl:w-[23%]" key={form._id}>
                                                <DashboardFormItem form={form} />
                                          </div>
                                    ))}
                              </DivNative>
                        )}
                  </div>
                  {getFormPagination.isPending && (
                        <div className="w-full min-h-[6rem] mt-[2rem] ">
                              <LoadingClient width="w-full" height="h-[36rem]" style={{ height: "36rem" }} message="Đang lấy thông tin các form" />
                        </div>
                  )}

                  {getFormPagination.isSuccess && getFormPagination.data.metadata.total_page > 0 && (
                        <DashboardPagination page={page} setPage={setPage} total_page={getFormPagination.data?.metadata.total_page || 1} />
                  )}

                  {getFormPagination.isSuccess && getFormPagination.data.metadata.forms.length === 0 && (
                        <div className="w-full h-full flex items-center justify-center   ">
                              <FormEmpty />
                        </div>
                  )}
            </DivNative>
      );
};

export default DashboardForms;
