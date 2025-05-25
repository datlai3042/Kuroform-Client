import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormDesignStyle = () => {
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

      const onChangeFormStyles = (mode: "GOOGLE_FORM" | "FULL_WIDTH") => {
            if (!isDesignForm) {
                  setIsDesginForm(true);
            }

            const newFormEdit = structuredClone(formCore);
            newFormEdit.form_styles = mode;

            dispatch(onFetchForm({ form: newFormEdit }));
      };
      return (
            <div className="w-full h-[3.2rem] flex items-center gap-[.8rem]">
                  <button
                        onClick={() => onChangeFormStyles("GOOGLE_FORM")}
                        className={`${styleEffect.onCheckModeSelect(
                              formCore.form_styles === "GOOGLE_FORM",
                        )} min-w-[8rem] px-[.6rem]  h-full rounded-lg disabled:cursor-not-allowed `}
                  >
                        Google Form
                  </button>
                  <button
                        onClick={() => onChangeFormStyles("FULL_WIDTH")}
                        className={`${styleEffect.onCheckModeSelect(
                              formCore.form_styles === "FULL_WIDTH",
                        )} min-w-[8rem]  px-[.6rem] h-full rounded-lg disabled:cursor-not-allowed `}
                  >
                        Full Width
                  </button>
            </div>
      );
};

export default FormDesignStyle;
