"use client";

import { FormCore } from "@/type";
import React, { useContext } from "react";
import FormTitleImage from "../(owner)/edit/components/FormDesign/DesignTitle/FormTitleImage";
import SliderImage from "@/app/(NextClient)/_components/Model/SliderImage";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import FormAnswerAvatar from "./_avatar/FormAnswerAvatar";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import { cp } from "fs";

type TProps = {
      formCore: FormCore.Form;
};

const HeaderFormAnswer = (props: TProps) => {
      const { formCore } = props;
      const { theme } = useContext(ThemeContext);
      const {
            formAnswer: { inputFormRequire },
      } = useContext(FormAnswerContext);

      const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;
      const checkMode: FormCore.FormTitle["form_title_mode_image"] = "Slider";

      let flag = false;

      const styleTitle = {
            fontSize: `${
                  formCore.form_title.form_title_size
                        ? formCore.form_title.form_title_size / 10 + "rem"
                        : formCore.form_setting_default.form_title_size_default / 10 + "rem"
            }`,
            color: `${formCore.form_title.form_title_color ? formCore.form_title.form_title_color : formCore.form_setting_default.form_title_color_default}`,
            fontStyle: `${
                  formCore.form_title.form_title_style ? formCore.form_title.form_title_style : formCore.form_setting_default.form_title_style_default
            }`,
      };

      const marginTopWhenImageAppear =
            formCore.form_avatar_state || formCore.form_avatar?.form_avatar_url ? (formCore.form_styles === "GOOGLE_FORM" ? "mt-[5rem]" : "mt-[3rem]") : "mt-0";

      const renderBorder =
            formCore.form_styles !== "GOOGLE_FORM"
                  ? {}
                  : theme === "dark"
                  ? {
                          borderTop: `.1rem solid ${colorMain}`,
                          borderBottom: ".1rem solid var(--border-color-input)",
                          borderLeft: ".1rem solid var(--border-color-input)",
                          borderRight: ".1rem solid var(--border-color-input)",
                    }
                  : { borderTop: `.1rem solid ${colorMain}` };
      const isGoogleForm = formCore.form_styles === "GOOGLE_FORM" ? true : false;
      const color =
            formCore.form_themes === "AUTO"
                  ? "text-text-theme"
                  : formCore.form_styles === "GOOGLE_FORM"
                  ? formCore?.form_input_styles?.color
                        ? formCore?.form_input_styles?.color
                        : formCore.form_themes === "DARK"
                        ? "text-[#fff]"
                        : "text-[#000]"
                  : formCore.form_themes === "DARK"
                  ? "text-[#fff]"
                  : "text-[#000]";
      return (
            <header
                  style={{ ...renderBorder }}
                  className={`${
                        formCore?.form_avatar?.form_avatar_url || formCore?.form_avatar_state
                              ? formCore.form_styles === "GOOGLE_FORM"
                                    ? "mt-[7rem]"
                                    : "mt-[4rem]"
                              : ""
                  } ${
                        formCore.form_styles === "GOOGLE_FORM"
                              ? "border-[.1rem] !border-t-[1.4rem]   border-[var(--border-color-input)] bg-color-section-theme rounded-2xl"
                              : ""
                  } relative w-full  m h-max p-[1.8rem_3rem] flex flex-col gap-[2rem]   break-words	   `}
            >
                  {(formCore?.form_avatar?.form_avatar_url || formCore?.form_avatar_state) && formCore.form_styles === "GOOGLE_FORM" && (
                        <FormAnswerAvatar formCore={formCore} />
                  )}
                  <div
                        style={{ marginTop: !formCore?.form_title?.form_title_value ? "0px" : "" }}
                        className={`${marginTopWhenImageAppear} flex flex-col gap-[3rem]`}
                  >
                        <div
                              style={{
                                    fontSize: `${
                                          formCore.form_title.form_title_size
                                                ? formCore.form_title.form_title_size / 10 + "rem"
                                                : formCore.form_setting_default.form_title_size_default / 10 + "rem"
                                    }`,
                                    color: `${
                                          formCore.form_title.form_title_color
                                                ? formCore.form_title.form_title_color
                                                : formCore.form_setting_default.form_title_color_default
                                    }`,
                                    fontStyle: `${
                                          formCore.form_title.form_title_style
                                                ? formCore.form_title.form_title_style
                                                : formCore.form_setting_default.form_title_style_default
                                    }`,
                                    wordBreak: "break-word",
                              }}
                              dangerouslySetInnerHTML={{ __html: formCore?.form_title?.form_title_value }}
                        ></div>

                        {formCore.form_title.form_title_sub.length > 0 && (
                              <div className="pt-[2rem] text-text-theme  border-t-[.1rem] border-[var(--border-color-input)] flex  flex-wrap gap-[4.6rem]">
                                    {formCore?.form_title?.form_title_sub.map((ft) => {
                                          if (ft.type === "Text" && ft?.core?.value)
                                                return (
                                                      <div
                                                            dangerouslySetInnerHTML={{ __html: ft?.core?.value }}
                                                            key={ft._id}
                                                            className={`${color} text-[1.4rem] text-justify leading-10 w-full`}
                                                      ></div>
                                                );
                                          if (ft.type === "Image") {
                                                if (formCore?.form_title?.form_title_mode_image !== checkMode) {
                                                      return (
                                                            <div className="mr-[2rem] flex gap-[2rem] justify-center" key={ft?._id}>
                                                                  <FormTitleImage mode="Normal" page={"Answer"} subTitleItem={ft} key={ft?._id} />
                                                            </div>
                                                      );
                                                }

                                                if (formCore?.form_title?.form_title_mode_image === "Slider" && !flag) {
                                                      flag = true;
                                                      const images = formCore?.form_title?.form_title_sub.filter(
                                                            (image) => image?.type === "Image" && image?.core?.url,
                                                      ) as FormCore.FormTitleSub.Image.Core[];
                                                      return (
                                                            <SliderImage
                                                                  colorMain={colorMain as string}
                                                                  page={"Answer"}
                                                                  type="Components"
                                                                  images={images}
                                                                  key={ft?._id}
                                                            />
                                                      );
                                                }
                                          }

                                          if (ft.type === "FullDescription" && (ft?.core?.header_value || ft?.core?.value)) {
                                                return (
                                                      <div className={`${color}  text-[1.4rem]  flex flex-col gap-[.1rem]  w-full`} key={ft?._id}>
                                                            {ft?.core?.header_value && <span className="font-bold">{ft?.core?.header_value}</span>}
                                                            {ft?.core?.value && <span>{ft?.core?.value}</span>}
                                                      </div>
                                                );
                                          }
                                    })}

                                    {inputFormRequire.length > 0 && (
                                          <span
                                                className={`text-red-600 text-[1.4rem] w-full pb-[2rem] ${
                                                      isGoogleForm ? "" : "border-b-[.1rem] border-b-[var(--border-color-input)]"
                                                }`}
                                          >
                                                * Biểu thị câu hỏi bắt buộc
                                          </span>
                                    )}
                              </div>
                        )}
                  </div>
            </header>
      );
};

export default HeaderFormAnswer;
