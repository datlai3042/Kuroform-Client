"use client";

import { useEffect, useRef, useState } from "react";
import { LinkIcon, MoreHorizontalIcon, Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import BoxCopySuccess from "./BoxCopySuccess";
import { useRouter } from "next/navigation";
import ButtonDeleteForm from "./ButtonDeleteForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormService from "@/app/_services/form.service";
import { onFetchFormState } from "@/app/_lib/redux/formEdit.slice";
import { Toast } from "@/type";
import { v4 } from "uuid";
import { addOneToastSuccess } from "@/app/_lib/redux/toast.slice";
const iconSize = 14;

export function DialogFormAction() {
      const [showNewDialog, setShowNewDialog] = useState(false);
      const [showShareDialog, setShowShareDialog] = useState(false);
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

      const [copySuccess, setCopySuccess] = useState<boolean>(false);

      const timeoutRef = useRef<NodeJS.Timeout | null>(null);
      const router = useRouter();

      useEffect(() => {
            if (copySuccess) {
                  const time = 3000;
                  timeoutRef.current = setTimeout(() => setCopySuccess(false), time);
            }

            return () => {
                  clearTimeout(timeoutRef.current as NodeJS.Timeout);
            };
      }, [copySuccess]);
      const onShare = () => {
            navigator.clipboard.writeText(`${window.location.origin}/form/${formCore._id}`).then(() => setCopySuccess(true));
      };

      const onOpenForm = () => {
            router.push(`/form/${formCore._id}/edit`);
      };

      const queryClient = useQueryClient();
      const dispatch = useDispatch();
      const deleteFormId = useMutation({
            mutationKey: ["delete-form", formCore._id],
            mutationFn: (formId: string) => FormService.deleteFormId({ form_id: formId }),
            onSuccess: (res) => {
                  queryClient.invalidateQueries({
                        queryKey: ["get-form-pagination"],
                  });

                  const { formDelete, formPrivate, formPublic } = res.metadata;
                  dispatch(onFetchFormState({ form_delete: formDelete, form_public: formPublic, form_private: formPrivate }));
                  queryClient.invalidateQueries({ queryKey: ["get-list-form-delete"] });

                  router.push("/dashboard");
                  const toastInstance: Toast.ToastSuccess.ToastSuccessCore = {
                        type: "SUCCESS",
                        _id: v4(),
                        core: {
                              message: "Xóa form thành công",
                        },
                        toast_title: "DELETE FORM",
                  };
                  dispatch(addOneToastSuccess({ toast_item: toastInstance }));
                  // router.refresh();
            },
      });
      const onDeleteForm = () => {
            deleteFormId.mutate(formCore._id);
      };
      return (
            <>
                  <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild className="text-[1.3rem]">
                              <div className="flex gap-[.5rem] p-[.6rem_.6rem] items-center border-[.1rem] border-[var(--border-color-input)] hover:bg-color-main hover:border-transparent hover:text-[#fff] text-text-theme rounded-lg">
                                    <MoreHorizontalIcon size={20} />
                                    <span>Form</span>
                              </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[20rem]" align="end">
                              <DropdownMenuGroup>
                                    <DropdownMenuItem onSelect={() => onOpenForm()}>
                                          <div className="w-full p-[.6rem_.8rem] flex gap-[.8rem] rounded-[.4rem]  items-center hover:bg-color-main hover:text-[#fff] cursor-pointer">
                                                <Pencil size={iconSize} />

                                                <span className="text-[1.4rem]">Chỉnh sửa</span>
                                          </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => onDeleteForm()}>
                                          <div className="w-full p-[.6rem_.8rem] flex gap-[.8rem] rounded-[.4rem]  items-center hover:bg-red-500 hover:text-[#fff] cursor-pointer">
                                                <Trash size={iconSize} />

                                                <span className="text-[1.4rem]">Xóa form</span>
                                          </div>
                                    </DropdownMenuItem>
                              </DropdownMenuGroup>
                        </DropdownMenuContent>
                  </DropdownMenu>
            </>
      );
}
