import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import { FormCore } from "@/type";
import Image from "next/image";
import React, { useContext } from "react";

type TProps = {
      formCore: FormCore.Form;
};

const DashboardWorkspaceItemContent = (props: TProps) => {
      const { formCore } = props;

      const { theme } = useContext(ThemeContext);

      return (
            <>
                  {formCore.form_avatar?.form_avatar_url ? (
                        <Image
                              src={formCore.form_avatar?.form_avatar_url || ""}
                              width={18}
                              height={18}
                              alt="icon"
                              className="w-[3rem] h-[3rem] rounded-full"
                              unoptimized={true}
                        />
                  ) : (
                        <div
                              className={`${
                                    theme === "light" ? "bg-transparent" : "bg-[#fff]"
                              }  min-w-[3rem] h-[3rem] rounded-full flex items-center justify-center`}
                        >
                              <Image src={"/icon_core.png"} width={20} height={20} alt="avatar" unoptimized={true} className="w-[2rem] h-[2rem] " />
                        </div>
                  )}
                  <p className="max-w-[80%] truncate ">{formCore.form_title.form_title_value || "Chưa tạo tiêu đề"}</p>
            </>
      );
};

export default DashboardWorkspaceItemContent;
