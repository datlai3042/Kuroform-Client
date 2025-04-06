import { AlignCenter, AlignLeft, AlignRight, Circle, Square } from "lucide-react";
import React, { useContext, useState } from "react";
import { TypeEdit } from "./ButtonColor";
import { FormCore, InputCore } from "@/type";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onEditForm } from "@/app/_lib/redux/formEdit.slice";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";

type TProps = {};

const ButtonDesignAvatar = (props: TProps) => {
      const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);
      const { theme } = useContext(ThemeContext);

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const formAvatar = !!formCore.form_avatar?.form_avatar_url || formCore.form_avatar_state;
      const colorMain = useSelector((state: RootState) => state.form.colorCore);

      const dispatch = useDispatch();
      const [modeCurrent, setModeCurrent] = useState<FormCore.FormAvatarMode>(
            formCore.form_avatar?.mode_shape || formCore.form_setting_default.form_avatar_default_mode,
      );

      const [positionAvatar, setPositionAvatar] = useState<FormCore.FormAvatarPosition>(
            formCore.form_avatar?.position || formCore.form_setting_default.form_avatar_default_postion,
      );
      const styleEffect = {
            onCheckStyleActive: (active: boolean) => {
                  if (active) return " border-transparent border-[.1rem] bg-color-main text-[#fff]";
                  return "border-[var(--border-color-input)] border-[.1rem] hover:bg-color-main hover:border-transparent text-[#fff]";
            },
      };

      const onChangeAvatarMode = (value: FormCore.FormAvatarMode) => {
            if (!isDesignForm) {
                  setIsDesginForm(true);
            }
            const formClone = structuredClone(formCore);
            const newForm = {
                  ...formClone,
                  form_avatar: {
                        ...formClone.form_avatar,
                        mode_shape: value,
                  },
            } as FormCore.Form;

            dispatch(onEditForm({ form: newForm }));
      };

      const onChangeAvatarPosition = (value: FormCore.FormAvatarPosition) => {
            if (!isDesignForm) {
                  setIsDesginForm(true);
            }
            const formClone = structuredClone(formCore);
            const newForm = {
                  ...formClone,
                  form_avatar: {
                        ...formClone.form_avatar,

                        position: value,
                  },
            } as FormCore.Form;

            dispatch(onEditForm({ form: newForm }));
      };

      return (
            <div className="px-[2rem] flex flex-col  gap-[2rem]">
                  <div className="flex gap-[4rem] border-b-[.1rem] border-[var(--border-color-input)] pb-[2rem] ">
                        <button
                              disabled={!formAvatar}
                              onClick={() => {
                                    onChangeAvatarPosition("left");
                                    setPositionAvatar("left");
                              }}
                              className={`${styleEffect.onCheckStyleActive(
                                    positionAvatar === "left",
                              )} w-[3.6rem] h-[3.6rem] disabled:cursor-not-allowed flex items-center justify-center     rounded-full  `}
                        >
                              <AlignLeft size={18} style={{ color: theme === "light" ? colorMain : "#fff" }} />
                        </button>

                        <button
                              disabled={!formAvatar}
                              onClick={() => {
                                    onChangeAvatarPosition("center");
                                    setPositionAvatar("center");
                              }}
                              className={`${styleEffect.onCheckStyleActive(
                                    positionAvatar === "center",
                              )} w-[3.6rem] h-[3.6rem] disabled:cursor-not-allowed flex items-center justify-center      rounded-full  `}
                        >
                              <AlignCenter size={18} style={{ color: theme === "light" ? colorMain : "#fff" }} />
                        </button>
                        <button
                              disabled={!formAvatar}
                              onClick={() => {
                                    onChangeAvatarPosition("right");
                                    setPositionAvatar("right");
                              }}
                              className={`${styleEffect.onCheckStyleActive(
                                    positionAvatar === "right",
                              )} w-[3.6rem] h-[3.6rem] disabled:cursor-not-allowed flex items-center justify-center    rounded-full  `}
                        >
                              <AlignRight size={18} style={{ color: theme === "light" ? colorMain : "#fff" }} />
                        </button>
                  </div>

                  <div className="flex  gap-[4rem] justify-center ">
                        <button
                              disabled={!formAvatar}
                              onClick={() => {
                                    onChangeAvatarMode("circle");
                                    setModeCurrent("circle");
                              }}
                              className={`${styleEffect.onCheckStyleActive(
                                    modeCurrent === "circle",
                              )} w-[3.6rem] h-[3.6rem] disabled:cursor-not-allowed flex items-center justify-center     rounded-full  `}
                        >
                              <Circle size={18} style={{ color: theme === "light" ? colorMain : "#fff" }} />
                        </button>
                        <button
                              disabled={!formAvatar}
                              onClick={() => {
                                    onChangeAvatarMode("square");
                                    setModeCurrent("square");
                              }}
                              className={`${styleEffect.onCheckStyleActive(
                                    modeCurrent === "square",
                              )} w-[3.6rem] h-[3.6rem] disabled:cursor-not-allowed flex items-center justify-center     rounded-full  `}
                        >
                              <Square size={18} style={{ color: theme === "light" ? colorMain : "#fff" }} />
                        </button>
                  </div>
            </div>
      );
};

export default ButtonDesignAvatar;
