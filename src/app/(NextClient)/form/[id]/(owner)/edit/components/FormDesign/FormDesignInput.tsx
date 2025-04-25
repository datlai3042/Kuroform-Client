import { RootState } from "@/app/_lib/redux/store";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormBackground from "../FormBackground";
import ButtonChangeModeBackground from "./ButtonChangeModeBackground";
import ButtonUploadFile from "./ButtonUploadFile";
import ButtonBackgroundColor from "./DesignCommon/ButtonBackgroundColor";
import ButtonBackgroundObject from "./DesignCommon/ButtonBackgroundObject";
import ButtonBackgroundSize from "./DesignCommon/ButtonBackgroundSize";
import ButtonPickerColor from "./DesignCommon/ButtonPickerColor";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { useDebouncedCallback } from "@mantine/hooks";
type TypeDesignBackground = "type" | "size" | "color";
const FormDesignInput = () => {
      const formCore = useSelector((state: RootState) => state.form.formCoreBackUp);
      const borderColor = formCore.form_input_styles.borderColor || "";
      const color = formCore.form_input_styles.color || "";
      const borderWidth = formCore.form_input_styles.borderWidth || 1;
      const borderRadius = formCore.form_input_styles.radius || 4;

      const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);

      const onChangeBorderWidth = (width: number, type: "RADIUS" | "BORDER") => {
            if (!isDesignForm) {
                  setIsDesginForm(true);
            }

            const newFormEdit = structuredClone(formCore);
            if (type === "BORDER") {
                  newFormEdit.form_input_styles.borderWidth = width;
            } else {
                  newFormEdit.form_input_styles.radius = width;
            }

            dispatch(onFetchForm({ form: newFormEdit }));
      };

      const dispatch = useDispatch();
      const debounced = useDebouncedCallback((width: number, type: "RADIUS" | "BORDER") => onChangeBorderWidth(width, type), 0);

      const onChangeColor = (mode: "BORDER" | "COLOR", color: string) => {
            if (!isDesignForm) {
                  setIsDesginForm(true);
            }

            const newFormEdit = structuredClone(formCore);
            if (mode === "BORDER") {
                  newFormEdit.form_input_styles.borderColor = color;
            } else {
                  newFormEdit.form_input_styles.color = color;
            }
            dispatch(onFetchForm({ form: newFormEdit }));
      };
      return (
            <>
                  <div className="flex flex-col gap-[1.6rem]">
                        <div className="flex flex-wrap justify-between gap-[1rem] h-[6rem]">
                              <div className="flex-1 flex flex-col gap-[.6rem]">
                                    <span>Border Width</span>
                                    <div
                                          className={`  flex items-center gap-[.4rem] h-full p-[.2rem_1rem]
border-[.1rem]   rounded-lg bg-design-size`}
                                    >
                                          <input
                                                value={borderWidth}
                                                type="number"
                                                className={` w-[80%] disabled:cursor-not-allowed  bg-design-size `}
                                                onChange={(e) => debounced(+e.target.value, "BORDER")}
                                          />

                                          <span className="opacity-75 text-text-theme">px</span>
                                    </div>
                              </div>
                              <div className="flex-1 flex flex-col gap-[.6rem]">
                                    <span>Border Radius</span>
                                    <div
                                          className={`  flex items-center gap-[.4rem] h-full p-[.2rem_1rem]
border-[.1rem]   rounded-lg bg-design-size`}
                                    >
                                          <input
                                                value={borderRadius}
                                                type="number"
                                                className={` w-[80%] disabled:cursor-not-allowed  bg-design-size `}
                                                onChange={(e) => debounced(+e.target.value, "RADIUS")}
                                          />

                                          <span className="opacity-75 text-text-theme">px</span>
                                    </div>
                              </div>
                        </div>

                        <div className="flex flex-wrap justify-between gap-[1rem] ">
                              <div className="flex-1 flex flex-col gap-[.6rem]">
                                    <span>Border Color</span>
                                    <div className="p-[.4rem_1rem] gap-[1rem] rounded-[.4rem]   flex justify-center items-center border-[.1rem] border-[var(--border-color-input)]">
                                          <span>{borderColor || "Mặc định"}</span>
                                          <ButtonPickerColor defaultColor={borderColor} onChange={(color) => onChangeColor("BORDER", color)} />
                                    </div>
                              </div>
                              <div className="flex-1 flex flex-col gap-[.6rem]">
                                    <span>Text Color</span>
                                    <div className="p-[.4rem_1rem] gap-[1rem] rounded-[.4rem]   flex justify-center items-center border-[.1rem] border-[var(--border-color-input)]">
                                          <span>{color || "Mặc định"}</span>
                                          <ButtonPickerColor defaultColor={color} onChange={(color) => onChangeColor("COLOR", color)} />
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default FormDesignInput;
