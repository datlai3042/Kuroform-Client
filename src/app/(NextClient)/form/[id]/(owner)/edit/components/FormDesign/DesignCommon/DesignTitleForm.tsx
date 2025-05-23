/* eslint-disable jsx-a11y/alt-text */
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import FormService from "@/app/_services/form.service";
import { useMutation } from "@tanstack/react-query";
import { Image, List, Type } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormTitleModeImage from "../DesignTitle/FormTitleModeImage";
import { FormText } from "@/app/_constant/formUi.constant";
import useAddInputSetTitle from "@/app/hooks/useAddInputSetTitle";
import { FormCore } from "@/type";
import useAddSectionSubTitle from "@/app/hooks/useAddSectionSubTitle";

const iconSize = 16;

const DesignTitleForm = () => {
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

      const addSubTitleItem = useAddSectionSubTitle();

      const onAddTitleSub = (type: FormCore.FormTitleSub.FormTitleBase["type"]) => {
            addSubTitleItem.mutate({ type, form_id: formCore._id });
      };

      return (
            <div className=" w-full min-h-[4rem] h-max p-[1rem_0rem] flex flex-wrap gap-[2rem]">
                  <button
                        onClick={() => onAddTitleSub("Text")}
                        className="btn-primarily bg-color-main min-w-[9rem] h-[3.2rem] flex items-center justify-center gap-[.4rem] p-[.6rem] text-[#fff] rounded-[.4rem]"
                  >
                        <Type size={iconSize} />
                        <span>{FormText.title.optionText.message}</span>
                  </button>

                  <button
                        onClick={() => onAddTitleSub("FullDescription")}
                        className="btn-primarily bg-color-main min-w-[9rem] h-[3.2rem] flex items-center justify-center gap-[.4rem] text-[#fff]  rounded-[.4rem]"
                  >
                        <Type size={iconSize} />

                        {/* // eslint-disable-next-line jsx-a11y/alt-text */}
                        <span>{FormText.title.optionFullDescription.message}</span>
                  </button>

                  <button
                        onClick={() => onAddTitleSub("Image")}
                        className="btn-primarily bg-color-main min-w-[9rem] h-[3.2rem] flex items-center justify-center gap-[.4rem] text-[#fff]  rounded-[.4rem]"
                  >
                        {/* // eslint-disable-next-line jsx-a11y/alt-text */}
                        <Image size={iconSize} />
                        <span>{FormText.title.optionImage.message}</span>
                  </button>
                  {formCore.form_title.form_title_sub.filter((ft) => ft.type === "Image" && ft?.core?.url).length > 0 && <FormTitleModeImage />}
            </div>
      );
};

export default DesignTitleForm;
