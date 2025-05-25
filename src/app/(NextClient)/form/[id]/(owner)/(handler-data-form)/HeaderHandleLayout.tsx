"use client";

import DashboardSearchForm from "@/app/(NextClient)/(user)/dashboard/_components/DashboardSearchForm";
import { SidebarContext } from "@/app/(NextClient)/(user)/dashboard/SidebarContext";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import ButtonDarkMode from "@/app/(NextClient)/_components/ui/button/ButtonDarkMode";
import ButtonSidebar from "@/app/(NextClient)/_components/ui/button/ButtonSidebar";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";

type TProps = {
      showHeaderAction: boolean;
};

const renderText = (form_state: FormCore.FormState) => {
      let textMessage = "";
      if (form_state === "isPublic") textMessage = "Công khai";
      if (form_state === "isPrivate") textMessage = "Riêng tư";
      if (form_state === "isDelete") textMessage = "Xóa";
      return textMessage;
};
const HeaderHandlerLayout = (props: TProps) => {
      const { showHeaderAction } = props;

      const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
      const { modeScreen, setModeScreen } = useContext(FormModeScreenContext);
      const { openFormDesign } = useContext(FormDesignContext);

      const [openModelFormState, setOpenModelFormState] = useState<boolean>(false);

      const pathName = usePathname();

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

      const onSetScreen = () => {
            if (modeScreen === "FULL") return setModeScreen("NORMAL");
            setModeScreen("FULL");
            setOpenSidebar(false);
      };

      const styleEffect = {
            onCheckLengthTitle: () => {
                  return formCore?.form_title ? "w-max max-w-[9rem] sm:max-w-[22rem]" : "w-max";
            },
      };

      const label = renderText(formCore.form_state);

      if (modeScreen === "FULL") return null;

      const top = pathName.endsWith("/edit") ? "top-0" : "";

      return (
            <DivNative
                  className={`${top}    bg-color-section-theme sticky top-0  left-[28rem] right-[3rem] z-[101] flex-wrap   w-auto  flex  justify-between  gap-[2rem]  p-[0rem_2rem] text-[1.3rem]`}
            >
                  <div className="w-full flex h-full items-center gap-[1rem]">
                        <DivNative className="flex h-[3.6rem]  items-center gap-[2rem]   text-textHeader ">
                              <div className="mr-[2rem]">
                                    <DivNative className="h-full flex gap-[.2rem] items-center  min-w-max">
                                          <span>[FORM]:</span>

                                          <div
                                                className={`${styleEffect.onCheckLengthTitle()} h-[3.6rem] reset-editor truncate text-[1.5rem] font-bold p-[.6rem] rounded-lg text-text-theme `}
                                                dangerouslySetInnerHTML={{ __html: formCore?.form_title.form_title_value || "Không tiêu đề" }}
                                          ></div>
                                    </DivNative>
                              </div>
                        </DivNative>

                        <div className="ml-auto flex items-center gap-[1rem] ">
                              <div className="hidden md:block">
                                    <DashboardSearchForm widthInput="18rem" />
                              </div>
                              <div className="   flex justify-end my-[1rem]">
                                    <ButtonDarkMode />
                              </div>
                        </div>
                        <ButtonSidebar />
                  </div>
            </DivNative>
      );
};

export default HeaderHandlerLayout;
