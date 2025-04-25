"use client";
import { FormCore, InputCore } from "@/type";
import Image from "next/image";
import React, { useContext, useMemo, useState } from "react";
import DivNative from "../ui/NativeHtml/DivNative";
import ButtonNative from "../ui/NativeHtml/ButtonNative";
import { renderStyleTitleCore } from "@/app/_lib/utils";
import FormAnswerProvider, { FormAnswerContext } from "../provider/FormAnswerProvider";
import SliderImage from "../Model/SliderImage";
import Portal from "../Portal";
import InputEmailAnswer from "../../form/[id]/_components/InputAnswer/_email/InputEmailAnswer";
import InputTextAnswer from "../../form/[id]/_components/InputAnswer/_text/InputTextAnswer";
import { checkErrorFinal } from "../../form/[id]/_components/InputAnswer/_utils/formAnswer.uti";
import RenderInputAnswers from "../../form/[id]/_components/RenderInputAnswers";
import FormAnswerHeader from "../../form/[id]/_components/FormAnswerHeader";
import { ThemeContext } from "../provider/ThemeProvider";

type TProps = {
      FormCore: FormCore.Form;
};

const generateInputAnswer = (Inputs: InputCore.InputForm[], formCore: FormCore.Form): React.ReactNode => {
      return Inputs.map((ip) => {
            switch (ip.type) {
                  case "EMAIL":
                        return <InputEmailAnswer inputItem={ip} formCore={formCore} key={ip._id} />;
                  case "TEXT":
                        return <InputTextAnswer inputItem={ip} formCore={formCore} key={ip._id} />;
            }
      });
};

const FormPageGuess = (props: TProps) => {
      const { FormCore } = props;

      const { theme } = useContext(ThemeContext);

      const styleEffect = {
            formMarginTop: (check: boolean) => {
                  if (check) return "mt-[3rem]";
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

      const formColor = FormCore.form_color || "#f2f2f2";

      const isGoogleForm = FormCore.form_styles === "GOOGLE_FORM" ? true : false;

      return (
            <div
                  style={{ backgroundColor: formColor }}
                  className={`${isGoogleForm ? "px-[2rem] p-[2rem]" : ""}  xl:px-0 min-h-screen h-max flex justify-center     `}
            >
                  <DivNative className={`${isGoogleForm ? " w-full sm:w-[66.8rem]" : "w-full"} flex flex-col `}>
                        {(FormCore.form_background?.form_background_iamge_url || FormCore.form_background_state) && (
                              <DivNative className={`${isGoogleForm ? "aspect-[3.01/1]" : ""} relative w-full `}>
                                    <FormAnswerHeader formCore={FormCore} />
                              </DivNative>
                        )}
                        <DivNative className={`${styleEffect.formMarginTop(FormCore.form_avatar_state)} ${isGoogleForm ? 'w-full gap-[3rem]' : 'w-full lg:w-[60vw] mx-auto gap-[8rem]'} pb-[8rem]  flex flex-col  rounded-lg`}>
                              <DivNative className="flex flex-col gap-[3rem]">
                                    <FormAnswerProvider formCore={FormCore} form_answer_id="">
                                          <RenderInputAnswers formCore={FormCore} />
                                    </FormAnswerProvider>
                              </DivNative>
                        </DivNative>
                  </DivNative>
            </div>
      );
};

export default FormPageGuess;
