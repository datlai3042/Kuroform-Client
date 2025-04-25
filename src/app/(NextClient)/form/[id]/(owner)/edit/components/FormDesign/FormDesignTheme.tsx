import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormDesignTheme = () => {
      const { theme } = useContext(ThemeContext);
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);
      const dispatch = useDispatch();

      const styleEffect = {
            onCheckModeSelect: (check: boolean) => {
                  if (check) {
                        if (theme === "light") return "bg-color-main text-white";
                        return "bg-color-main text-text-theme";
                  } else {
                        if (theme === "light") return "bg-white text-slate-700 border-[.1rem] border-[var(--border-color-input)]";
                        return " text-[#fff] border-[.1rem] border-[var(--border-color-input)]";
                  }
            },
      };
      const onChangeFormThemes = (mode: FormCore.Form["form_themes"]) => {
            if (!isDesignForm) {
                  setIsDesginForm(true);
            }

            const newFormEdit = structuredClone(formCore);
            newFormEdit.form_themes = mode;

            dispatch(onFetchForm({ form: newFormEdit }));
      };
      return (
            <div className="w-full h-[3.2rem] flex justify-end items-center gap-[.8rem]">
                  <button
                        onClick={() => onChangeFormThemes("AUTO")}
                        className={`${styleEffect.onCheckModeSelect(
                              formCore.form_themes === "AUTO",
                        )} min-w-[8rem]  h-full rounded-lg disabled:cursor-not-allowed `}
                  >
                        Auto
                  </button>
                  <button
                        onClick={() => onChangeFormThemes("LIGHT")}
                        className={`${styleEffect.onCheckModeSelect(
                              formCore.form_themes === "LIGHT",
                        )} min-w-[8rem]  h-full rounded-lg disabled:cursor-not-allowed `}
                  >
                        Light
                  </button>
                  <button
                        onClick={() => onChangeFormThemes("DARK")}
                        className={`${styleEffect.onCheckModeSelect(
                              formCore.form_themes === "DARK",
                        )} min-w-[8rem] h-full rounded-lg disabled:cursor-not-allowed `}
                  >
                        Dark
                  </button>
            </div>
      );
};

export default FormDesignTheme;
