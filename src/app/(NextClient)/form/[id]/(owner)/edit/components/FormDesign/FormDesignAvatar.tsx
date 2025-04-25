import { RootState } from "@/app/_lib/redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ButtonDesignAvatar from "./DesignCommon/ButtonDesignAvatar";
import UploadNone from "@/app/(NextClient)/_components/ui/loading/UploadNone";
import ButtonUploadFile from "./ButtonUploadFile";
import FormAvatar from "../FormAvatar";
import ModelFormImage from "@/app/(NextClient)/_components/Model/ModelFormImage";
import Image from "next/image";

const FormDesignAvatar = () => {
      const formCore = useSelector((state: RootState) => state.form.formCoreBackUp);
      const [openModel, setOpenModel] = useState<boolean>(false);

      const formAvatar = !!formCore?.form_avatar?.form_avatar_url || !!formCore?.form_avatar_state || false;
      const styleEffect = {
            onCheckHasBackground: (check: boolean) => {
                  if (check) return "bg-transparent";
                  return "opacity-40 cursor-not-allowed";
            },
      };
      const isAvatarDefault = formCore.form_avatar_state && !formCore.form_avatar?.form_avatar_url;
      const onControllModel = () => {
            setOpenModel((prev) => !prev);
      };
      return (
            <>
                  {formAvatar ? (
                        <div className="w-full flex flex-col gap-[1.6rem] ">
                              <div className="flex gap-[1.2rem] mt-[1.6rem]">
                                    <div className=" relative">
                                          <Image
                                                width={150}
                                                height={150}
                                                src={formCore.form_avatar?.form_avatar_url || formCore.form_setting_default.form_avatar_default_url}
                                                quality={100}
                                                onClick={onControllModel}
                                                alt="avatar"
                                                className={`min-w-[7rem] w-[7rem] h-[12rem] cursor-pointer object-cover`}
                                          />
                                    </div>
                                    <div className=" flex flex-col gap-[.8rem]">
                                          <div className={`${styleEffect.onCheckHasBackground(formAvatar)} flex flex-col gap-[0.6rem]  `}>
                                                {/* <p className="font-medium flex flex-col gap-[.6rem]">
                                    <span>Tùy chỉnh Avatar</span>
                                    {!formAvatar ? (
                                          <p className="flex gap-[.4rem]">
                                                <UploadNone />
                                                {isAvatarDefault && <span>- ảnh mặc định</span>}
                                          </p>
                                    ) : (
                                          ""
                                    )}
                              </p> */}
                                                <ButtonDesignAvatar />
                                          </div>
                                    </div>
                              </div>
                        </div>
                  ) : (
                        <ButtonUploadFile code="AVATAR" />
                  )}

                  {openModel && <ModelFormImage setOpenModel={setOpenModel} MODE="AVATAR" />}
            </>
      );
};

export default FormDesignAvatar;
