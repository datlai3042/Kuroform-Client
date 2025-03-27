"use client";

import { PanelTop } from "lucide-react";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import FormService from "@/app/_services/form.service";
import { FormCore } from "@/type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { FormText } from "@/app/_constant/formUi.constant";

export interface ButtonAddBackgroundFormProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      textContent?: string;
}

const ButtonAddBackgroundForm = (props: ButtonAddBackgroundFormProps) => {
      const dispatch = useDispatch();
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

      const { textContent = FormText.buttonDesign.background, ...buttonProps } = props;

      const addBackgroundMutation = useMutation({
            mutationKey: ["add-background"],
            mutationFn: (form: FormCore.Form) => FormService.addBackground(formCore),
            onSuccess: (res) => {
                  const { form } = res.metadata;
                  dispatch(onFetchForm({ form }));
            },
      });

      const onAddBackgroud = () => {
            addBackgroundMutation.mutate(formCore);
      };

      return (
            <button
                  {...buttonProps}
                  className={` ${
                        buttonProps.className ? buttonProps.className : ""
                  } btn-primarily bg-color-main min-w-[14rem] h-[3.6rem] w-max flex items-center sm:justify-center gap-[.5rem]   rounded-[.4rem]  font-bold text-[#fff] `}
                  onClick={onAddBackgroud}
            >
                  <PanelTop />
                  {textContent}
            </button>
      );
};

export default ButtonAddBackgroundForm;
