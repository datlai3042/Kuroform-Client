import { RootState } from "@/app/_lib/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import ButtonDesignAvatar from "./DesignCommon/ButtonDesignAvatar";
import UploadNone from "@/app/(NextClient)/_components/ui/loading/UploadNone";

const FormDesignAvatar = () => {
      const formCore = useSelector((state: RootState) => state.form.formCoreBackUp);

      const formAvatar = !!formCore?.form_avatar?.form_avatar_url || formCore?.form_avatar_state || false;

      const styleEffect = {
            onCheckHasBackground: (check: boolean) => {
                  if (check) return "bg-transparent";
                  return "opacity-40 cursor-not-allowed";
            },
      };
      const isAvatarDefault = formCore.form_avatar_state && !formCore.form_avatar?.form_avatar_url;

      return (
            <div
                  className={`${styleEffect.onCheckHasBackground(
                        formAvatar,
                  )} flex flex-col gap-[2.6rem] p-[1rem_2rem] border-t-[.1rem] border-[var(--border-color-input)] pt-[2rem] `}
            >
                  <p className="font-medium flex flex-col gap-[.6rem]">
                        <span>Tùy chỉnh Avatar</span>
                        {!formAvatar ? (
                              <p className="flex gap-[.4rem]">
                                    <UploadNone />
                                    {isAvatarDefault && <span>- ảnh mặc định</span>}
                              </p>
                        ) : (
                              ""
                        )}
                  </p>
                  <ButtonDesignAvatar />
            </div>
      );
};

export default FormDesignAvatar;
