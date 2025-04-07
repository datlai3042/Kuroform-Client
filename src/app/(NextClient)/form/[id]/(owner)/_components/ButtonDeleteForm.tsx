import { clearFormAnswer } from "@/app/_lib/redux/formAnswer.slice";
import { onFetchFormState } from "@/app/_lib/redux/formEdit.slice";
import { addOneToastSuccess } from "@/app/_lib/redux/toast.slice";
import FormService from "@/app/_services/form.service";
import { Toast } from "@/type";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";

type TProps = {
      form_id: string;
      onAfterDelete?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonDeleteForm = (props: TProps) => {
      const { form_id, onAfterDelete, ...rest } = props;
      const queryClient = useQueryClient();
      const router = useRouter();
      const dispatch = useDispatch();
      const deleteFormId = useMutation({
            mutationKey: ["delete-form", form_id],
            mutationFn: (formId: string) => FormService.deleteFormId({ form_id: formId }),
            onSuccess: (res) => {
                  queryClient.invalidateQueries({
                        queryKey: ["get-form-pagination"],
                  });

                  const { formDelete, formPrivate, formPublic } = res.metadata;
                  dispatch(onFetchFormState({ form_delete: formDelete, form_public: formPublic, form_private: formPrivate }));
                  queryClient.invalidateQueries({ queryKey: ["get-list-form-delete"] });
                  if (onAfterDelete) {
                        onAfterDelete();
                  }
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
            deleteFormId.mutate(form_id);
      };
      return (
            <button
                  onClick={(e) => {
                        // e.stopPropagation();
                        e.preventDefault();

                        onDeleteForm();
                  }}
                  {...rest}
                  className={`${rest.className || ''} flex items-center gap-[1rem] p-[.5rem_.7rem] bg-transparent border-[.1rem] border-[var(--border-color-input)] hover:bg-red-600 text-[#fff] rounded-lg`}
            >
                  {" "}
                  <Trash2 size={16} />
                  {rest.children && rest.children}
            </button>
      );
};

export default ButtonDeleteForm;
