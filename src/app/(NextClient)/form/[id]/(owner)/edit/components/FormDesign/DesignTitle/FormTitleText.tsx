import EditorWriter from "@/app/(NextClient)/_components/Editor/EditorWriter";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import FormService from "@/app/_services/form.service";
import useDeleteTitleSubItem from "@/app/hooks/title_form/useDeleteTitleSubItem";
import useUpdateForm from "@/app/hooks/useUpdateForm";
import { renderColorFromFormThemes } from "@/app/utils/form.utils";
import { FormCore } from "@/type";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type TProps = {
      subTitleItem: FormCore.FormTitleSub.Text.Core;
};

const FormTitleText = (props: TProps) => {
      const { subTitleItem } = props;

      const [value, setValue] = useState<string>(subTitleItem?.core?.value || "");
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

      const [isWritten, setIsWritten] = useState<boolean>(false);

      const dispatch = useDispatch();

      const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
            id: subTitleItem._id as UniqueIdentifier,
      });

      const style = {
            transition,
            transform: CSS.Transform.toString(transform),
      };

      const onKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                  e.preventDefault();
            }
      };

      // const onSetValue = (e: React.ChangeEvent<HTMLDivElement>) => {
      //       const content = e.currentTarget.textContent;

      //       const newForm = structuredClone(formCore);
      //       const findIndex = newForm.form_title.form_title_sub.findIndex((ft) => ft._id === subTitleItem._id);
      //       if (content) {
      //             setValue(content);

      //             updateTitleSub.mutate({
      //                   form_title_sub_id: subTitleItem._id,
      //                   form_id: formCore._id,
      //                   form_title_sub_content: content,
      //             });
      //       }
      // };

      const onSetValue = (value: string) => {
            if (value) {
                  setValue(value);

                  updateTitleSub.mutate({
                        form_title_sub_id: subTitleItem._id,
                        form_id: formCore._id,
                        form_title_sub_content: value,
                  });
            }
      };

      const updateTitleSub = useMutation({
            mutationKey: ["update-title-sub-text"],
            mutationFn: ({
                  form_title_sub_content,
                  form_title_sub_id,

                  form_id,
            }: {
                  form_title_sub_content: string;
                  form_title_sub_id: string;
                  form_id: string;
            }) => FormService.updateSubTitle({ form_title_sub_content, form_id, form_title_sub_id }),
            onSuccess: (res) => {
                  const { form } = res.metadata;
                  dispatch(onFetchForm({ form }));
            },
      });

      const deleteTitleSubItem = useDeleteTitleSubItem();

      const handleDelete = () => {
            deleteTitleSubItem.mutate({ form_id: formCore._id, title_sub_id: subTitleItem._id });
      };

      return (
            <div onKeyDown={onKeyEnter} className="flex flex-col gap-[.5rem]  " ref={setNodeRef} {...attributes} {...listeners} style={style}>
                  <button
                        className={`${renderColorFromFormThemes(
                              formCore.form_themes,
                        )} flex items-center gap-[.5rem] text-[1.4rem] font-bold  hover:text-slate-800`}
                        onClick={handleDelete}
                        disabled={deleteTitleSubItem.isPending}
                  >
                        <Trash2 size={16} />
                        Xóa
                  </button>
                  <EditorWriter key={subTitleItem._id} defaultValue={value} namespace="input" onUpdate={(rest) => onSetValue(rest)} config={formCore} styleObj={{}} />
            </div>
      );
};

export default FormTitleText;
