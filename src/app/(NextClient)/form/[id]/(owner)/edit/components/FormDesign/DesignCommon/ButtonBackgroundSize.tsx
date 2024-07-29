import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import { onEditForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import { useDebouncedCallback } from "@mantine/hooks";
import { theme } from "antd";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

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

      const width = formCore.form_background?.size?.width || 100;
      const height = formCore.form_background?.size?.height || 100;

      const onChangePosition = (size: number, type: "width" | "height") => {
            const formClone = structuredClone(formCore);
            const newForm: FormCore.Form = {
                  ...formClone,
                  form_background: {
                        ...formClone.form_background,
                        size: { ...formClone.form_background?.size, [type]: size },
                  } as FormCore.Form["form_background"],
            };

            if (!isDesignForm) {
                  setIsDesginForm(true);
            }

            dispatch(onEditForm({ form: newForm }));
      };

      return (
            <div className=" flex justify-between gap-[2rem]">
                  <div className="flex w-[50%] flex-col gap-[.5rem] ">
                        <span className="">Chiều rộng</span>
                        <div
                              className={`${styleEffect.onCheckHasBackground(formBackground)} w-[90%] flex items-center gap-[1rem] h-[3rem] p-[.2rem_1rem]
border-[.1rem] border-slate-300  rounded-lg bg-[#ffffff]`}
                        >
                              <input
                                    style={{ color: theme === "light" ? colorMain : "#000" }}
                                    disabled={!formBackground}
                                    value={width}
                                    type="number"
                                    min={0}
                                    className={` w-[80%] disabled:cursor-not-allowed  `}
                                    onChange={(e) => debounced(+e.target.value, "width")}
                              />

                              {width ? <span className="opacity-75 text-[#000]">%</span> : <span className="opacity-75 text-[#000]">auto</span>}
                        </div>
                  </div>
                  <div className="flex w-[50%] flex-col gap-[.5rem] ">
                        <span className="">Chiều dài</span>
                        <div
                              className={`${styleEffect.onCheckHasBackground(formBackground)} w-[90%] flex items-center gap-[1rem] h-[3rem] p-[.2rem_1rem]
border-[.1rem] border-slate-300  rounded-lg bg-[#ffffff]`}
                        >
                              <input
                                    style={{ color: theme === "light" ? colorMain : "#000" }}
                                    disabled={!formBackground}
                                    value={height}
                                    type="number"
                                    min={0}
                                    className={` w-[80%] disabled:cursor-not-allowed  `}
                                    onChange={(e) => debounced(+e.target.value, "height")}
                              />
                              {height ? <span className="opacity-75 text-[#000]">%</span> : <span className="opacity-75 text-[#000]">auto</span>}
                        </div>
                  </div>
            </div>
      );
};

export default ButtonBackgroundSize;
