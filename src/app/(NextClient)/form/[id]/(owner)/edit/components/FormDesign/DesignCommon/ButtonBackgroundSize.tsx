import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import { onEditForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { checkRenderUnitValue, renderFormUnit } from "@/app/utils/form.utils";
import { FormCore } from "@/type";
import { useDebouncedCallback } from "@mantine/hooks";
import { theme } from "antd";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonSelectUnit from "../ButtonSelectUnit";

const ButtonBackgroundSize = () => {
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const colorMain = useSelector((state: RootState) => state.form.colorCore);
      const dispatch = useDispatch();

      const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);
      const { theme } = useContext(ThemeContext);

      const debounced = useDebouncedCallback((position: number, type: "width" | "height") => onChangePosition(position, type), 0);
      const formBackground = !!formCore.form_background?.form_background_iamge_url || formCore.form_background_state;

      const styleEffect = {
            onCheckHasBackground: (check: boolean) => {
                  if (check) return "hover:cursor-pointer";
                  return "hover:cursor-not-allowed";
            },
      };
      const width = checkRenderUnitValue(formCore.form_background?.size?.width, 100);
      const height = checkRenderUnitValue(formCore.form_background?.size?.height, 100);

      const onChangePosition = useDebouncedCallback((size: number, type: "width" | "height") => {
            const formClone = structuredClone(formCore);
            const newForm: FormCore.Form = {
                  ...formClone,
                  form_background: {
                        ...formClone.form_background,
                        size: {
                              ...formClone.form_background?.size,
                              [type]: {
                                    value: size,
                                    unit: formClone.form_background?.size[type]?.unit || "AUTO",
                              },
                        },
                  } as FormCore.Form["form_background"],
            };
            if (!isDesignForm) {
                  setIsDesginForm(true);
            }
            dispatch(onEditForm({ form: newForm }));
      }, 20);

      const onChangeUnit = useDebouncedCallback((type: "width" | "height", value: FormCore.FormImageUnit) => {
            const formClone = structuredClone(formCore);
            const newForm: FormCore.Form = {
                  ...formClone,
                  form_background: {
                        ...formClone.form_background,
                        size: {
                              ...formClone.form_background?.size,
                              [type]: {
                                    value: formClone.form_background?.size[type]?.value || 100,
                                    unit: value,
                              },
                        },
                  } as FormCore.Form["form_background"],
            };

            if (!isDesignForm) {
                  setIsDesginForm(true);
            }
            dispatch(onEditForm({ form: newForm }));
      }, 20);
      return (
            <div className=" flex  gap-[1rem]">
                  <div className="flex w-[50%] flex-col gap-[.5rem] ">
                        <span className="">Chiều dài</span>
                        <div
                              className={`${styleEffect.onCheckHasBackground(formBackground)} w-[90%] flex items-center gap-[.4rem] h-[3rem] p-[.2rem_1rem]
border-[.1rem] border-[var(--border-color-input)]  rounded-lg bg-design-size`}
                        >
                              <input
                                    disabled={!formBackground}
                                    value={width}
                                    type="number"
                                    // min={0}
                                    className={` w-[80%] disabled:cursor-not-allowed bg-design-size `}
                                    onChange={(e) => debounced(+e.target.value, "width")}
                              />
                              <ButtonSelectUnit
                                    placeholder="Chiều rộng"
                                    defaultValue={renderFormUnit(formCore.form_background?.size?.width)}
                                    onChangeUnit={(value) => {
                                          onChangeUnit("width", value);
                                    }}
                              />
                        </div>
                  </div>
                  <div className="flex w-[50%] flex-col gap-[.5rem] ">
                        <span className="">Chiều rộng</span>
                        <div
                              className={`${styleEffect.onCheckHasBackground(formBackground)} w-[90%] flex items-center gap-[.4rem] h-[3rem] p-[.2rem_1rem]
border-[.1rem] border-[var(--border-color-input)]  rounded-lg bg-design-size`}
                        >
                              <input
                                    disabled={!formBackground}
                                    value={height}
                                    type="number"
                                    // min={0}
                                    className={` w-[80%] disabled:cursor-not-allowed bg-design-size `}
                                    onChange={(e) => debounced(+e.target.value, "height")}
                              />
                              <ButtonSelectUnit
                                    placeholder="Chiều dài"
                                    defaultValue={renderFormUnit(formCore.form_background?.size?.height)}
                                    onChangeUnit={(value) => {
                                          onChangeUnit("height", value);
                                    }}
                              />
                        </div>
                  </div>
            </div>
      );
};

export default ButtonBackgroundSize;
