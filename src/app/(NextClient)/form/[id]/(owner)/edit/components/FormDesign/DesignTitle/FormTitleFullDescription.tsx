import { FormText } from "@/app/_constant/formUi.constant";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import FormService from "@/app/_services/form.service";
import useDeleteTitleSubItem from "@/app/hooks/title_form/useDeleteTitleSubItem";
import useSetTitleSubDescription from "@/app/hooks/title_form/useSetTitleSubDescription";
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
      subTitleItem: FormCore.FormTitleSub.FullDescription.Core;
};

const FormTitleFullDescription = (props: TProps) => {
      const { subTitleItem } = props;

      const [content, setContent] = useState<{ header_value: string; value: string }>({
            header_value: subTitleItem?.core?.header_value || "",
            value: subTitleItem?.core?.value || "",
      });

      const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
            id: subTitleItem._id as UniqueIdentifier,
      });

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

      const setTitleSubDescription = useSetTitleSubDescription();

      const onKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                  e.preventDefault();
            }
      };

      const onSetValue = (e: React.ChangeEvent<HTMLDivElement>, type: "Header" | "Value") => {
            const text = e.currentTarget.textContent;

            if (text) {
                  setContent((prev) => {
                        if (type === "Header") return { ...prev, header_value: text };
                        return { ...prev, value: text };
                  });
                  if (type === "Header") {
                        setTitleSubDescription.mutate({
                              header_value: text,
                              value: content.value,
                              title_sub_id: subTitleItem._id,
                              form_id: formCore._id,
                        });
                  }

                  if (type === "Value") {
                        setTitleSubDescription.mutate({
                              header_value: content.header_value,
                              value: text,
                              title_sub_id: subTitleItem._id,
                              form_id: formCore._id,
                        });
                  }
            }
      };

      const deleteTitleSubItem = useDeleteTitleSubItem();

      const handleDelete = () => {
            deleteTitleSubItem.mutate({ form_id: formCore._id, title_sub_id: subTitleItem._id });
      };

      const style = {
            transition,
            transform: CSS.Transform.toString(transform),
      };

      return (
            <div className="flex flex-col gap-[.4rem] outline-none  text-inherit" ref={setNodeRef} {...attributes} {...listeners} style={style}>
                  <button
                        tabIndex={-1}
                        className={`${renderColorFromFormThemes(
                              formCore.form_themes,
                        )} flex items-center gap-[.5rem] text-[1.4rem] font-bold  hover:text-slate-800`}
                        onClick={handleDelete}
                        disabled={deleteTitleSubItem.isPending}
                  >
                        <Trash2 size={16} />
                        Xóa
                  </button>
                  <div
                        className={` border-none py-[.4rem] outline-none xl:max-w-[80rem]  text-inherit break-all leading-8  font-semibold`}
                        contentEditable={setTitleSubDescription.isPending ? false : true}
                        onKeyDown={onKeyEnter}
                        onBlur={(e) => onSetValue(e, "Header")}
                        data-text={content.header_value || "Nhập tiêu đề"}
                        spellCheck={false}
                        suppressContentEditableWarning={true}
                  >
                        {content.header_value}
                  </div>

                  <div
                        className={`${renderColorFromFormThemes(
                              formCore.form_themes,
                        )} border-none py-[.4rem] outline-none xl:max-w-[80rem] break-all leading-8 opacity-70`}
                        contentEditable={true}
                        onKeyDown={onKeyEnter}
                        onBlur={(e) => onSetValue(e, "Value")}
                        data-text={content.value || "Nhập nội dung"}
                        spellCheck={false}
                        tabIndex={0}
                        suppressContentEditableWarning={true}
                  >
                        {content.value}
                  </div>
            </div>
      );
};

export default FormTitleFullDescription;
