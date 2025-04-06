import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import { Trash } from "lucide-react";
import React, { useContext, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch, useSelector } from "react-redux";
import ButtonPickerColor from "./ButtonPickerColor";

const ButtonDesignFormColor = () => {
      const dispatch = useDispatch();

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

      const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);

      const [openModelColor, setOpenModelColor] = useState<boolean>(false);

      const onChangeColor = (color: string) => {
            if (!isDesignForm) {
                  setIsDesginForm(true);
            }
            const newFormEdit = structuredClone(formCore);
            newFormEdit.form_color = color;

            dispatch(onFetchForm({ form: newFormEdit }));
      };
      const formBackground = !!formCore.form_background?.form_background_iamge_url || formCore.form_background_state;

      return (
            <div className="flex flex-col gap-[1.6rem]">
                  <div
                        //   disabled={!formBackground}
                        onClick={() => setOpenModelColor((prev) => !prev)}
                        className="relative flex items-center justify-between gap-[1rem] h-[4rem] hover:cursor-pointer"
                  >
                        <p className="">Màu nền </p>
                        <div className=" h-[3.2rem] flex items-center justify-center ">
                              <ButtonPickerColor defaultColor={formCore.form_color || ""} onChange={onChangeColor} />
                        </div>
                  </div>
                  <button className="flex items-center  justify-between gap-[2rem] " onClick={() => onChangeColor("#f2f2f2")}>
                        <p className="">Màu nền mặc định </p>
                        <div className=" h-[3.2rem] flex items-center justify-center ">
                              <ButtonPickerColor defaultColor={"#f2f2f2"} onChange={onChangeColor} disabled={true} />
                        </div>
                  </button>

                  <button className="flex items-center  justify-between gap-[2rem]" onClick={() => onChangeColor("")}>
                        <p className="">Xóa tất cả màu nền </p>

                        <div className="p-[.5rem] hover:bg-color-main hover:border-transparent border-[.1rem] border-[var(--border-color-input)] rounded-[.4rem]">
                              <Trash />
                        </div>
                  </button>
            </div>
      );
};

export default ButtonDesignFormColor;
