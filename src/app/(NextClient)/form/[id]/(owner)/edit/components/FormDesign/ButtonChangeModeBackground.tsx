import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ButtonChangeModeBackground = () => {
      const dispatch = useDispatch();

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);
      const { theme } = useContext(ThemeContext);

      const styleEffect = {
            onCheckModeSelect: (check: boolean) => {
                  if (check) {
                        if (theme === "light") return "bg-slate-900 text-white";
                        return "bg-[#fff] text-color-section-theme";
                  } else {
                        if (theme === "light") return "bg-white text-slate-700 border-[.1rem] border-slate-200";
                        return "bg-colorr-section-theme text-[#fff] border-[.1rem] border-[#fff]";
                  }
            },
      };

      const onChangeModeBackground = (mode: "cover" | "contain") => {
            if (isDesignForm) {
                  setIsDesginForm(true);
            }

            const newFormEdit = structuredClone(formCore);
            newFormEdit.form_background!.mode_show = mode;

            dispatch(onFetchForm({ form: newFormEdit }));
      };
      const formBackground = !!formCore.form_background?.form_background_iamge_url || formCore.form_background_state;

      return (
            <div className="w-full h-[4rem] flex items-center gap-[2rem]">
                  <button
                        disabled={!formBackground}
                        onClick={() => onChangeModeBackground("contain")}
                        className={`${styleEffect.onCheckModeSelect(
                              formCore.form_background?.mode_show === "contain",
                        )} min-w-[10rem]  h-full rounded-lg disabled:cursor-not-allowed `}
                  >
                        contain
                  </button>
                  <button
                        disabled={!formBackground}
                        onClick={() => onChangeModeBackground("cover")}
                        className={`${styleEffect.onCheckModeSelect(
                              formCore.form_background?.mode_show === "cover",
                        )} min-w-[10rem] h-full rounded-lg disabled:cursor-not-allowed `}
                  >
                        cover
                  </button>
            </div>
      );
};

export default ButtonChangeModeBackground;
