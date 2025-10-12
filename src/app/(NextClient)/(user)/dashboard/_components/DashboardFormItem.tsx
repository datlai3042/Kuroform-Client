"use client";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { generateContentToFormState } from "@/app/_lib/utils";
import { FormCore, Toast } from "@/type";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import DashboardFormAction from "./DashboardFormAction";
import Image from "next/image";
import { EllipsisVertical, Eye, LinkIcon, Pencil, Trash2, View } from "lucide-react";
import { calcPercentForm } from "@/app/utils/form.utils";
import FormStateProvider from "@/app/(NextClient)/_components/ui/form/form-state/FormStateProvider";
import BoxCopySuccess from "@/app/(NextClient)/form/[id]/(owner)/_components/BoxCopySuccess";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormService from "@/app/_services/form.service";
import { onFetchFormState } from "@/app/_lib/redux/formEdit.slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addOneToastSuccess } from "@/app/_lib/redux/toast.slice";
import { v4 } from "uuid";

type TProps = {
      form: FormCore.Form;
};

const DashboardFormItem = (props: TProps) => {
      const { form } = props;

      if (!form) return null;

      return (
            <Link
                  prefetch={false}
                  href={`/form/${form._id}/summary`}
                  key={form._id}
                  className=" h-[22rem] hover:shadow-2xl text-[1.3rem]  w-full  max-w-full flex flex-col rounded-[1.6rem]    gap-[1.4rem]   text-text-theme bg-[var(--bg-form-nav)]  border-[.1rem] border-[var(--border-form-item)]"
            >
                  {/* <FormStateProvider form_state={form.form_state} /> */}
                  <div className="w-full flex flex-col items-center justify-center gap-[3rem]">
                        <div className="w-full h-[11rem]">
                              {form.form_avatar?.form_avatar_url ? (
                                    <Image
                                          src={form.form_avatar.form_avatar_url}
                                          width={20}
                                          height={20}
                                          alt="avatar"
                                          unoptimized={true}
                                          className="w-full h-full  object-cover rounded-tl-[.8rem] rounded-tr-[.8rem]"
                                    />
                              ) : (
                                    <div className="w-full h-full  bg-[#000] rounded-tl-[.8rem] rounded-tr-[.8rem]"> </div>
                              )}
                        </div>
                  </div>
                  <div className="w-full  flex flex-col justify-center gap-[1rem] p-[0rem_1rem]">
                        <div className=" flex flex-col justify-center gap-[1.2rem] ">
                              <div
                                    dangerouslySetInnerHTML={{ __html: form?.form_title?.form_title_value || "Trống" }}
                                    className="max-w-[90%] h-[2rem] reset-editor truncate !text-[1.5rem] text-color-main font-bold"
                              ></div>
                              <div className="flex justify-between">
                                    <span className="text-[1.2rem]">Chỉnh sửa {moment(new Date(form.updatedAt!)).fromNow()}</span>
                                    <div className="relative group">
                                          <EllipsisVertical size={18} />
                                          <div
                                                
                                                className="absolute hidden group-hover:flex z-[3] shadow-sm top-[90%] left-0"
                                          >
                                                <ModalSettingFormItem formItem={form} />
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <DivNative className="flex flex-col xl:flex-row flex-wrap  xl:items-center text-[1.2rem] gap-[2rem]">
                              {/* <div className="order-2 xl:order-1">
                                    <DashboardFormAction form_id={form._id} />
                              </div> */}
                              <div className="flex gap-[2rem]  ">
                                    <p className="flex gap-[1rem] items-center">
                                          <Eye size={16} />
                                          <span>{form.form_views || 0}</span>
                                    </p>
                                    <p className="flex gap-[1rem] items-center">
                                          <Pencil size={16} />
                                          <span>{form.form_response || 0}</span>
                                    </p>
                                    <span>Tỉ lệ: {calcPercentForm({ formAnswer: form.form_response, formView: form.form_views })}%</span>
                              </div>
                        </DivNative>
                  </div>
            </Link>
      );
};

const ModalSettingFormItem = ({ formItem }: { formItem: FormCore.Form }) => {
      const [copySuccess, setCopySuccess] = useState<boolean>(false);

      const timeoutRef = useRef<NodeJS.Timeout | null>(null);

      useEffect(() => {
            if (copySuccess) {
                  const time = 3000;
                  timeoutRef.current = setTimeout(() => setCopySuccess(false), time);
            }

            return () => {
                  clearTimeout(timeoutRef.current as NodeJS.Timeout);
            };
      }, [copySuccess]);
      const queryClient = useQueryClient();
      const dispatch = useDispatch();
      const router = useRouter();

      const deleteFormId = useMutation({
            mutationKey: ["delete-form", formItem._id],
            mutationFn: (formId: string) => FormService.deleteFormId({ form_id: formId }),
            onSuccess: (res) => {
                  queryClient.invalidateQueries({
                        queryKey: ["get-form-pagination"],
                  });

                  const { formDelete, formPrivate, formPublic } = res.metadata;
                  dispatch(onFetchFormState({ form_delete: formDelete, form_public: formPublic, form_private: formPrivate }));
                  queryClient.invalidateQueries({ queryKey: ["get-list-form-delete"] });

                  const toastInstance: Toast.ToastSuccess.ToastSuccessCore = {
                        type: "SUCCESS",
                        _id: v4(),
                        core: {
                              message: "Xóa form thành công",
                        },
                        toast_title: "DELETE FORM",
                  };
                  dispatch(addOneToastSuccess({ toast_item: toastInstance }));
                  router.refresh();
            },
      });
      const onDeleteForm = () => {
            deleteFormId.mutate(formItem._id);
      };
      return (
            <div className=" text-[1.2rem]  w-[16rem]  h-max bg-color-section-theme text-text-theme rounded-lg border-[.1rem]  border-[var(--border-color-input)] flex flex-col gap-[.5rem]  ">
                  <button
                        onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              navigator.clipboard.writeText(`${window.location.origin}/form/${formItem._id}`).then(() => setCopySuccess(true));
                        }}
                        className="p-[.6rem_1.4rem] relative flex items-center gap-[1.6rem] hover:bg-color-main hover:text-[#fff] rounded-md"
                  >
                        <LinkIcon size={16} />
                        Link chia sẽ
                        {copySuccess && (
                              <div className="absolute left-[104%] text-text-theme">
                                    <BoxCopySuccess message="Copy link chia sẽ thành công" />
                              </div>
                        )}
                  </button>
                  <button
                        onClick={(e) => {
                              // e.stopPropagation();
                              e.preventDefault();

                              onDeleteForm();
                        }}
                        className="p-[.6rem_1.4rem] flex items-center gap-[1.6rem] hover:bg-color-main hover:text-[#fff] hover:bg-red-600 rounded-md"
                  >
                        <Trash2 size={16} />
                        Xóa form
                  </button>
            </div>
      );
};

export default DashboardFormItem;
