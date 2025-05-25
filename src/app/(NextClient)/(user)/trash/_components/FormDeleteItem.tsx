import ModelCheckRemove from "@/app/(NextClient)/_components/Model/ModelCheckRemove";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import useChangeModeForm from "@/app/hooks/useChangeModeForm";
import useDeleteFormForever from "@/app/hooks/useDeleteFormForever";
import { TableCell } from "@/components/ui/table";
import { FormCore } from "@/type";
import { useQueryClient } from "@tanstack/react-query";
import { RotateCcw, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

type TProps = {
      form: FormCore.Form;
};

const FormDeleteItem = (props: TProps) => {
      const { form } = props;
      const changeFormMode = useChangeModeForm();
      const deleteFormForever = useDeleteFormForever();
      const [openModelCheckRemove, setOpenModelCheckRemove] = useState<boolean>(false);
      const { theme } = useContext(ThemeContext);

      const queryClient = useQueryClient();

      const onChangeModeForm = (type: FormCore.FormState = "isPrivate") => {
            changeFormMode.mutate({ mode: type, form_id: form._id });
      };

      const onChangeDeleteForever = () => {
            deleteFormForever.mutate({ form_id: form._id });
      };

      useEffect(() => {
            if (changeFormMode.isSuccess) {
                  queryClient.invalidateQueries({
                        queryKey: ["get-list-form-delete"],
                  });

                  queryClient.invalidateQueries({
                        queryKey: ["get-form-pagination"],
                  });
            }
      }, [changeFormMode.isSuccess]);

      useEffect(() => {
            if (deleteFormForever.isSuccess) {
                  queryClient.invalidateQueries({
                        queryKey: ["get-list-form-delete"],
                  });
                  queryClient.invalidateQueries({
                        queryKey: ["get-all-notification"],
                  });
                  setOpenModelCheckRemove(false);
            }
      }, [deleteFormForever.isSuccess]);

      return (
            <>
                  <TableCell className="w-[54rem] group-hover:text-color-main">
                        <div className="w-[54rem] flex items-center gap-[1.6rem] ">
                              {form.form_avatar?.form_avatar_url ? (
                                    <Image
                                          src={form.form_avatar?.form_avatar_url || ""}
                                          width={18}
                                          height={18}
                                          alt="icon"
                                          className="w-[3rem] h-[3rem] bg-sec p-[.3rem] rounded-[.6rem]"
                                          unoptimized={true}
                                    />
                              ) : (
                                    <div
                                          className={`${
                                                theme === "light" ? "bg-transparent" : "bg-[#fff]"
                                          }  min-w-[3rem] h-[3rem] rounded-full flex items-center justify-center`}
                                    >
                                          <Image
                                                src={"/icon_core.png"}
                                                width={20}
                                                height={20}
                                                alt="avatar"
                                                unoptimized={true}
                                                className="w-[3rem] h-[3rem] bg-[#fff] p-[.2rem] rounded-[.6rem]"
                                          />
                                    </div>
                              )}
                              <div className="w-[70%]">
                                    <p className="max-w-[100%] truncate ">{form?.form_title?.form_title_plain_text || form.form_title.form_title_value || "Chưa tạo tiêu đề"}</p>
                              </div>
                        </div>
                  </TableCell>

                  <TableCell className="text-right">
                        <span>{form.form_views || 0}</span>
                  </TableCell>
                  <TableCell className="text-right">
                        <span>{form.form_response || 0}</span>
                  </TableCell>
                  <TableCell className=" flex justify-end gap-[2rem] whitespace-pre">
                        <button
                              disabled={changeFormMode.isPending}
                              className="flex h-[3rem] px-[1rem] rounded-lg  items-center gap-[1rem] border-[.1rem] border-red-200 bg-[#ffffff] text-red-400 hover:bg-red-400 hover:text-[#fff]"
                              onClick={() => onChangeModeForm()}
                        >
                              <RotateCcw size={18} />
                              <span>Khôi phục</span>
                        </button>

                        <button
                              className="flex h-[3rem] items-center gap-[1rem] text-red-300 hover:text-red-700"
                              onClick={() => setOpenModelCheckRemove(true)}
                              disabled={deleteFormForever.isPending}
                        >
                              <Trash size={18} />
                              <span>Xóa vĩnh viễn</span>
                        </button>
                  </TableCell>

                  {openModelCheckRemove && (
                        <ModelCheckRemove
                              content="Bạn chắc chắn sẽ xóa chứ, mọi dữ liệu sau khi xóa sẽ không thể phục hồi"
                              callbackCancel={setOpenModelCheckRemove}
                              callbackAction={onChangeDeleteForever}
                        />
                  )}
            </>
      );
};

export default FormDeleteItem;
