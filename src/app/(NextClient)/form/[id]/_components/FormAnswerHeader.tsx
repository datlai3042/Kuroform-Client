import { generateStyleBackgroundImageForm } from "@/app/utils/form.utils";
import { FormCore } from "@/type";
import Image from "next/image";
import React, { useEffect } from "react";

type TProps = {
      formCore: FormCore.Form;
};

const FormAnswerHeader = (props: TProps) => {
      const { formCore } = props;

      const colorMain = formCore?.form_title?.form_title_color || formCore.form_setting_default.form_title_color_default;

      const formBackgroundImageUrl = formCore.form_background?.form_background_iamge_url || formCore.form_setting_default.form_background_default_url;
      const formBackgroundPosition = formCore.form_background?.position;

      const formBackgroundSize = formCore.form_background?.mode_show;

      const paddingX = formCore.form_background?.padding.x || 0;
      const paddingY = formCore.form_background?.padding.y || 0;
      const padding = `${paddingY}% ${paddingX}%`;

      const myBackgroundStyle = generateStyleBackgroundImageForm({ formCore, mode: "answer" });

      return (
            <div className="relative w-full h-[32.5rem] rounded-2xl max-h-[32.5rem] ">
                  {(formCore.form_background?.form_background_iamge_url || formCore.form_background_state) && (
                        // <div className="absolute top-[50%] translate-x-[-50%] mx-auto">
                        <div
                              style={{ backgroundColor: formCore.form_background?.backgroundColor || "", padding }}
                              className="w-full h-full rounded-2xl relative overflow-hidden"
                        >
                              <Image
                                    style={myBackgroundStyle.style_background}
                                    src={formBackgroundImageUrl}
                                    width={800}
                                    height={160}
                                    quality={100}
                                    alt="form background"
                                    className="w-full h-full min-h-[32.5rem] max-h-[32.5rem]  rounded-lg absolute"
                              />
                        </div>
                        // </div>
                  )}

                  {!formCore.form_background?.form_background_iamge_url && !formCore.form_background_state && (
                        <div style={{ backgroundColor: colorMain }} className="w-full  h-full rounded-lg opacity-90"></div>
                  )}
            </div>
      );
};

export default FormAnswerHeader;
