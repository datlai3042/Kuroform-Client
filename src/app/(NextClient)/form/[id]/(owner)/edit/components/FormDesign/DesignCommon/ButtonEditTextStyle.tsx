import { onEditForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore, InputCore } from "@/type";
import { Italic, RemoveFormatting } from "lucide-react";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypeEdit } from "./ButtonColor";
import { Form } from "react-hook-form";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";

type TProps = {
      typeEdit: TypeEdit;
      inputItem?: InputCore.InputForm;
};

const ButtonEditTextStyle = (props: TProps) => {
      const { typeEdit, inputItem } = props;

      const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);
      const { theme } = useContext(ThemeContext);

      const FormCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const colorMain = useSelector((state: RootState) => state.form.colorCore);

      const dispatch = useDispatch();
      const modeActive =
            typeEdit === "Form"
                  ? FormCore.form_title.form_title_style || FormCore.form_setting_default.form_title_style_default
                  : inputItem?.core.setting.input_style || FormCore.form_setting_default.input_style;
      const [styleCurrent, setStyleCurrent] = useState<"normal" | "italic">(modeActive);

      const styleEffect = {
            onCheckStyleActive: (active: boolean) => {
                  if (active) return "border-[var(--border-color-input)] ";
                  return "border-[var(--border-color-input)]";
            },
      };

      const onChangeStyleText = (style: FormCore.FormTextStyle) => {
            if (!isDesignForm) {
                  setIsDesginForm(true);
            }
            const newForm = structuredClone(FormCore);
            if (typeEdit === "Form") {
                  newForm.form_title.form_title_style = style;
            }

            if (typeEdit === "Common") {
                  newForm.form_setting_default.input_style = style as FormCore.FormTextStyle;
                  newForm.form_inputs = newForm.form_inputs.map((ip) => {
                        ip.core.setting.input_style = style;
                        return ip;
                  });
            }
            if (typeEdit === "Input") {
                  newForm.form_inputs = newForm.form_inputs.map((ip) => {
                        if (ip._id === inputItem?._id) {
                              ip.core.setting = { ...ip.core.setting, input_style: style as FormCore.FormTextStyle };
                              return ip;
                        }

                        return ip;
                  });
            }
            dispatch(onEditForm({ form: newForm }));
      };

      return (
            <div className=" max-h-[8rem] xl:h-[4rem]  flex flex-col xl:flex-row xl:items-center justify-between">
                  <div className="flex  gap-[1rem] ">
                        <button
                              onClick={() => {
                                    onChangeStyleText("normal");
                                    setStyleCurrent("normal");
                              }}
                              className={`${styleEffect.onCheckStyleActive(
                                    styleCurrent === "normal",
                              )} hover:border-transparent hover:bg-color-main  hover:text-[#fff] p-[.2rem_.8rem] border-[.1rem]  bg-color-section-theme rounded-lg`}
                        >
                              <RemoveFormatting />
                        </button>

                        <button
                              onClick={() => {
                                    onChangeStyleText("italic");
                                    setStyleCurrent("italic");
                              }}
                              className={`${styleEffect.onCheckStyleActive(styleCurrent === "italic")}
					)} hover:border-transparent  hover:text-[#fff] hover:bg-color-main p-[.2rem_.8rem] border-[.1rem]  bg-color-section-theme rounded-lg`}
                        >
                              <Italic  />
                        </button>
                  </div>
            </div>
      );
};

export default ButtonEditTextStyle;
