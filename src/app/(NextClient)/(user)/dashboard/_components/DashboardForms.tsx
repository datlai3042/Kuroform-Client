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
import { Circle } from "lucide-react";

moment.locale("vi");

const DashboardForms = () => {
      const [page, setPage] = useState<number>(1);
      const getFormPagination = useGetFormPagination({ page, limit: LIMIT_PAGINATION_FORM });

      return (
            <DivNative className=" bg-color-section-theme   min-h-[40rem]   flex flex-col gap-[0rem] p-[2rem_2rem_4rem_2rem] ">
                  <div className="flex flex-col gap-[2rem] xl:gap-[3rem] ">
                        <div className="flex items-center gap-[1rem]">
                              {/* <Image
                                    src={"/assets/images/home/form_controller.png"}
                                    width={20}
                                    height={20}
                                    alt="avatar"
                                    unoptimized={true}
                                    className="w-[4rem] h-[4rem] "
                              /> */}

                              <p className="text-color-main font-bold text-[2rem] flex items-center gap-[1rem]">
                                    <Circle />

                                    <span>Danh sách Form</span>
                              </p>
                        </div>
                        {!getFormPagination.isPending && getFormPagination.isSuccess && getFormPagination.data.metadata.forms.length > 0 && (
                              <DivNative className={`max-w-full flex flex-wrap  gap-[2rem_1rem] pb-[2rem] text-[1.3rem] `}>
                                    {getFormPagination.data.metadata.forms.map((form, index) => (
                                          <div className="w-full   xl:w-[32.5%]" key={form._id}>
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
