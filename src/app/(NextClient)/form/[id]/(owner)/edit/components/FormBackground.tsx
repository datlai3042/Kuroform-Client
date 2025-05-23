import { FormCore } from "@/type";
import { RootState } from "@/app/_lib/redux/store";

import React, { useContext, useState } from "react";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";

import ModelFormImage from "@/app/(NextClient)/_components/Model/ModelFormImage";
import ButtonSave from "@/app/(NextClient)/_components/ui/button/ButtonSave";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";

import { useSelector } from "react-redux";
import { generateStyleBackgroundImageForm, renderUnitHeightValueBg, renderUnitWidthValueBg } from "@/app/utils/form.utils";
import Image from "next/image";
import ButtonDarkMode from "@/app/(NextClient)/_components/ui/button/ButtonDarkMode";
import { Camera } from "lucide-react";

const FormBackground = ({ action }: { action?: "thumb" }) => {
      const { modeScreen, setModeScreen } = useContext(FormModeScreenContext);
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
      const [openModel, setOpenModel] = useState<boolean>(false);

      const onControllModel = () => {
            setOpenModel((prev) => !prev);
      };

      const formBackgroundColor = formCore.form_background?.backgroundColor || "";

      const onSetScreen = () => {
            if (modeScreen === "FULL") return setModeScreen("NORMAL");
            return setModeScreen("FULL");
      };

      const myBackgroundStyle = generateStyleBackgroundImageForm({ formCore, mode: "edit" });
      const renderHeight = formCore?.screen === 'profile' ? {height: '100%'} : action !== "thumb" ? renderUnitHeightValueBg(formCore.form_background) : {};
      return (
            <React.Fragment>
                  <DivNativeRef
                        // style={{ top: formCore?.screen === "profile" && action !== "thumb" ? 250 : 0 }}
                        onClick={() => setOpenModel(true)}
                        className="absolute inset-0 z-[2]  hover:cursor-pointer max-h-full overflow-hidden"
                  >
                        <div
                              style={
                                    formCore.form_background_state || formCore.form_background?.form_background_iamge_url
                                          ? {
                                                  backgroundColor: formBackgroundColor,
                                                  ...renderHeight,
                                                  ...renderUnitWidthValueBg(formCore.form_background),
                                                  minHeight: action === "thumb" ? "100%" : "",
                                            }
                                          : {}
                              }
                              className="relative group inset-0   w-full overflow-hidden "
                        >
                              <Image
                                    src={formCore.form_background?.form_background_iamge_url || formCore.form_setting_default.form_background_default_url}
                                    width={800}
                                    height={160}
                                    quality={100}
                                    style={action !== "thumb" ? myBackgroundStyle.style_background : { objectFit: action === "thumb" ? "cover" : "unset", borderRadius: 4 }}
                                    unoptimized={true}
                                    alt="form background"
                                    className="bg absolute  w-full h-full  "
                              />
                              {action === "thumb" && (
                                    <div className="hidden absolute inset-0 bg-[rgba(0,0,0,.6)] group-hover:flex  justify-center items-center">
                                          <Camera color="#fff"/>
                                    </div>
                              )}
                        </div>
                  </DivNativeRef>
                  {modeScreen === "NORMAL" && (
                        <React.Fragment>
                              {/* <DivNative className={` flex xl:hidden absolute right-[1rem] top-[1rem]  gap-[1rem]`}>
                                    <DivNative className=" flex items-center justify-center " title="Review">
                                          <ButtonNative
                                                textContent={`Review ${modeScreen}`}
                                                className="p-[.8rem] rounded-md bg-color-main text-text-theme"
                                                onClick={onSetScreen}
                                          />
                                    </DivNative>

                                    <ButtonSave />

                                    <DivNative className=" flex items-center justify-center " title="Publish">
                                          <ButtonNative textContent="Publish" className="p-[.8rem] rounded-md bg-color-main text-bg-input-theme" />
                                    </DivNative>
                              </DivNative> */}
                              <DivNative
                                    className={`${myBackgroundStyle.position_buttn} hidden group-hover:flex absolute gap-[1rem]  flex-col justify-center items-end  bottom-[10%]   z-[3]`}
                              >
                                    {/* <div className="block xl:hidden">
                                          <ButtonDarkMode />
                                    </div> */}
                                    <ButtonNative
                                          onClick={() => setOpenModel(true)}
                                          textContent="Thay đổi ảnh bìa"
                                          className="w-[14rem] h-[3rem] sm:w-[16rem] sm:h-[4rem] px-[1rem] border-[.1rem] border-[var(--border-color-input)] bg-[#ffffff] hover:bg-color-main hover:text-[#fff] hover:border-none rounded-lg text-[#000]"
                                    />
                                    <DivNative className=" flex sm:hidden   items-center justify-center " title="Review">
                                          <ButtonNative
                                                textContent={`Review ${modeScreen}`}
                                                className="w-[14rem] h-[3rem] sm:w-[16rem] sm:h-[4rem] px-[1rem] rounded-md bg-color-main text-bg-input-theme"
                                                onClick={onSetScreen}
                                          />
                                    </DivNative>
                              </DivNative>
                        </React.Fragment>
                  )}
                  {openModel && <ModelFormImage setOpenModel={setOpenModel} MODE="BACKGROUND" />}
            </React.Fragment>
      );
};

export default FormBackground;
