import ModelFormImage from "@/app/(NextClient)/_components/Model/ModelFormImage";
import { FormCore } from "@/type";
import { RootState } from "@/app/_lib/redux/store";

import { generateStyleAvatarForm, renderUnitHeightValueBg, renderUnitWidthValueBg } from "@/app/utils/form.utils";

import Image from "next/image";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";

type TProps = {
      action?: "thumb";
};

const FormAvatar = (props: TProps) => {
      const { action } = props;

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
      const { openFormDesign } = useContext(FormDesignContext);

      const [openModel, setOpenModel] = useState<boolean>(false);

      const onControllModel = () => {
            setOpenModel((prev) => !prev);
      };

      const { position, shape } = generateStyleAvatarForm({
            formCore,
      });

      const _checkAvatar = formCore.form_background_state || formCore.form_background?.form_background_iamge_url;
      const _checkBackground = formCore.form_background_state || formCore.form_background?.form_background_iamge_url;

      const _backgroundHeight = formCore.form_background?.size?.height ? (_checkBackground ? formCore.form_background?.size?.height : "100%") : 200;

      return (
            <React.Fragment>
                  <div
                        style={
                              formCore.form_background_state || formCore.form_background?.form_background_iamge_url
                                    ? {
                                            ...renderUnitHeightValueBg(formCore.form_background),
                                            ...renderUnitWidthValueBg(formCore.form_background),
                                      }
                                    : {}
                        }
                        className={`
   ${openFormDesign ? " " : ""}
 ${_checkAvatar ? " " : ""}
  ${_checkBackground ? (formCore?.screen === "profile" ? "min-h-[35rem]" : "min-h-[20rem]") : ""}
  w-full xl:max-w-[70rem] mx-auto  relative flex items-end h-[14rem]`}
                  >
                        <div className="absolute h-max w-full bottom-0 flex justify-center">
                              <div className="relative w-full ">
                                    <Image
                                          width={150}
                                          height={150}
                                          src={formCore.form_avatar?.form_avatar_url || formCore.form_setting_default.form_avatar_default_url}
                                          quality={100}
                                          onClick={onControllModel}
                                          alt="avatar"
                                          className={`${action !== "thumb" ? position : ""} ${
                                                action !== "thumb" ? shape : ""
                                          }  absolute top-[0] translate-y-[-50%] z-[3] object-center w-[12rem] h-[12rem] hover:cursor-pointer `}
                                    />

                                    {/* {(!formCore.form_background?.form_background_iamge_url || !formCore.form_background_state) && (
                                          <div className="absolute left-0 right-0 h-[.4rem] bg-blue-400 z-[2] top-[50%] translate-y-[-50%]"></div>
                                    )} */}
                              </div>
                        </div>
                        {openModel && <ModelFormImage setOpenModel={setOpenModel} MODE="AVATAR" />}
                  </div>
            </React.Fragment>
      );
};

export default FormAvatar;
