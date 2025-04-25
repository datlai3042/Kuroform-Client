import { AlignCenter, AlignLeft, AlignRight, Circle, Square } from "lucide-react";
import React, { useContext, useState } from "react";
import { TypeEdit } from "./ButtonColor";
import { FormCore, InputCore } from "@/type";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onEditForm } from "@/app/_lib/redux/formEdit.slice";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import { Select } from "antd";

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
            <div className=" flex flex-col  gap-[1rem]">
                  <div className="flex flex-col gap-[.4rem]">
                        <span className="text-end">Vị trí</span>
                        <Select
                              disabled={!formAvatar}

                              placeholder="Vị trí"
                              className="customSelect"
                              defaultValue="left"
                              style={{ width: 180 }}
                              onChange={(value: FormCore.FormAvatarPosition) => {
                                    onChangeAvatarPosition(value);
                                    setPositionAvatar(value);
                              }}
                              options={[
                                    { value: "left", label: "Bên trái" },
                                    { value: "center", label: "Chánh giữa" },
                                    { value: "right", label: "Bên phải" },
                              ]}
                        />
                  </div>
                  <div className="flex flex-col gap-[.4rem]">
                        <span className="text-end">Hình dáng</span>
                        <Select
                              disabled={!formAvatar}

                              placeholder="Hình dáng"
                              className="customSelect"
                              defaultValue="circle"
                              style={{ width: 180 }}
                              onChange={(value: FormCore.FormAvatarMode) => {
                                    onChangeAvatarMode(value);
                                    setModeCurrent(value);
                              }}
                              options={[
                                    { value: "circle", label: "Hình tròn" },
                                    { value: "square", label: "Hình vuông" },
                              ]}
                        />
                  </div>
             
            </div>
      );
};

export default ButtonDesignAvatar;
