import { FormCore } from "@/type";
import Image from "next/image";
import React from "react";

type TProps = {
      formCore: FormCore.Form;
};

const FormAnswerAvatar = (props: TProps) => {
      const { formCore } = props;

      const styleEffect = {
            onCheckModeAvatar: (mode: FormCore.FormAvatarMode) => {
                  if (mode === "circle") return "rounded-full";
                  return "";
            },

            onCheckPositionAvatar: (position?: FormCore.FormAvatarPosition) => {
                  if (position === "left") return "left-[calc(25%-4rem)] ";
                  if (position === "center") return "left-[50%] translate-x-[-50%]";
                  return "right-[calc(25%-4rem)]";
            },

            onCheckPostionShowAvatar: (check: boolean) => {
                  if (!check) return "top-[50%] translate-x-[-50%] translate-y-[-50%] left-[50%]";
                  return "bottom-0 translate-y-[50%] left-[20%]";
            },
      };

      return (
            <div
                  className={`${styleEffect.onCheckPositionAvatar(
                        formCore?.form_avatar?.position,
                  )} absolute top-0 translate-y-[-50%] w-[45%] sm:w-[20rem] xl:w-[22%] aspect-square  flex justify-center`}
            >
                  <Image
                        src={formCore.form_avatar?.form_avatar_url || formCore.form_setting_default.form_avatar_default_url}
                        style={{ borderRadius: formCore?.form_avatar?.mode_shape === "circle" ? "999px" : "" }}
                        width={800}
                        height={160}
                        unoptimized={true}
                        alt="form background"
                        className={` w-[90%] h-[90%] aspect-square z-[2] shadow-xl`}
                  />
            </div>
      );
};

export default FormAnswerAvatar;
