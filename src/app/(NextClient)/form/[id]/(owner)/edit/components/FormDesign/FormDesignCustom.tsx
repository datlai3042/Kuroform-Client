"use client";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormDesignTitle from "./FormDesignText";
import FormDesignBackground from "./FormDesignBackground";
import FormDesignText from "./FormDesignText";
import FormDesignAvatar from "./FormDesignAvatar";
import FormDesignFormMode from "./FormDesignFormMode";
import useUpdateForm from "@/app/hooks/useUpdateForm";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import FormDesignColorAndSubmit from "./FormDesignColorAndSubmit";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import SelectModeDesign from "./SelectModeDesign";
import { useMediaQuery } from "@mantine/hooks";
import { clearFormAnswer } from "@/app/_lib/redux/formAnswer.slice";

export type ModeDesignForm = "TITLE" | "BACKGROUND" | "AVATAR" | "SUBMIT" | "SUB_TITLE";

const FormDesignCustom = () => {
      const { isDesignForm, setOpenModelNotSave, setIsDesginForm, setOpenFormDesign } = useContext(FormDesignContext);

      const FormBackUp = useSelector((state: RootState) => state.form.formCoreBackUp);
      const formOriginal = useSelector((state: RootState) => state.form.formCoreOriginal);

      const [modeDesign, setModeDesign] = useState<ModeDesignForm>("BACKGROUND");
      const dispatch = useDispatch();
      const [heightContent, setHeightContent] = useState(0);
      const contentRef = useRef<HTMLDivElement | null>(null);
      const onCloseFormDesign = () => {
            if (isDesignForm) {
                  return setOpenModelNotSave(true);
            }

            dispatch(onFetchForm({ form: FormBackUp }));
            setOpenFormDesign(false);
            setIsDesginForm(false);
      };

      const updateFormAPI = useUpdateForm();

      const onSaveDesign = () => {
            updateFormAPI.mutate(formOriginal);
            setOpenFormDesign(false);
            setIsDesginForm(false);
            setOpenModelNotSave(false);
      };
      const matches = useMediaQuery(
            "(max-width: 767px)",
            false,

            {
                  getInitialValueInEffect: false,
            },
      );
      useEffect(() => {
            let heightHeader = 0;
            let heightBottom = 0;
            let bottomBottom = 0;
            console.log("run");
            const headerElement = document.getElementById("design-header");
            if (headerElement) {
                  heightHeader = headerElement.clientHeight || 0;
            }
            const bottomElement = document.getElementById("design-bottom");
            if (bottomElement) {
                  heightBottom = bottomElement.clientHeight || 0;
                  const calc = window.innerHeight - bottomElement.getBoundingClientRect().bottom;
                  bottomBottom = matches ? 60 : 0;
            }
            const wScreen = window.innerHeight;
            const resultCalc = wScreen - heightHeader - heightBottom - bottomBottom;
            if (contentRef.current) {
                  contentRef.current.style.height = `${resultCalc}px`;
            }

            setHeightContent(resultCalc);
      }, [matches]);

      return (
            <div
                  style={{ borderLeft: ".1rem solid var(--border-color-side)" }}
                  id={"section-design"}
                  className="scroll-desgin-custom fixed z-[104] bg-color-section-theme text-text-theme top-0 right-[0rem] h-screen  w-[28rem]  "
            >
                  <div className=" relative min-h-full h-max pb-[4rem] pr-[.8rem]  border-b-[.2rem] ">
                        <div className="sticky top-0 right-0   bg-color-section-theme z-[2] " id="design-header">
                              <div className="flex flex-col items-center ">
                                    <div className="w-full flex items-center py-[1rem] px-[1.6rem]  bg-color-section-theme z-[2]">
                                          <ButtonIcon
                                                className=" p-[.2rem] text-[1.3rem]  hover:bg-color-main text-text-theme hover:text-[#fff] rounded-lg"
                                                Icon={<ChevronsRight className="w-[1.4rem]" />}
                                                onClick={onCloseFormDesign}
                                          />
                                          <p className=" mx-auto text-[1.6rem]  font-medium text-center">Tùy biến giao diện</p>
                                    </div>
                                    <SelectModeDesign modeDesign={modeDesign} setModeDesign={setModeDesign} />
                              </div>
                        </div>
                        <div ref={contentRef} className="relative w-full min-h-full h-max overflow-auto  ">
                              {/* <FormDesignFormMode /> */}

                              <div className="flex flex-col  gap-[2rem]  pt-[1rem]  overflow-auto  ">
                                    {modeDesign === "SUBMIT" && <FormDesignColorAndSubmit />}
                                    {modeDesign === "TITLE" && <FormDesignText title={"Tùy chỉnh tiêu đề chính"} type="Form" />}
                                    {modeDesign === "BACKGROUND" && <FormDesignBackground />}
                                    {modeDesign === "AVATAR" && <FormDesignAvatar />}
                                    {modeDesign === "SUB_TITLE" && <FormDesignText title={"Tùy chỉnh tiêu đề phụ"} type="Common" />}
                              </div>
                        </div>
                        <div
                              id="design-bottom"
                              className="fixed  sm:sticky bottom-[6rem] sm:bottom-0 right-0 px-[2rem] flex items-center h-[6rem] w-[25rem]   "
                        >
                              <ButtonNative
                                    // style={{ backgroundColor: theme === "light" ? colorMain : "#fff" }}
                                    textContent="Lưu"
                                    onClick={onSaveDesign}
                                    className="bg-color-main p-[.6rem_1rem] w-[10rem] ml-auto rounded-[.4rem] text-[#fff]"
                              />
                        </div>
                  </div>
            </div>
      );
};

export default FormDesignCustom;
