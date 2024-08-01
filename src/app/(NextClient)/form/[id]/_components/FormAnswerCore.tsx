"use client";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import React, { useEffect, useRef } from "react";
import FormAnswerHeader from "./FormAnswerHeader";
import FormAnswerProvider from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import RenderInputAnswers from "./RenderInputAnswers";
import AuthorDat from "@/app/(NextClient)/_components/author/AuthorDat";
import { FormCore } from "@/type";
import useIncreaseFormViews from "@/app/hooks/form-answer/useIncreaseFormAnswer";
import { timerIncreaseViews } from "@/app/_constant/form.answers.contranst";
import { clear } from "console";
import InputChecked from "@/app/(NextClient)/_components/ui/input/InputChecked";
import { useDispatch } from "react-redux";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
type TProps = {
      formCore: FormCore.Form;
      form_answer_id: string;
};

const FormAnswerCore = (props: TProps) => {
      const { formCore, form_answer_id } = props;

      const timer = useRef<NodeJS.Timeout | null>(null);
      const increaseViews = useIncreaseFormViews();

      const dispatch = useDispatch()

      useEffect(() => {
            timer.current = setTimeout(() => {
                  increaseViews.mutate({ form_id: formCore._id });
            }, timerIncreaseViews);

            if (increaseViews.isSuccess) {
                  clearTimeout(timer.current as NodeJS.Timeout);
            }

            return () => {
                  clearTimeout(timer.current as NodeJS.Timeout);
            };
      }, []);

      useEffect(() => {
      
            dispatch(onFetchForm({form:formCore}))
      }, [formCore])

      return (
            <DivNative className="w-full sm:w-[72rem] flex flex-col gap-[1rem] ">
                  <DivNative className="relative w-full ">
                        {(formCore.form_background?.form_background_iamge_url || formCore.form_background_state) && <FormAnswerHeader formCore={formCore} />}
                  </DivNative>
                  <DivNative className={`${formCore.form_avatar?.form_avatar_url ? "mt-[4rem]" : "mt-[2rem]"} w-full rounded-lg`}>
                        <DivNative className="flex flex-col gap-[3rem] pb-[20rem]">
                              <FormAnswerProvider formCore={formCore} form_answer_id={form_answer_id}>
                                    <RenderInputAnswers formCore={formCore} />
                              </FormAnswerProvider>
                        </DivNative>
                  </DivNative>

                  <AuthorDat color={"text-[#000]"} backgroundColor={"bg-[#fff]"} />
            </DivNative>
      );
};

export default FormAnswerCore;
