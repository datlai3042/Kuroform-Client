import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import { Col, ColorPicker, ColorPickerProps, Divider, Row, theme } from "antd";
import React, { useContext, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch, useSelector } from "react-redux";
import ButtonPickerColor from "./ButtonPickerColor";
import { Circle } from "lucide-react";

const ButtonBackgroundColor = () => {
      const dispatch = useDispatch();

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

      const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);

      const [openModelColor, setOpenModelColor] = useState<boolean>(false);

      const onChangeColor = (color: string) => {
            if (!isDesignForm) {
                  setIsDesginForm(true);
            }
            const newFormEdit = structuredClone(formCore);
            newFormEdit.form_background!.backgroundColor = color;

            dispatch(onFetchForm({ form: newFormEdit }));
      };
      const formBackground = !!formCore.form_background?.form_background_iamge_url || formCore.form_background_state;

      return (
            <div className="flex flex-col gap-[1rem] mt-[1rem]">
                  <button
                        disabled={!formBackground}
                        onClick={() => setOpenModelColor((prev) => !prev)}
                        className="relative flex items-center gap-[.8rem] h-[3rem]"
                  >
                        <p>Màu nền: </p>
                        <div className="flex items-center justify-center ">
                              <ButtonPickerColor onChange={onChangeColor} defaultColor={formCore.form_background?.backgroundColor || ""} />
                        </div>
                  </button>
                  <p className="flex gap-[1rem] text-[1.2rem] opacity-55 mt-[1rem]">
                        <Circle className="text-color-main min-w-max"/>
                        <span className="text-justify">Khi hình ảnh quá nhỏ thì màu nền sẽ phủ tiếp cho bức ảnh, còn bức ảnh vừa thì màu nền sẽ không hiển thị</span>
                  </p>
            </div>
      );
};

export default ButtonBackgroundColor;
