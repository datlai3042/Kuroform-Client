"use client";
import React, { useContext, useMemo } from "react";

import HeaderEditForm from "./components/HeaderEditForm";
import FormCore from "./components/FormCore";

import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import FormDesignCustom from "./components/FormDesign/FormDesignCustom";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { CSS } from "styled-components/dist/types";
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import { SidebarContext } from "@/app/(NextClient)/(user)/dashboard/SidebarContext";
import { Link } from "lucide-react";

const EditFormPage = ({ params }: { params: { id: string } }) => {
      const { modeScreen } = useContext(FormModeScreenContext);
      const { openFormDesign } = useContext(FormDesignContext);
      const { openSidebar, setOpenSidebar } = useContext(SidebarContext);

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const colorMain = useSelector((state: RootState) => state.form.colorCore);

      const containerStyleWhenOpenFormDesign = openFormDesign && !openSidebar && modeScreen === "NORMAL" ? "mr-[28rem]  " : "";

      const containerStyleWhenOpenSideBar = openSidebar && !openFormDesign ? "w-full " : "";

      const containerStyleWhenNormal = !openFormDesign && !openSidebar ? " w-full" : "";

      const containerStyleWhenOver = openFormDesign && openSidebar ? "w-full sm:w-[calc(100vw-29.5rem)] w-[calc(100vw-50.5rem)]" : "";

      const formColor = formCore.form_color || "bg-color-section-theme";

      const renderWidthMainContent = useMemo(() => {
            let width = "w-full";
            if (modeScreen === "FULL") {
                  return width;
            }
            if (openSidebar && !openFormDesign) {
                  width = "w-full xl:w-[calc(100vw-23rem)]";
            }

            if (!openSidebar && openFormDesign) {
                  width = "w-[calc(100vw-28rem)] w-[calc(100vw-27rem)]";
            }

            if (openSidebar && openFormDesign) {
                  width = "w-[calc(100vw-28rem)] xl:w-[calc(100vw-49.7rem)]";
            }
            return width;
      }, [openFormDesign, openSidebar]);

      return (
            <div className={`${renderWidthMainContent} flex flex-col min-h-screen h-max  `} style={{ "--bg-input-core": colorMain } as CSS.Properties}>
                  <HeaderEditForm showHeaderAction={true} />
                  {formCore && (
                        <div style={{ backgroundColor: formCore.form_color || "" }} className={`${formColor}   flex min-h-screen h-max `}>
                              <FormCore />
                              {openFormDesign && modeScreen === "NORMAL" ? <FormDesignCustom /> : null}
                        </div>
                  )}
            </div>
      );
};

export default EditFormPage;
