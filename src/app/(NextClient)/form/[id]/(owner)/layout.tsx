"use client";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import React, { useContext, useEffect, useState } from "react";
import HeaderEditForm from "./edit/components/HeaderEditForm";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import FormChangeMode from "./_components/FormChangeMode";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import FormService from "@/app/_services/form.service";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import LayoutSidebar from "@/app/(NextClient)/_components/Layout/LayoutSidebar";
import Link from "next/link";
import FormNotFound from "@/app/(NextClient)/_components/_StatusCodeComponent/FormNotFound";

export type FormPageMode = "edit" | "download" | "share" | "summary";

const FormModeLayout = ({ children, params }: { children: React.ReactNode; params: { id: string } }) => {
      const { modeScreen } = useContext(FormModeScreenContext);
      const segment = useSelectedLayoutSegments();
      const [formPageMode, setFormPageMode] = useState<FormPageMode>(segment[1] as FormPageMode);

      const dispatch = useDispatch();

      const getFormQuery = useQuery({
            queryKey: ["get-form", params.id],
            queryFn: () => FormService.getForm({ form_id: params.id }),
      });

      useEffect(() => {
            if (getFormQuery.isSuccess) {
                  const { form } = getFormQuery.data.metadata;
                  if (!!form) {
                        dispatch(onFetchForm({ form }));
                  }
            }
      }, [getFormQuery.isSuccess, params.id, getFormQuery.data, dispatch]);



      return (
            <LayoutSidebar>
                  {getFormQuery.data?.metadata.form !== null && (
                        <DivNative className={`bg-color-gap-empty  min-h-screen  h-max  flex flex-col  text-[1.4rem]   max-w-full `}>
                              <DivNative className={` w-full min-h-screen rounded-lg h-max  `}>
                                    {segment[0] !== "edit" && getFormQuery.data?.metadata.form && (
                                          <div className=" h-screen flex flex-col gap-[1rem] ">
                                                <HeaderEditForm showHeaderAction={segment[1] === "edit"} />

                                                <div className="flex-1  layout-down ">
                                                      <div className="h-[98.2%] ">
                                                            <div className="h-full  bg-color-section-theme  ">
                                                                  <FormChangeMode formPageMode={formPageMode} setFormPageMode={setFormPageMode}>
                                                                        {children}
                                                                  </FormChangeMode>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    )}
                                    {segment[0] === "edit" && getFormQuery.data?.metadata.form && children}
                              </DivNative>
                        </DivNative>
                  )}
                  {getFormQuery.isSuccess && getFormQuery.data?.metadata.form === null && <FormNotFound />}
            </LayoutSidebar>
      );
};

export default FormModeLayout;
