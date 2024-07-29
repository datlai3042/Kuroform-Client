import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import { onEditForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import { useDebouncedCallback } from "@mantine/hooks";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ButtonBackgroundPadding = () => {
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

      const paddingX = formCore.form_background?.padding.x || 0;
      const paddingY = formCore.form_background?.padding.y || 0;

      const onChangePosition = (paddingValue: number, type: "x" | "y") => {
            const formClone = structuredClone(formCore);
            const padding_edit = paddingValue > 0 ? paddingValue : 0;
            const newForm: FormCore.Form = {
                  ...formClone,
                  form_background: {
                        ...formClone.form_background,
                        padding: {
                              ...formClone.form_background?.padding,
                              [type]: padding_edit,
                        },
                  } as FormCore.Form["form_background"],
            };

            if (!isDesignForm) {
                  setIsDesginForm(true);
            }

            dispatch(onEditForm({ form: newForm }));
      };

      useEffect(() => {}, [formCore]);

      return (
            <div className=" flex justify-between">
                  <div className="flex w-[50%] flex-col gap-[.5rem] ">
                        <span className="">Padding X</span>
                        <div
                              className={`${styleEffect.onCheckHasBackground(formBackground)} w-[90%] flex items-center gap-[1rem] h-[3rem] p-[.2rem_1rem]
border-[.1rem] border-slate-300  rounded-lg bg-[#ffffff]`}
                        >
                              <input
                                    style={{ color: theme === "light" ? colorMain : "#000" }}
                                    disabled={!formBackground}
                                    value={paddingX > 0 ? paddingX : 0}
                                    min={0}
                                    type="number"
                                    className={` w-[80%] disabled:cursor-not-allowed  `}
                                    onChange={(e) => debounced(+e.target.value, "x")}
                              />
                              <span className="opacity-75 text-[#000]">%</span>
                        </div>
                  </div>

                  <div className="flex w-[50%] flex-col gap-[.5rem] ">
                        <span className="">Padding Y</span>
                        <div
                              className={`${styleEffect.onCheckHasBackground(formBackground)} w-[90%] flex items-center gap-[1rem] h-[3rem] p-[.2rem_1rem]
border-[.1rem] border-slate-300  rounded-lg bg-[#ffffff]`}
                        >
                              <input
                                    style={{ color: theme === "light" ? colorMain : "#000" }}
                                    disabled={!formBackground}
                                    value={paddingY > 0 ? paddingY : 0}
                                    min={0}
                                    type="number"
                                    onChange={(e) => debounced(+e.target.value, "y")}
                                    className={` w-[80%] disabled:cursor-not-allowed  `}
                              />
                              <span className="opacity-75 text-[#000]">%</span>
                        </div>
                  </div>
            </div>
      );
};

export default ButtonBackgroundPadding;
