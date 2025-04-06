import { FormCore } from "@/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TProps = {
      form: FormCore.Form;
};

const DashboardFormSearchItem = (props: TProps) => {
      const { form } = props;

      return (
            <Link
            title={form?.form_title?.form_title_value}
                  href={`/form/${form._id}/summary`}
                  className=" hover:bg-color-main text-[#0bceb2] hover:text-[#fff]  p-[.8rem_1rem]  w-full min-h-[2.6rem]  max-h-[5.6rem] flex items-center gap-[1rem]"
            >
                  <Image
                        src={"/assets/images/icon/logo/logo_home.png"}
                        width={70}
                        height={70}
                        quality={100}
                        alt="logo"
                        className="w-[3rem] h-full object-contain"
                        unoptimized={true}
                  />
                  <p className="w-[90%] truncate font-bold text-[1.4rem]">{form?.form_title?.form_title_value}</p>
            </Link>
      );
};

export default DashboardFormSearchItem;
