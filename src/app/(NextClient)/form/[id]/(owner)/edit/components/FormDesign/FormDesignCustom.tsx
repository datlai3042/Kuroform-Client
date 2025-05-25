"use client";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import useUpdateForm from "@/app/hooks/useUpdateForm";
import { useDebouncedCallback, useMediaQuery } from "@mantine/hooks";
import { ChevronsRight, X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormDesignAvatar from "./FormDesignAvatar";
import FormDesignBackground from "./FormDesignBackground";
import FormDesignColorAndSubmit from "./FormDesignColorAndSubmit";
import FormDesignText from "./FormDesignText";
import SelectModeDesign from "./SelectModeDesign";
import ButtonBackgroundColor from "./DesignCommon/ButtonBackgroundColor";
import BoxChangeForm from "./BoxChangeForm";
import FormDesignTheme from "./FormDesignTheme";
import FormDesignStyle from "./FormDesignStyle";
import FormDesignInput from "./FormDesignInput";

export type ModeDesignForm = "TITLE" | "BACKGROUND" | "AVATAR" | "SUBMIT" | "SUB_TITLE";

const FormDesignCustom = () => {
      const { isDesignForm, setOpenModelNotSave, setIsDesginForm, setOpenFormDesign, openButtonBottomSave } = useContext(FormDesignContext);

      const FormBackUp = useSelector((state: RootState) => state.form.formCoreBackUp);
      const formOriginal = useSelector((state: RootState) => state.form.formCoreOriginal);

      const [modeDesign, setModeDesign] = useState<ModeDesignForm>("BACKGROUND");
      const dispatch = useDispatch();
      const [heightContent, setHeightContent] = useState(0);
      const contentRef = useRef<HTMLDivElement | null>(null);
      const refDesignCommon = useRef<HTMLDivElement | null>(null);
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
      const isBgDefault = formOriginal.form_background_state && !formOriginal.form_background?.form_background_iamge_url;
      const isAvatarDefault = formOriginal.form_avatar_state && !formOriginal.form_avatar?.form_avatar_url;
      const handleBrowseResize = useDebouncedCallback(() => {
            if (refDesignCommon.current) {
                  const spaceTop = refDesignCommon.current.getBoundingClientRect().top;
                  let heightBottomUI = 0;
                  const bottomSave = document.getElementById("design-bottom");
                  if (bottomSave) {
                        heightBottomUI = bottomSave.getBoundingClientRect().height;
                  }
                  const viewHeight = window.innerHeight;
                  const fullHeightDesignCommon = viewHeight - spaceTop - heightBottomUI - 20;
                  refDesignCommon.current.style.height = `${fullHeightDesignCommon}px`;
                  // setFullHeightDesignCommon(fullHeightDesignCommon);
            }
      }, 100);
      useEffect(() => {
            handleBrowseResize();
            window.addEventListener("resize", handleBrowseResize);

            return () => {
                  window.removeEventListener("resize", handleBrowseResize);
            };
      }, []);
      return (
            <div
                  style={{ borderLeft: ".1rem solid var(--border-color-side)" }}
                  id={"section-design"}
                  className="scroll-desgin-custom px-[1rem] md:px-0  flex-1 fixed  bg-color-section-theme text-text-theme top-0 right-[0rem] h-screen w-full z-[999]  md:w-[32rem]  "
            >
                  <div className=" relative min-h-full h-max pb-[4rem] px-[1.8rem]  border-b-[.2rem] flex flex-col">
                        <div className="sticky top-0 right-0   bg-color-section-theme z-[2] " id="design-header">
                              <div className="flex flex-col items-center ">
                                    <div className="w-full flex items-center justify-between py-[1rem]   bg-color-section-theme z-[2]">
                                          <p className="  text-[1.6rem]  font-medium text-center">Thiết kế giao diện</p>

                                          <ButtonIcon
                                                className=" p-[.2rem] text-[1.3rem]  hover:bg-color-main text-text-theme hover:text-[#fff] rounded-lg"
                                                Icon={<X className="w-[1.4rem]" />}
                                                onClick={onCloseFormDesign}
                                          />
                                    </div>
                                    {/* <SelectModeDesign modeDesign={modeDesign} setModeDesign={setModeDesign} /> */}
                              </div>
                        </div>
                        <div ref={refDesignCommon} className="relative w-full min-h-full h-max overflow-auto pb-[8rem] md:pb-[2rem] pr-[1rem]">
                              {/* <FormDesignFormMode /> */}

                              <div className="flex flex-col  gap-[1.8rem] px-[.4rem] text-[1.3rem]    ">
                                    <div className="flex flex-col gap-[.8rem]">
                                          <div className="flex justify-between">
                                                <p className="flex gap-[.4rem]">
                                                      <h4 className="font-semibold">Themes</h4>
                                                </p>
                                          </div>
                                          <FormDesignTheme />
                                    </div>
                                    <div className="flex flex-col gap-[.8rem] my-[1rem]">
                                          <div className="flex justify-between">
                                                <p className="flex gap-[.4rem]">
                                                      <h4 className="font-semibold">Kiểu Form</h4>
                                                </p>
                                          </div>
                                          <FormDesignStyle />
                                    </div>
                                    <div className="flex flex-col gap-[.8rem]">
                                          <div className="flex justify-between">
                                                <p className="flex gap-[.4rem]">
                                                      <h4 className="font-semibold">Background</h4>

                                                      {isBgDefault && <span className="text-color-main font-bold"> - Mặc định</span>}
                                                </p>
                                          </div>
                                          <FormDesignBackground />
                                    </div>

                                    <div className="flex flex-col gap-[0rem]">
                                          <div className="flex justify-between">
                                                <p className="flex gap-[.4rem]">
                                                      <h4 className="font-semibold">Avatar</h4>
                                                      {isAvatarDefault && <span className="text-color-main font-bold"> - Mặc định</span>}
                                                </p>
                                          </div>
                                          <FormDesignAvatar />
                                    </div>
                                    <div className="flex flex-col gap-[.8rem]">
                                          <div className="flex justify-between">
                                                <p className="flex gap-[.4rem]">
                                                      <h4 className="font-semibold">Title</h4>
                                                </p>
                                          </div>
                                          <FormDesignText title={"Tùy chỉnh tiêu đề chính"} type="Form" />
                                    </div>

                                    <div className="flex flex-col gap-[.8rem]">
                                          <div className="flex justify-between">
                                                <p className="flex gap-[.4rem]">
                                                      <h4 className="font-semibold">Input</h4>
                                                </p>
                                          </div>
                                          <FormDesignInput />
                                    </div>

                                    {/* {modeDesign === "SUBMIT" && <FormDesignColorAndSubmit />}
                                    {modeDesign === "TITLE" && <FormDesignText title={"Tùy chỉnh tiêu đề chính"} type="Form" />}
                                    {modeDesign === "BACKGROUND" && <FormDesignBackground />}
                                    {modeDesign === "AVATAR" && <FormDesignAvatar />}
                                    {modeDesign === "SUB_TITLE" && <FormDesignText title={"Tùy chỉnh tiêu đề phụ"} type="Common" />} */}
                              </div>
                        </div>
                        {formOriginal?.screen !== "profile" && (
                              <div
                                    id="design-bottom"
                                    className="w-[32rem] flex-shrink-1 ml-auto px-[.1rem]  fixed bottom-[1rem] right-0 md:px-[2rem] flex items-center    "
                              >
                                    <div className="p-[1rem] w-full bg-color-section-theme flex justify-end">
                                          <ButtonNative
                                                // style={{ backgroundColor: theme === "light" ? colorMain : "#fff" }}
                                                textContent="Lưu"
                                                onClick={onSaveDesign}
                                                className="bg-color-main p-[.6rem_1rem] w-[10rem] ml-auto rounded-[.4rem] text-[#fff]"
                                          />
                                    </div>
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default FormDesignCustom;
