import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import { TableCell } from "@/components/ui/table";
import { FormCore } from "@/type";
import { Eye, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

type TProps = {
      formCore: FormCore.Form;
};

const DashboardWorkspaceItemContent = (props: TProps) => {
      const { formCore } = props;

      const { theme } = useContext(ThemeContext);

      return (
            <>
                  <TableCell className="w-[54rem] group-hover:text-color-main">
                        <Link href={`/form/${formCore._id}/summary`} className="w-[54rem] flex items-center gap-[1.6rem] ">
                              {formCore.form_avatar?.form_avatar_url ? (
                                    <Image
                                          src={formCore.form_avatar?.form_avatar_url || ""}
                                          width={18}
                                          height={18}
                                          alt="icon"
                                          className="w-[3rem] h-[3rem] bg-sec p-[.3rem] rounded-[.6rem]"
                                          unoptimized={true}
                                    />
                              ) : (
                                    <div
                                          className={`${
                                                theme === "light" ? "bg-transparent" : "bg-[#fff]"
                                          }  min-w-[3rem] h-[3rem] rounded-full flex items-center justify-center`}
                                    >
                                          <Image
                                                src={"/icon_core.png"}
                                                width={20}
                                                height={20}
                                                alt="avatar"
                                                unoptimized={true}
                                                className="w-[3rem] h-[3rem] bg-[#fff] p-[.2rem] rounded-[.6rem]"
                                          />
                                    </div>
                              )}
                              <div className="w-[70%]">
                                    <p
                                          className="max-w-[100%] truncate h-[2.6rem] reset-editor"
                                          dangerouslySetInnerHTML={{ __html: formCore.form_title.form_title_value || "Chưa tạo tiêu đề" }}
                                    >
                                          {}
                                    </p>
                              </div>
                        </Link>
                  </TableCell>
                  <TableCell className="text-right text-color-main font-bold">
                        <span>{formCore.form_views || 0}</span>
                  </TableCell>
                  <TableCell className="text-right text-color-main font-bold">
                        <span>{formCore.form_response || 0}</span>
                  </TableCell>
            </>
      );
};

export default DashboardWorkspaceItemContent;
