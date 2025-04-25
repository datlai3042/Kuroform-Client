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
import { Settings } from "lucide-react";

const ButtonBackgroundObject = () => {
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const colorMain = useSelector((state: RootState) => state.form.colorCore);
      const dispatch = useDispatch();

      const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);
      const { theme } = useContext(ThemeContext);

      const debounced = useDebouncedCallback((position: number, type: "x" | "y") => onChangePosition(position, type), 0);

      const formBackground = !!formCore.form_background?.form_background_iamge_url || formCore.form_background_state;

      const styleEffect = {
            onCheckHasBackground: (check: boolean) => {
                  if (check) return "hover:cursor-pointer";
                  return "hover:cursor-not-allowed";
            },
      };

      const objectX = checkRenderUnitValue(formCore.form_background?.object.x, 100);
      const objectY = checkRenderUnitValue(formCore.form_background?.object.y, 100);
      const onChangePosition = useDebouncedCallback((object: number, type: "x" | "y") => {
            const formClone = structuredClone(formCore);
            const newForm: FormCore.Form = {
                  ...formClone,
                  form_background: {
                        ...formClone.form_background,
                        object: {
                              ...formClone.form_background?.object,
                              [type]: {
                                    value: object,
                                    unit: formClone.form_background?.object[type]?.unit || "AUTO",
                              },
                        },
                  } as FormCore.Form["form_background"],
            };

            if (!isDesignForm) {
                  setIsDesginForm(true);
            }
            dispatch(onEditForm({ form: newForm }));
      }, 20);

      const onChangeUnit = useDebouncedCallback((type: "x" | "y", value: FormCore.FormImageUnit) => {
            const formClone = structuredClone(formCore);
            const newForm: FormCore.Form = {
                  ...formClone,
                  form_background: {
                        ...formClone.form_background,
                        object: {
                              ...formClone.form_background?.object,
                              [type]: {
                                    value: formClone.form_background?.object[type]?.value || 100,
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
                  <div className="flex flex-col  gap-[.6rem] ">
                        <span className="text-[1.3rem]">Vị trí X</span>
                        <div
                              className={`${styleEffect.onCheckHasBackground(formBackground)} w-[7rem] flex items-center gap-[.4rem] h-[3rem] p-[.2rem_1rem]
border-[.1rem]   rounded-lg bg-design-size`}
                        >
                              <input
                                    disabled={!formBackground}
                                    value={objectX}
                                    type="number"
                                    className={` w-[80%] disabled:cursor-not-allowed  bg-design-size `}
                                    onChange={(e) => debounced(+e.target.value, "x")}
                              />
                              <ButtonSelectUnit
                                    placeholder="Đơn vị trục X"
                                    defaultValue={renderFormUnit(formCore.form_background?.object.x)}
                                    onChangeUnit={(value) => {
                                          onChangeUnit("x", value);
                                    }}
                              />
                        </div>
                  </div>
                  <div className="flex flex-col  gap-[.6rem] ">
                        <span className="text-[1.3rem]">Vị trí Y</span>

                        <div
                              className={`${styleEffect.onCheckHasBackground(formBackground)} w-[7rem] flex items-center gap-[.4rem] h-[3rem] p-[.2rem_1rem]
border-[.1rem] rounded-lg bg-design-size`}
                        >
                              <input
                                    disabled={!formBackground}
                                    value={objectY}
                                    type="number"
                                    className={` w-[80%] disabled:cursor-not-allowed  bg-design-size`}
                                    onChange={(e) => debounced(+e.target.value, "y")}
                              />

                              <ButtonSelectUnit
                                    placeholder="Đơn vị trục Y"
                                    defaultValue={renderFormUnit(formCore.form_background?.object.y)}
                                    onChangeUnit={(value) => {
                                          onChangeUnit("y", value);
                                    }}
                              />
                        </div>
                  </div>
            </div>
      );
};

export default ButtonBackgroundObject;
