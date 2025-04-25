"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";

import { SidebarContext } from "@/app/(NextClient)/(user)/dashboard/SidebarContext";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import { RootState } from "@/app/_lib/redux/store";

import { InputCore, FormCore as TFormCore } from "@/type";
import InputCoreTitle from "./InputCore/InputCoreTitle";
import InputCoreDate from "./InputCore/_date/InputCoreDate";
import InputCoreEmail from "./InputCore/_email/InputCoreEmail";
import InputCoreOption from "./InputCore/_option/InputCoreOption";
import InputCoreOptionMultiple from "./InputCore/_options/InputCoreOptionMultiple";
import InputCoreText from "./InputCore/_text/InputCoreText";

import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import ButtonAddAvatarForm from "@/app/(NextClient)/_components/ui/button/ButtonAddAvatarForm";
import ButtonAddBackgroundForm from "@/app/(NextClient)/_components/ui/button/ButtonAddBackgroudForm";

import FormPageGuess from "@/app/(NextClient)/_components/Layout/FormPageGuess";
import { useDispatch, useSelector } from "react-redux";
import FormImage from "./FormImage";

import ButtonDesgin from "./FormDesign/DesignCommon/ButtonDesgin";

import { DndContext, DragEndEvent, DragOverlay, MouseSensor, UniqueIdentifier, closestCorners, useSensor, useSensors } from "@dnd-kit/core";

import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import ButtonAddInput from "@/app/(NextClient)/_components/ui/button/ButtonAddInput";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import useUpdateForm from "@/app/hooks/useUpdateForm";
import InputCoreAddress from "./InputCore/_address/InputCoreAddress";
import InputCoreAnchor from "./InputCore/_anchor/InputCoreAnchor";
import InputCoreImage from "./InputCore/_image/InputCoreImage";
import InputCorePhone from "./InputCore/_phone/InputCorePhone";
import InputCoreVote from "./InputCore/_vote/InputCoreVote";
import Portal from "@/app/(NextClient)/_components/Portal";
import Footer from "@/app/(NextClient)/_components/Layout/Footer";
import ButtonDarkMode from "@/app/(NextClient)/_components/ui/button/ButtonDarkMode";
import InputDrap from "./InputDrap";
import ButtonDesignSubmit from "./FormDesign/DesignCommon/ButtonDesignSubmit";
import ButtonSubmitDesign from "./FormDesign/ButtonSubmitDesign";
import BoxChangeForm from "./FormDesign/BoxChangeForm";
import { renderFormThemes } from "@/app/utils/form.utils";

export const generateInputForms = (Inputs: InputCore.InputForm[]): React.ReactNode => {
      return Inputs.map((ele, index) => {
            switch (ele.type) {
                  case "TEXT":
                        return <InputCoreText inputItem={ele} key={ele._id} />;

                  case "EMAIL":
                        return <InputCoreEmail inputItem={ele} key={ele._id} />;

                  case "VOTE":
                        return <InputCoreVote inputItem={ele} key={ele._id} />;

                  case "PHONE":
                        return <InputCorePhone inputItem={ele} key={ele._id} />;
                  case "OPTION":
                        return <InputCoreOption inputItem={ele} key={ele._id} />;

                  case "OPTION_MULTIPLE":
                        return <InputCoreOptionMultiple inputItem={ele} key={ele._id} />;
                  case "DATE":
                        return <InputCoreDate inputItem={ele} key={ele._id} />;

                  case "FILE_IMAGE":
                        return <InputCoreImage inputItem={ele} key={ele._id} />;

                  case "ADDRESS":
                        return <InputCoreAddress inputItem={ele} key={ele._id} />;
                  case "ANCHOR":
                        return <InputCoreAnchor inputItem={ele} key={ele._id} />;
                  default:
                        return <InputCoreText inputItem={ele} key={index} />;
            }
      });
};

const FormCore = () => {
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as TFormCore.Form;
      const { modeScreen, setModeScreen } = useContext(FormModeScreenContext);
      const { openFormDesign, openButtonBottomSave } = useContext(FormDesignContext);
      const { setOpenSidebar } = useContext(SidebarContext);
      const [activeId, setActiveId] = useState<string | null>(null);
      const { theme } = useContext(ThemeContext);
      const [colorBorderCurrent, setBorderCurruent] = useState('')
      const updateFormAPI = useUpdateForm();

      const dispatch = useDispatch();

      const RenderArrayInput: React.ReactNode = useMemo(() => {
            return generateInputForms(formCore.form_inputs);
      }, [formCore?.form_inputs]);

      const onGetDataDemo = () => {};

      const styleEffect = {
            onCheckModeScreen: () => {
                  if (modeScreen === "FULL") return " !min-h-screen !w-screen  !h-max relative   !transition-[scale] animate-modeScreen z-[50]";
                  return "";
            },
      };

      const getPos = (id: UniqueIdentifier) => formCore.form_inputs.findIndex((ip) => ip._id === id);
      const onDrapEnd = (e: DragEndEvent) => {
            const { active, over } = e;
            if (active.id === over?.id) return;

            const posActive = getPos(active.id as unknown as UniqueIdentifier);
            const postOver = getPos(over?.id as unknown as UniqueIdentifier);

            const newArray = arrayMove(formCore.form_inputs, posActive, postOver);
            const newForm = structuredClone(formCore);
            newForm.form_inputs = newArray;
            dispatch(onFetchForm({ form: newForm }));
            updateFormAPI.mutate(newForm);
            setActiveId(null);
            return newArray;
      };

      const sensors = useSensors(
            useSensor(MouseSensor, {
                  activationConstraint: {
                        distance: 10,
                  },
            }),
      );

      useEffect(() => {
            window.scrollTo(0, 0);
      }, []);

      const showComponentImage = formCore.form_avatar || formCore.form_background || formCore.form_background_state || formCore.form_avatar_state;

      const gapWhenAppearImage = !(formCore.form_avatar || formCore.form_avatar_state) ? "pt-0" : "";

      const heightWhenAppearImage = !(formCore.form_avatar_state && formCore.form_background_state) ? " sm:min-h-[7rem]" : "sm:min-h-[4rem]";

      const isImage = formCore.form_avatar || formCore.form_avatar_state;

      useEffect(() => {
            window.scrollTo(0, 0);
      }, [modeScreen]);

      useEffect(() => {
            setBorderCurruent(formCore.form_themes)
            if (formCore.form_themes === "AUTO") {
                  if (theme === "light") {
                        document.body.style.setProperty("--border-color-input", "rgb(169 169 204 / 74%)");
                     
                  } else {
                        document.body.style.setProperty("--border-color-input", "rgb(209 213 219 / 27%)");

                  }
            }
            if (formCore.form_themes === "LIGHT") {
                  document.body.style.setProperty("--border-color-input", "rgb(169 169 204 / 74%)");
                  document.documentElement.style.backgroundColor = 'var(--form-theme-light)'

            }

            if (formCore.form_themes === "DARK") {
                  document.body.style.setProperty("--border-color-input", "rgb(209 213 219 / 27%)");
                  document.documentElement.style.backgroundColor = 'var(--form-theme-dark)'

            }

            return () => {
                  document.documentElement.style.backgroundColor = 'var(--color-section-theme)'

            }
      }, [formCore.form_themes, theme]);

      return (
            <>
                  {modeScreen === "NORMAL" && (
                        <DivNative
                              className={`${renderFormThemes(
                                    formCore.form_themes,
                              )} relative z-[105]  w-full  !px-[2.6rem] pb-[4rem] transition-all duration-700  sm:px-0    xl:ml-0 flex flex-col gap-[3rem] text-text-theme min-h-screen h-max  `}
                        >
                              {showComponentImage && <FormImage />}
                              <div
                                    className={`${isImage ? "mt-[3.8rem]" : ""}
						min-h-screen h-max`}
                              >
                                    <DivNative
                                          className={`flex-1 px-[1rem] xl:px-[4rem] min-h-full h-max  w-full lg:max-w-[67rem] xl:max-w-[70rem] mx-auto   xl:pl-0  flex flex-col  xl:py-[2rem] gap-[2rem]  `}
                                    >
                                          <DivNative className={`${gapWhenAppearImage}`}>
                                                <DivNative className={`${heightWhenAppearImage} group max-h-[18rem] sm:max-h-[8rem] xl:min-h-max `}>
                                                      <DivNative className="mt-[2rem] w-full xl:min-w-[80rem] xl:w-max h-full   flex flex-wrap flex-col sm:flex-row sm:items-center  gap-[2rem]">
                                                            <ButtonDesgin className={`${openFormDesign ? "" : "ml-0"}`} />

                                                            <DivNative className="flex flex-col sm:flex-row w-max     gap-[2rem]">
                                                                  {!formCore.form_avatar_state && !formCore.form_avatar && <ButtonAddAvatarForm />}
                                                                  {!formCore.form_background_state && !formCore.form_background && <ButtonAddBackgroundForm />}
                                                            </DivNative>
                                                      </DivNative>
                                                </DivNative>
                                          </DivNative>

                                          <DivNative className={`${openFormDesign ? "" : "ml-0"}  flex flex-col gap-[1rem] min-h-full`}>
                                                <InputCoreTitle />
                                                {formCore.form_inputs.length > 0 && (
                                                      <DivNative className="mt-[2rem] h-max w-full flex flex-col gap-[4.8rem] ">
                                                            <DndContext
                                                                  onDragStart={(event) => {
                                                                        setActiveId(event.active.id as string);
                                                                  }}
                                                                  onDragEnd={onDrapEnd}
                                                                  onDragCancel={() => {
                                                                        setActiveId(null);
                                                                  }}
                                                                  sensors={sensors}
                                                                  collisionDetection={closestCorners}
                                                            >
                                                                  <SortableContext
                                                                        items={formCore.form_inputs.map((ip) => ip._id) as unknown as UniqueIdentifier[]}
                                                                        strategy={verticalListSortingStrategy}
                                                                  >
                                                                        {RenderArrayInput}
                                                                  </SortableContext>
                                                                  <DragOverlay>
                                                                        {activeId ? <InputDrap inputId={activeId} listInput={formCore.form_inputs} /> : <></>}
                                                                  </DragOverlay>
                                                            </DndContext>
                                                      </DivNative>
                                                )}
                                                <ButtonAddInput />
                                                <ButtonSubmitDesign id="submit" textContent={formCore.form_button_text} onClick={onGetDataDemo} />
                                          </DivNative>
                                    </DivNative>
                              </div>
                        </DivNative>
                  )}

                  {modeScreen === "FULL" && (
                        <div className={`${styleEffect.onCheckModeScreen()}`}>
                              <Portal>
                                    <DivNative className="fixed right-[4rem] text-[1.3rem] top-[2rem] flex items-center justify-center z-[51]" title="Publish">
                                          <ButtonNative
                                                // style={{ borderColor: colorMain, backgroundColor: colorMain }}
                                                textContent="Quay về"
                                                className="p-[.8rem] rounded-lg bg-color-main  text-[#ffffff] "
                                                onClick={() => {
                                                      setModeScreen("NORMAL");
                                                      setOpenSidebar(true);
                                                }}
                                          />
                                    </DivNative>
                              </Portal>
                              <Portal>
                                    <DivNative
                                          className="fixed right-[4rem] text-[1.3rem] top-[6.4rem] flex items-center justify-center z-[51]"
                                          title="Publish"
                                    >
                                          <ButtonDarkMode />
                                    </DivNative>
                              </Portal>
                              <FormPageGuess FormCore={formCore} />
                        </div>
                  )}
                  {/* {openButtonBottomSave && <BoxChangeForm />} */}

                  <Footer />
            </>
      );
};

export default FormCore;
