import { generateStyleBackgroundImageForm, renderValueUnit } from "@/app/utils/form.utils";
import { FormCore } from "@/type";
import Image from "next/image";
import React, { useEffect } from "react";
import FormAnswerAvatar from "./_avatar/FormAnswerAvatar";

type TProps = {
      formCore: FormCore.Form;
};

const FormAnswerHeader = (props: TProps) => {
      const { formCore } = props;

      const colorMain = formCore?.form_title?.form_title_color || formCore.form_setting_default.form_title_color_default;

      const formBackgroundImageUrl = formCore.form_background?.form_background_iamge_url || formCore.form_setting_default.form_background_default_url;
      const formBackgroundPosition = formCore.form_background?.position;

      const formBackgroundSize = formCore.form_background?.mode_show;

      const myBackgroundStyle = generateStyleBackgroundImageForm({ formCore, mode: "answer" });
      const isGoogleForm = formCore.form_styles === "GOOGLE_FORM" ? true : false;
      const heightBg = formCore.form_background?.size.height?.value ? true : false;
      console.log({
            heightBg: heightBg
                  ? renderValueUnit(
                          formCore.form_background?.size.height?.value as number,
                          formCore.form_background?.size.height?.unit as FormCore.FormImageUnit,
                    )
                  : 150,
      });
      return (
            <div
                  style={{
                        height: heightBg
                              ? renderValueUnit(
                                      formCore.form_background?.size.height?.value as number,
                                      formCore.form_background?.size.height?.unit as FormCore.FormImageUnit,
                                )
                              : 150,
                        minHeight: 150,
                  }}
                  className={`${isGoogleForm ? " h-[32.5rem] rounded-[.8rem] max-h-[32.5rem]" : "w-full"} relative w-full `}
            >
                  {(formCore.form_background?.form_background_iamge_url || formCore.form_background_state) && (
                        // <div className="absolute top-[50%] translate-x-[-50%] mx-auto">
                        <div
                              style={{ backgroundColor: formCore.form_background?.backgroundColor || "#fff" }}
                              className={`${isGoogleForm ? "rounded-[.8rem] overflow-hidden" : ""} w-full h-full  relative `}
                        >
                              <Image
                                    style={myBackgroundStyle.style_background}
                                    src={formBackgroundImageUrl}
                                    width={800}
                                    height={160}
                                    quality={100}
                                    alt="form background"
                                    className={`${isGoogleForm ? "rounded-lg" : ""} w-full h-full   absolute `}
                              />
                        </div>
                        // </div>
                  )}

                  {(formCore?.form_avatar?.form_avatar_url || formCore?.form_avatar_state) && formCore.form_styles !== "GOOGLE_FORM" && (
                        <FormAnswerAvatar formCore={formCore} />
                  )}

                  {!formCore.form_background?.form_background_iamge_url && !formCore.form_background_state && (
                        <div style={{ backgroundColor: colorMain }} className="w-full  h-full rounded-lg opacity-90"></div>
                  )}
            </div>
      );
};

export default FormAnswerHeader;
