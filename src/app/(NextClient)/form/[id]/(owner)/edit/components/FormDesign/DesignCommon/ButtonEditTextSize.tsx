import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore, InputCore, ReactCustom } from "@/type";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypeEdit } from "./ButtonColor";
import { inputSettingText } from "@/app/_constant/input.constant";
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import { useDebouncedCallback } from "@mantine/hooks";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";

type TProps = {
      typeEdit: TypeEdit;
      inputItem?: InputCore.InputForm;
};

const ButtonEditTextSize = (props: TProps) => {
      const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);
      const { theme } = useContext(ThemeContext);

      const { typeEdit, inputItem } = props;

      const [openModelSize, setOpenModelSize] = useState<boolean>(false);
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
      const colorMain = useSelector((state: RootState) => state.form.colorCore);

      const fontSizeForm = formCore.form_title.form_title_size || formCore.form_setting_default.form_title_size_default;
      const fontSizeInput = formCore.form_setting_default.input_size;

      const [fontSize, setFontSize] = useState<number>(typeEdit === "Form" ? fontSizeForm : fontSizeInput);
      const dispatch = useDispatch();

      const ulRef = useRef<HTMLUListElement | null>(null);

      const liRef = useRef<HTMLLIElement | null>(null);

      useEffect(() => {
            if (openModelSize) {
                  if (liRef.current && ulRef.current) {
                        ulRef.current.scrollTop = liRef.current.offsetTop - 50;
                  }
            }
      }, [openModelSize]);

      const divColorRef = useRef<HTMLDivElement | null>(null);

      const globalClick = useCallback(
            (e: MouseEvent) => {
                  if (divColorRef.current && !divColorRef.current.contains(e.target as Node) && openModelSize) {
                        setOpenModelSize(false);
                  }
            },
            [setOpenModelSize, openModelSize],
      );

      useEffect(() => {
            document.addEventListener("click", globalClick);

            return () => {
                  document.removeEventListener("click", globalClick);
            };
      }, [globalClick]);

      const onChangeTextSize = (size: number, type: "Input" | "Decrease" | "Increase") => {
            const MAX = typeEdit === "Form" ? 40 : 20;
            const MIN = 1;

            if (!size) {
                  size = 1;
            }

            if (type === "Increase") {
                  size = size === MAX ? MAX : (size += 1);
            }

            if (type === "Decrease") {
                  size = size === MIN ? MIN : (size -= 1);
            }

            if (size > MAX && type === "Input") {
                  size = MAX;
            }

            setFontSize(size);
            if (!isDesignForm) {
                  setIsDesginForm(true);
            }

            const newFormEdit = structuredClone(formCore);
            if (typeEdit === "Form") {
                  newFormEdit.form_title.form_title_size = size;
            }

            if (typeEdit === "Common") {
                  newFormEdit.form_setting_default.input_size = size;
                  newFormEdit.form_inputs = newFormEdit.form_inputs.map((ip) => {
                        ip.core.setting.input_size = size;
                        return ip;
                  });
            }
            if (typeEdit === "Input") {
                  newFormEdit.form_inputs = newFormEdit.form_inputs.map((ip) => {
                        if (ip._id === inputItem?._id) {
                              ip.core.setting = { ...ip.core.setting, input_size: size };
                              return ip;
                        }

                        return ip;
                  });
            }
            setOpenModelSize(false);
            dispatch(onFetchForm({ form: newFormEdit }));
      };

      const debounced = useDebouncedCallback((value: number, type: "Input" | "Decrease" | "Increase") => onChangeTextSize(value, type), 100);

      const titleCoreSize =
            typeEdit === "Form"
                  ? formCore.form_title.form_title_size || formCore.form_setting_default.form_title_size_default
                  : formCore.form_setting_default.input_size;
      return (
            <div ref={divColorRef} className="relative w-max  max-h-[8rem] xl:h-[4rem] py-[.3rem] flex items-center justify-between gap-[1rem] bg-transparent ">
                  <button
                        disabled={titleCoreSize <= 1}
                        className="w-[3rem] h-[3rem] hover:text-[#fff] flex items-center justify-center rounded-[.4rem] disabled:cursor-not-allowed text-[3rem]  border-[.1rem] border-[var(--border-color-input)] bg-color-section-theme hover:border-none hover:bg-color-main"
                        onClick={() => debounced(titleCoreSize, "Decrease")}
                  >
                        -
                  </button>

                  <div className="w-[6rem] flex items-center justify-center">
                        <input
                              onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setOpenModelSize(true);
                              }}
                              type="number"
                              max={typeEdit === "Form" ? 40 : 20}
                              onChange={(e) => debounced(+e.target.value, "Input")}
                              value={titleCoreSize}
                              className="w-[5rem] h-[3.6rem] text-center  bg-color-section-theme  border-[.1rem] border-[var(--border-color-input)] text-text-theme rounded-lg outline-none"
                        />
                  </div>
                  <button
                        disabled={titleCoreSize >= 40}
                        className="w-[3rem] h-[3rem]  hover:text-[#fff] flex items-center justify-center rounded-[.4rem] text-[2.6rem]  border-[.1rem] border-[var(--border-color-input)] bg-color-section-theme hover:border-none hover:bg-color-main disabled:cursor-not-allowed"
                        onClick={() => debounced(titleCoreSize, "Increase")}
                  >
                        +
                  </button>

                  {openModelSize && (
                        <ul
                              ref={ulRef}
                              className=" absolute z-[3] top-[4rem] left-[50%] translate-x-[-50%] w-[6rem] max-h-[16rem] text-[#000]  overflow-y-scroll bg-color-section-theme text-text-theme border-[.1rem] border-[var(--border-color-input)] outline-none"
                        >
                              {Array(typeEdit === "Form" ? 40 : 20)
                                    .fill(0)
                                    .map((_, i) => {
                                          if (i + 1 === titleCoreSize) {
                                                return (
                                                      <li key={i} ref={liRef} className="bg-color-main p-[.2rem_2rem] hover:cursor-pointer">
                                                            {i + 1}
                                                      </li>
                                                );
                                          }
                                          return (
                                                <li
                                                      onClick={() => onChangeTextSize(i + 1, "Decrease")}
                                                      key={i}
                                                      className="p-[.2rem_2rem] hover:bg-color-main hover:cursor-pointer"
                                                >
                                                      {i + 1}
                                                </li>
                                          );
                                    })}
                        </ul>
                  )}
            </div>
      );
};

export default ButtonEditTextSize;
