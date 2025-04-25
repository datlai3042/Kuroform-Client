import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import SelectColor from "@/app/(NextClient)/_components/ui/SelectColor";
import { Circle } from "lucide-react";

export type TypeEdit = "Form" | "Common" | "Input" | "ButtonSubmitBackground" | "ButtonSubmitColor";
type TProps = {
      typeEdit: TypeEdit;
};

const selectColorWithMode = (type: TypeEdit, formCore: FormCore.Form) => {
      let color = "";
      switch (type) {
            case "Form":
                  color = formCore.form_title.form_title_color
                        ? formCore.form_title.form_title_color
                        : (formCore.form_setting_default.form_title_color_default as string);
                  return color;

            case "Common":
                  color = formCore.form_setting_default.input_color;
                  return color;

            case "Input":
                  color = formCore.form_setting_default.input_color;
                  return color;
            case "ButtonSubmitBackground":
                  color = formCore.form_button_background;
                  return color;

            case "ButtonSubmitColor":
                  color = formCore.form_button_color;
                  return color;
            default:
                  break;
      }
};

const ButtonColor = (props: TProps) => {
      const { typeEdit } = props;

      const [openColorModel, setOpenColorModel] = useState<boolean>(false);
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
      let color = useMemo(() => selectColorWithMode(typeEdit, formCore), [formCore, typeEdit]);

      return (
            <div className="relative max-h-[20rem]   flex  flex-col   xl:items-center justify-between gap-[1.6rem]">
                  {<SelectColor setOpenColorModel={setOpenColorModel} typeEdit={typeEdit} />}

                  {/* <p className="flex gap-[1rem]">
                        <Circle className="text-color-main min-w-max" />
                        <span className="text-justify text-[1.2rem] opacity-55">Lưu ý: Khi ở Dark mode. Vui lòng nhấn xem trước để xem thay đổi</span>
                  </p> */}
            </div>
      );
};

export default ButtonColor;
