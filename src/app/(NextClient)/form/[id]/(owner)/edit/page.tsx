"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";

import HeaderEditForm from "./components/HeaderEditForm";
import FormCore from "./components/FormCore";

import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import FormDesignCustom from "./components/FormDesign/FormDesignCustom";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { CSS } from "styled-components/dist/types";
import { usePathname, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import { SidebarContext } from "@/app/(NextClient)/(user)/dashboard/SidebarContext";
import { Link } from "lucide-react";
import { useDebouncedCallback } from "@mantine/hooks";

const EditFormPage = ({ params }: { params: { id: string } }) => {
      const { modeScreen } = useContext(FormModeScreenContext);
      const { openFormDesign } = useContext(FormDesignContext);
      const { openSidebar } = useContext(SidebarContext);

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const colorMain = useSelector((state: RootState) => state.form.colorCore);
      const [widthSectionDesign, setWidthSectionDesin] = useState(0);
      const [widthSidebar, setWidthSidebar] = useState(0);

      const formColor = formCore.form_color || "bg-color-section-theme";
      const handlerBrowserResize = useDebouncedCallback(() => {
            const sectionDesign = document.getElementById("section-design");
            const sectionSidebar = document.getElementById("section-sidebar");

            if (sectionDesign) {
                  const widthSectionDesign = sectionDesign.clientWidth || 0;
                  setWidthSectionDesin(widthSectionDesign);
            } else {
                  setWidthSectionDesin(0);
            }

            if (sectionSidebar) {
                  const widthSectionbar = sectionSidebar.clientWidth || 0;
                  setWidthSidebar(widthSectionbar);
            } else {
                  setWidthSidebar(0);
            }
      }, 60);
      useEffect(() => {
            handlerBrowserResize();
      }, [openFormDesign, handlerBrowserResize, openSidebar]);

      useEffect(() => {
            window.addEventListener("resize", handlerBrowserResize);

            return () => {
                  window.removeEventListener("resize", handlerBrowserResize);
            };
      }, []);
      const pathname = usePathname();
      const widthParent = pathname?.includes("/form") ? "100vw" : "100%";

      return (
            <div
                  className={` flex flex-col min-h-screen h-max  `}
                  style={
                        {
                              width: `calc(${widthParent} - ${widthSectionDesign + (widthParent === "100%" ? 0 : 0)}px - ${widthSidebar}px `,
                              "--bg-input-core": colorMain,
                        } as CSS.Properties
                  }
            >
                  {formCore?.screen !== "profile" && <HeaderEditForm showHeaderAction={true} />}
                  {formCore && (
                        <div
                              style={{ backgroundColor: (modeScreen === "FULL" && formCore.form_color) || "" }}
                              className={`${formColor}  bg-color-section-theme  flex min-h-screen h-max `}
                        >
                              <FormCore />
                              {openFormDesign && modeScreen === "NORMAL" ? <FormDesignCustom /> : null}
                        </div>
                  )}
            </div>
      );
};

export default EditFormPage;
