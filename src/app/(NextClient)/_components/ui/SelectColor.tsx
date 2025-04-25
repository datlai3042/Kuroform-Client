import { FormCore, InputCore, ReactCustom } from "@/type";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import DivNativeRef from "./NativeHtml/DivNativeRef";
import { useDispatch, useSelector } from "react-redux";
import { onEditForm, onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormDesignContext } from "../provider/FormDesignProvider";
import { TypeEdit } from "../../form/[id]/(owner)/edit/components/FormDesign/DesignCommon/ButtonColor";
import ButtonPickerColor from "../../form/[id]/(owner)/edit/components/FormDesign/DesignCommon/ButtonPickerColor";

type TProps = {
      setOpenColorModel: ReactCustom.SetStateBoolean;

      typeEdit: TypeEdit;
      inputItem?: InputCore.InputForm;
};

const SelectColor = (props: TProps) => {
      const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);

      const { inputItem, typeEdit, setOpenColorModel } = props;
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

      const divColorRef = useRef<HTMLDivElement | null>(null);

      const [defaultColor, setDefaultColor] = useState("");
      const dispatch = useDispatch();

      const globalClick = useCallback(
            (e: MouseEvent) => {
                  if (divColorRef.current && !divColorRef.current.contains(e.target as Node)) {
                        setOpenColorModel(false);
                  }
            },
            [setOpenColorModel],
      );

      const onChangeColor = (color: string) => {
            if (!isDesignForm) {
                  setIsDesginForm(true);
            }
            const newFormEdit = structuredClone(formCore);
            if (typeEdit === "Form") {
                  newFormEdit.form_title.form_title_color = color;
            }

            if (typeEdit === "Common") {
                  newFormEdit.form_setting_default.input_color = color;
                  newFormEdit.form_inputs = newFormEdit.form_inputs.map((ip) => {
                        ip.core.setting.input_color = color;
                        return ip;
                  });
            }

            if (typeEdit === "Input") {
                  newFormEdit.form_inputs = newFormEdit.form_inputs.map((ip) => {
                        if (ip._id === inputItem?._id) {
                              ip.core.setting = {
                                    ...(ip.core.setting as InputCore.Setting.InputSettingTextCommon),
                                    input_color: color,
                              };
                              return ip;
                        }
                        return ip;
                  });
            }

            if (typeEdit === "ButtonSubmitBackground") {
                  newFormEdit.form_button_background = color;
            }
            if (typeEdit === "ButtonSubmitColor") {
                  newFormEdit.form_button_color = color;
            }
            dispatch(onEditForm({ form: newFormEdit }));
      };

      useEffect(() => {
            document.addEventListener("click", globalClick);

            return () => {
                  document.removeEventListener("click", globalClick);
            };
      }, [globalClick]);

      useEffect(() => {
            let defaultColor = formCore.form_title.form_title_color;
            switch (typeEdit) {
                  case "Form":
                        defaultColor = formCore.form_title.form_title_color
                              ? formCore.form_title.form_title_color
                              : (formCore.form_setting_default.form_title_color_default as string);

                  case "Common":
                        defaultColor = formCore.form_setting_default.input_color;

                  case "Input":
                        defaultColor = formCore.form_setting_default.input_color;
                  case "ButtonSubmitBackground":
                        defaultColor = formCore.form_button_background;

                  case "ButtonSubmitColor":
                        defaultColor = formCore.form_button_color;
                  default:
                        break;
            }
            setDefaultColor(defaultColor as string);
      }, [formCore]);
      return (
            <DivNativeRef
                  ref={divColorRef}
                  className="w-full flex items-center gap-[1rem]   "
                  onBlur={() => setOpenColorModel(false)}
                  onClick={(e) => e.stopPropagation()}
            >
                  {/* <span>Màu chữ: </span> */}
                  <ButtonPickerColor defaultColor={defaultColor as string} onChange={onChangeColor} />
            </DivNativeRef>
      );
};

export default SelectColor;
