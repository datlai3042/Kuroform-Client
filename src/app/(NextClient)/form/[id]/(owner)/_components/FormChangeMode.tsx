import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { FormPageMode } from "../layout";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { LinkIcon, Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";
import BoxCopySuccess from "./BoxCopySuccess";
import { Tabs, TabsProps } from "antd";
import ContentWrapper from "../(handler-data-form)/ContentWrapper";
import ButtonDeleteForm from "./ButtonDeleteForm";
import { DialogFormAction } from "./DialogFormAction";

type TProps = {
      formPageMode: FormPageMode;
      setFormPageMode: React.Dispatch<SetStateAction<FormPageMode>>;
      children: React.ReactNode;
};


const items: TabsProps["items"] = [
      {
            key: "summary",
            label: "Thông tin chung",
      },
      {
            key: "download",
            label: "Tải xuống",
      },
      {
            key: "share",
            label: "Chia sẽ",
      },
];

const FormChangeMode = (props: TProps) => {
      const { children, formPageMode, setFormPageMode } = props;

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const segment = useSelectedLayoutSegments();
      const defaultTab = segment[1] as FormPageMode;
      const fontSize = formCore.form_title.form_title_size
            ? formCore.form_title.form_title_size / 10 + "rem"
            : formCore.form_setting_default.form_title_size_default / 10 + "rem";

      const color = formCore.form_title.form_title_color ? formCore.form_title.form_title_color : formCore.form_setting_default.form_title_color_default;

      const fontStyle = formCore.form_title.form_title_style ? formCore.form_title.form_title_style : formCore.form_setting_default.form_title_style_default;

      const avatarSrc = formCore.form_avatar?.form_avatar_url || formCore.form_setting_default.form_avatar_default_url || "";

      const styleEffect = {
            linkActive: (checkLink: boolean) => {
                  if (!checkLink) return "border-transparent";
                  return "border-transparent hover:border-transparent font-bold";
            },
      };


      return (
            <div className=" w-full p-[2rem_2rem]  mx-auto h-full flex  flex-col gap-[1rem] text-text-theme">
                  <div className="flex justify-between">
                        <span className="text-[#a0a5b3]">##-{formCore._id}-##</span>

                        <div>
                              <DialogFormAction />
                             
                        </div>
                  </div>

                  <div id="content-info" className="w-full flex  gap-[2rem] flex-row items-center">
                        {avatarSrc ? (
                              <Image src={avatarSrc} width={30} height={30} alt="avatar" className="min-w-[3rem] w-[3rem] h-[3rem] rounded-full" />
                        ) : (
                              <div className="animate-pulse min-w-[4rem] w-[4rem] h-[4rem] rounded-full bg-slate-200 "></div>
                        )}
                        <div
                              dangerouslySetInnerHTML={{
                                    __html: formCore.form_title.form_title_plain_text || formCore.form_title.form_title_value || "Không có tiêu đề",
                              }}
                              title={formCore.form_title.form_title_plain_text}
                              className="reset-editor text-[1.8rem] not-italic line-clamp-2 flex-1 text-text-theme font-medium"
                              style={
                                    {
                                          // fontSize,
                                          // fontStyle,
                                    }
                              }
                        ></div>
                  </div>
                  <Tabs
                        className="content-tab"
                        id="custom-tabs"
                        style={{ color: "#fff" }}
                        defaultActiveKey={defaultTab}
                        onChange={(value) => setFormPageMode(value as FormPageMode)}
                  >
                        <Tabs.TabPane
                              key="summary"
                              tab={
                                    <Link
                                          style={{ color: formPageMode === "summary" ? "var(--color-main)" : "", fontWeight: 600 }}
                                          onClick={() => setFormPageMode("summary")}
                                          href={`/form/${formCore._id}/summary`}
                                          className={`${styleEffect.linkActive(
                                                formPageMode === "summary",
                                          )} hover:border-b-[.4rem] text-[1.5rem] pb-[.9rem] font-semibold  hover:border-[var(--color-main)] text-text-theme`}
                                    >
                                          Thông tin chung
                                    </Link>
                              }
                        />
                        <Tabs.TabPane
                              key="download"
                              tab={
                                    <Link
                                          style={{ color: formPageMode === "download" ? "var(--color-main)" : "", fontWeight: 600 }}
                                          onClick={() => setFormPageMode("download")}
                                          href={`/form/${formCore._id}/download`}
                                          className={`${styleEffect.linkActive(
                                                formPageMode === "download",
                                          )} hover:border-b-[.4rem] text-[1.5rem] pb-[.9rem] font-semibold  hover:border-[var(--color-main)] text-text-theme`}
                                    >
                                          Tải xuống
                                    </Link>
                              }
                        />
                        <Tabs.TabPane
                              key="share"
                              tab={
                                    <Link
                                          style={{ color: formPageMode === "share" ? "var(--color-main)" : "", fontWeight: 600 }}
                                          onClick={() => setFormPageMode("share")}
                                          href={`/form/${formCore._id}/share`}
                                          className={`${styleEffect.linkActive(
                                                formPageMode === "share",
                                          )} hover:border-b-[.4rem] text-[1.5rem] pb-[.9rem] font-semibold  hover:border-[var(--color-main)] text-text-theme`}
                                    >
                                          Chia sẻ
                                    </Link>
                              }
                        />
                  </Tabs>

                  <ContentWrapper>{children}</ContentWrapper>
            </div>
      );
};

export default FormChangeMode;
