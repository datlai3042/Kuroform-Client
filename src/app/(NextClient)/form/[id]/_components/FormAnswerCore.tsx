"use client";
import AuthorDat from "@/app/(NextClient)/_components/author/AuthorDat";
import FormAnswerProvider from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { timerIncreaseViews } from "@/app/_constant/form.answers.contranst";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import useIncreaseFormViews from "@/app/hooks/form-answer/useIncreaseFormAnswer";
import { FormCore } from "@/type";
import { useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import FormAnswerHeader from "./FormAnswerHeader";
import RenderInputAnswers from "./RenderInputAnswers";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import ButtonDarkMode from "@/app/(NextClient)/_components/ui/button/ButtonDarkMode";
import { renderFormThemeAnswer } from "@/app/utils/form.utils";
type TProps = {
      formCore: FormCore.Form;
      form_answer_id: string;
};

const FormAnswerCore = (props: TProps) => {
      const { formCore, form_answer_id } = props;

      const timer = useRef<NodeJS.Timeout | null>(null);
      const increaseViews = useIncreaseFormViews();

      const dispatch = useDispatch();

      const { setTheme, theme } = useContext(ThemeContext);

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
            dispatch(onFetchForm({ form: formCore }));
      }, [formCore]);

      useEffect(() => {
            setTheme("light");
      }, []);

      const renderBgColor = theme === "light" ? "transparent" : "var(--bg-dark-readOnly)";
      const bgButtonDarkMode = theme === "light" ? {} : { background: "var(--color-main)" };

      const formThemes = renderFormThemeAnswer(formCore);
      const isGoogleForm = formCore.form_styles === "GOOGLE_FORM" ? true : false;
      return (
            <DivNative
                  style={{ backgroundColor: !formThemes ? renderBgColor : "" }}
                  className={`${formThemes} ${
                        isGoogleForm ? "px-[2rem]  p-[2rem_2rem_4rem_2rem] xl:px-0" : ""
                  }  min-h-screen  flex justify-center   w-full h-full`}
            >
                  <DivNative className={`${isGoogleForm ? "w-full sm:w-[75rem]" : "w-full"} flex flex-col gap-[1rem] `}>
                        {(formCore.form_background?.form_background_iamge_url || formCore.form_background_state) && (
                              <DivNative className="relative w-full ">
                                    <FormAnswerHeader formCore={formCore} />
                              </DivNative>
                        )}
                        <DivNative
                  style={{ backgroundColor: !formThemes ? renderBgColor : "" }}

                              className={`${formCore.form_avatar?.form_avatar_url && isGoogleForm ? "mt-[4rem]" : ""} ${
                                    isGoogleForm ? "w-full" : `w-[60vw]  mx-auto ${formThemes}`
                              } rounded-lg`}
                        >
                              <DivNative className={`${isGoogleForm ? 'gap-[5rem]': 'gap-[8rem]'} flex flex-col  pb-[20rem]`}>
                                    <FormAnswerProvider formCore={formCore} form_answer_id={form_answer_id}>
                                          <RenderInputAnswers formCore={formCore} />
                                    </FormAnswerProvider>
                              </DivNative>
                        </DivNative>
                        <div style={{ ...bgButtonDarkMode }} className="fixed top-[2rem] right-[2rem] rounded-[.4rem]">
                              <ButtonDarkMode />
                        </div>
                        {/* <AuthorDat color={"text-[#000]"} backgroundColor={"bg-[#fff]"} /> */}
                  </DivNative>
            </DivNative>
      );
};

export default FormAnswerCore;
