import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { FormPageMode } from "../layout";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { LinkIcon, Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BoxCopySuccess from "./BoxCopySuccess";
import { Tabs, TabsProps } from "antd";

type TProps = {
      formPageMode: FormPageMode;
      setFormPageMode: React.Dispatch<SetStateAction<FormPageMode>>;
      children: React.ReactNode;
};

const iconSize = 16;

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
      const router = useRouter();

      const fontSize = formCore.form_title.form_title_size
            ? formCore.form_title.form_title_size / 10 + "rem"
            : formCore.form_setting_default.form_title_size_default / 10 + "rem";

      const color = formCore.form_title.form_title_color ? formCore.form_title.form_title_color : formCore.form_setting_default.form_title_color_default;

      const fontStyle = formCore.form_title.form_title_style ? formCore.form_title.form_title_style : formCore.form_setting_default.form_title_style_default;

      const avatarSrc = formCore.form_avatar?.form_avatar_url || formCore.form_setting_default.form_avatar_default_url || "";

      const styleEffect = {
            linkActive: (checkLink: boolean) => {
                  if (!checkLink) return "border-transparent";
                  return "border-[var(--color-main)] font-bold";
            },
      };

      const [copySuccess, setCopySuccess] = useState<boolean>(false);

      const timeoutRef = useRef<NodeJS.Timeout | null>(null);

      useEffect(() => {
            if (copySuccess) {
                  const time = 3000;
                  timeoutRef.current = setTimeout(() => setCopySuccess(false), time);
            }

            return () => {
                  clearTimeout(timeoutRef.current as NodeJS.Timeout);
            };
      }, [copySuccess]);

      return (
            <div className=" w-full p-[2rem_6rem]  mx-auto h-full flex  flex-col gap-[1rem] text-text-theme">
                  <div className="w-full flex flex-col gap-[2rem] xl:flex-row justify-between">
                        <h1
                              title={formCore.form_title.form_title_value}
                              className="line-clamp-2 w-[80%] text-text-theme"
                              style={{
                                    // fontSize,
                                    fontStyle,
                                    fontSize: "2.4rem",
                              }}
                        >
                              {formCore?.form_title?.form_title_value}
                        </h1>
                        <div className="flex items-center gap-[1rem]">
                              <div className="relative ">
                                    <button
                                          onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                navigator.clipboard
                                                      .writeText(`${window.location.origin}/form/${formCore._id}`)
                                                      .then(() => setCopySuccess(true));
                                          }}
                                          className="hover:text-[#fff] flex items-center gap-[1rem] p-[.5rem_.7rem] hover:bg-color-main rounded-lg"
                                    >
                                          <LinkIcon size={iconSize} />
                                    </button>
                                    {copySuccess && (
                                          <div className="absolute bottom-[-4rem] left-0 text-text-theme">
                                                <BoxCopySuccess message="Copy link chia sẽ thành công" />
                                          </div>
                                    )}
                              </div>

                              {avatarSrc ? (
                                    <Image src={avatarSrc} width={30} height={30} alt="avatar" className="w-[3rem] h-[3rem] rounded-full" />
                              ) : (
                                    <div className="animate-pulse w-[3rem] h-[3rem] rounded-full bg-slate-200 "></div>
                              )}

                              <button
                                    className="hover:text-[#fff] min-w-[12rem] flex items-center gap-[1rem] p-[.5rem_.7rem] hover:bg-color-main rounded-lg"
                                    onClick={(e) => {
                                          e.preventDefault();
                                          router.push(`/form/${formCore._id}/edit`);
                                    }}
                              >
                                    <Pencil size={iconSize} />
                                    <span>Chỉnh sửa</span>
                              </button>
                        </div>
                  </div>
                  <Tabs id="custom-tabs" style={{ color: "#fff" }} defaultActiveKey="summary" onChange={(value) => setFormPageMode(value as FormPageMode)}>
                        <Tabs.TabPane
                              key="summary"
                              tab={
                                    <Link
                                          style={{ color: formPageMode === "summary" ? "var(--color-main)" : "", fontWeight: 600 }}
                                          onClick={() => setFormPageMode("summary")}
                                          href={`/form/${formCore._id}/summary`}
                                          className={`${styleEffect.linkActive(
                                                formPageMode === "summary",
                                          )} border-b-[.4rem] pb-[.9rem] font-semibold  hover:border-[var(--color-main)] text-text-theme`}
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
                                          )} border-b-[.4rem] pb-[.9rem] font-semibold  hover:border-[var(--color-main)] text-text-theme`}
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
                                          )} border-b-[.4rem] pb-[.9rem] font-semibold  hover:border-[var(--color-main)] text-text-theme`}
                                    >
                                          Chia sẻ
                                    </Link>
                              }
                        />
                  </Tabs>

                  <div className="flex-1">
                        <div className="h-full">{children}</div>
                  </div>
            </div>
      );
};

export default FormChangeMode;
