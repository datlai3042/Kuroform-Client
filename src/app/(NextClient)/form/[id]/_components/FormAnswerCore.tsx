"use client";
import AuthorDat from "@/app/(NextClient)/_components/author/AuthorDat";
import FormAnswerProvider from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { timerIncreaseViews } from "@/app/_constant/form.answers.contranst";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import useIncreaseFormViews from "@/app/hooks/form-answer/useIncreaseFormAnswer";
import { FormCore } from "@/type";
import { useContext, useEffect, useRef, useState } from "react";
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
      const [colorBorderCurrent, setBorderCurruent] = useState("");

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
            setBorderCurruent(formCore.form_themes);
            if (formCore.form_themes === "AUTO") {
                  if (theme === "light") {
                        document.body.style.setProperty("--border-color-input", "rgb(46 76 120 / 27%)");
                  } else {
                        document.body.style.setProperty("--border-color-input", "rgb(209 213 219 / 27%)");
                  }
            }
            if (formCore.form_themes === "LIGHT") {
                  document.body.style.setProperty("--border-color-input", "rgb(46 76 120 / 27%)");
                  document.documentElement.style.backgroundColor = "var(--form-theme-light)";
            }

            if (formCore.form_themes === "DARK") {
                  document.body.style.setProperty("--border-color-input", "rgb(209 213 219 / 27%)");
                  if (formCore.form_styles === "GOOGLE_FORM") {
                        document.body.style.setProperty("--color-section-theme", "#16161e");
                  } else {
                        document.body.style.setProperty("--color-section-theme", "transparent");
                  }

                  document.documentElement.style.backgroundColor = "var(--form-theme-dark)";
            }

            return () => {
                  document.documentElement.style.backgroundColor = "var(--color-section-theme)";
            };
      }, [formCore.form_themes, theme]);

      const renderBgColor = theme === "light" ? "transparent" : "var(--bg-dark-readOnly)";
      const styleEffect = {
            formMarginTop: (check: boolean) => {
                  if (check) return "mt-[8rem]";
                  return "mt-0";
            },
            onCheckModeAvatar: (mode: FormCore.FormAvatarMode) => {
                  if (mode === "circle") return "rounded-full";
                  return "";
            },

            onCheckPositionAvatar: (position: FormCore.FormAvatarPosition) => {
                  if (position === "left") return "left-[calc(25%-6.4rem)] ";
                  if (position === "center") return "left-[50%] translate-x-[-50%]";
                  return "right-[calc(25%-6.4rem)]";
            },
      };
      const formThemes = renderFormThemeAnswer(formCore);
      console.log({ formThemes });
      const isGoogleForm = formCore.form_styles === "GOOGLE_FORM" ? true : false;
      return (
            <DivNative className={` ${isGoogleForm ? "px-[2rem]  p-[2rem_2rem_4rem_2rem] xl:px-0" : ""}   min-h-screen  flex justify-center   w-full h-full`}>
                  <DivNative className={`${isGoogleForm ? "w-full sm:w-[62rem]" : "w-full"} flex flex-col gap-[1rem]  `}>
                        {(formCore.form_background?.form_background_iamge_url ||
                              formCore.form_background_state ||
                              formCore.form_avatar?.form_avatar_url ||
                              formCore.form_avatar_state) && (
                              <DivNative className="relative w-full ">
                                    <FormAnswerHeader formCore={formCore} />
                              </DivNative>
                        )}
                        <DivNative
                              style={{ backgroundColor: "inherit" }}
                              className={`
                                    ${styleEffect.formMarginTop(formCore.form_avatar_state)}
                                   ${
                                         isGoogleForm
                                               ? "w-full"
                                               : `w-[94vw] md:w-[54vw]  mx-auto ${
                                                       formCore.form_styles === "FULL_WIDTH"
                                                             ? formCore?.form_themes === "LIGHT"
                                                                   ? "bg-color-section-theme"
                                                                   : "bg-[#1e1f22]"
                                                             : ""
                                                 }`
                                   } rounded-lg pb-[2rem]`}
                        >
                              <DivNative
                                    className={`${
                                          isGoogleForm
                                                ? "gap-[4rem]"
                                                : `gap-[0rem] ${
                                                        formCore.form_styles === "FULL_WIDTH"
                                                              ? formCore?.form_themes === "LIGHT"
                                                                    ? "bg-color-section-theme"
                                                                    : "bg-[#1e1f22]"
                                                              : ""
                                                  }`
                                    } 
                              rounded-lg flex flex-col  `}
                              >
                                    <FormAnswerProvider formCore={formCore} form_answer_id={form_answer_id}>
                                          <RenderInputAnswers formCore={formCore} />
                                    </FormAnswerProvider>
                              </DivNative>
                        </DivNative>
                        {/* {formCore.form_themes === "AUTO" && (
                              <div style={{ ...bgButtonDarkMode }} className="fixed top-[2rem] right-[2rem] rounded-[.4rem]">
                                    <ButtonDarkMode />
                              </div>
                        )} */}
                        {/* <AuthorDat color={"text-[#000]"} backgroundColor={"bg-[#fff]"} /> */}
                  </DivNative>
            </DivNative>
      );
};

export default FormAnswerCore;
