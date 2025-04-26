import Portal from "@/app/(NextClient)/_components/Portal";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import useDisableBodyScroll from "@/app/hooks/useDisalbeBodyScroll";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FormCore, InputCore } from "@/type";
import { X } from "lucide-react";
import Link from "next/link";
import React, { SetStateAction, useContext } from "react";

type TProps = {
      inputFormErrors: FormCore.FormAnswer.InputFormError[];
      formCore: FormCore.Form;
      setPage: React.Dispatch<SetStateAction<number>>;
      numberInputAPage: number;
      onClose: () => void;
};

const ListErrorInput = (props: TProps) => {
      const { inputFormErrors, formCore, numberInputAPage, setPage, onClose } = props;

      const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;

      const { setFormAnswer } = useContext(FormAnswerContext);

      const onTargerError = (pageError: number) => {
            setPage(pageError);
            onClose();
      };

      useDisableBodyScroll();



      return (
            <Portal>
                  <div className="fixed top-[0] right-[0rem] z-[100] bg-[rgba(0,0,0,.8)] w-screen h-screen flex items-center justify-center">
                        <div className="relative text-text-theme w-[94vw] mx-auto xl:mx-0 xl:w-[80rem] min-h-[26rem] flex flex-col gap-[2rem] p-[2rem_2rem_3rem]  bg-color-section-theme rounded-[.4rem]">
                              <div className="flex justify-between">
                                    <button
                                          onClick={() => setFormAnswer((prev) => ({ ...prev, openModelError: false }))}
                                          type="button"
                                          className="ml-auto  w-[12rem] h-[3.6rem] text-[1.4rem] text-white bg-color-main opacity-70 hover:opacity-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 me-2 mb-2  focus:outline-none dark:focus:ring-blue-800"
                                    >
                                          Đóng Modal
                                    </button>
                              </div>
                              <div className="max-h-full w-full flex flex-col items-center gap-[2rem]">
                                    <div
                                          className={` ml-[1rem] w-full   transition-[height] duration-500   flex flex-col gap-[1.8rem] text-text-theme pr-[2rem]`}
                                    >
                                          <Table classContainer=" bg-color-section-theme  max-h-[70vh]" className="text-[1.4rem]  overflow-auto !border-[0rem] hidden-border-table rounded-[.4rem]">
                                                <TableHeader>
                                                      <TableRow className="group hover:bg-red-700  text-[#fff] border-[var(--border-color-input)]">
                                                            <TableHead className="w-[100px] max-w-[20rem] group-hover:text-[#fff]">Tiêu đề</TableHead>

                                                            <TableHead className="w-[100px] whitespace-pre group-hover:text-[#fff] ">Mã lỗi</TableHead>
                                                            <TableHead className="w-[100px] whitespace-pre group-hover:text-[#fff]">Mô tả</TableHead>
                                                            <TableHead className="w-[100px] whitespace-pre text-right group-hover:text-[#fff]">Xem chi tiết</TableHead>
                                                      </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                      {inputFormErrors.map((ir) => {
                                                            const indexError = formCore.form_inputs.findIndex((ip) => ip._id === ir._id);
                                                            const pageError = Math.ceil((indexError + 1) / numberInputAPage);

                                                            const title = formCore.form_inputs[indexError].input_title || "";
                                                            return (
                                                                  <TableRow
                                                                        key={ir._id}
                                                                        className="group cursor-pointer hover:bg-red-700 hover:text-[#fff] border-[var(--border-color-input)]"
                                                                        onClick={() => onTargerError(pageError)}
                                                                  >
                                                                        <TableCell className="whitespace-pre">
                                                                              <span className="font-bold text-red-600 group-hover:text-[#fff]">
                                                                                    {title || "Trống"}
                                                                              </span>
                                                                        </TableCell>
                                                                        <TableCell className="whitespace-pre ">
                                                                              <span className="text-red-600 group-hover:text-[#fff]  font-semibold">{`[${ir.type}]`}</span>
                                                                        </TableCell>
                                                                        <TableCell className="whitespace-pre ">
                                                                              <span className="">
                                                                                    {formCore.form_inputs[indexError].core.setting.input_error_state
                                                                                          ? formCore.form_inputs[indexError].core.setting.input_error
                                                                                          : ir.message}
                                                                              </span>
                                                                        </TableCell>

                                                                        <TableCell
                                                                              className="whitespace-pre text-right"
                                                                              onClick={() => onTargerError(pageError)}
                                                                        >
                                                                              Trang: {pageError}
                                                                        </TableCell>
                                                                  </TableRow>
                                                            );
                                                      })}
                                                      {/* {forms.map((form) => {
                                                      return (
                                                            <TableRow key={form._id} className="group">
                                                                  <DashboardWorkspaceItemContent formCore={form} />
                                                            </TableRow>
                                                      );
                                                })} */}
                                                </TableBody>
                                          </Table>
                                    </div>
                              </div>
                        </div>
                  </div>
            </Portal>
      );
};

export default ListErrorInput;
