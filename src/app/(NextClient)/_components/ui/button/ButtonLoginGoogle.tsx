import { getOAuthGoogleUrl } from "@/app/_lib/OAuth2";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ButtonLoginGoogle = () => {
      const oAuthUrl = getOAuthGoogleUrl();

      return (
            <Link
                  href={oAuthUrl}
                  className="!h-[3.6rem] w-full aspect-square flex hover:bg-[rgb(49_100_189)] text-[1.4rem] font-medium hover:text-[#fff] items-center justify-center gap-[1.4rem] border-[.1rem] border-border-page-color rounded-[.4rem] p-[.8rem_1rem] "
            >
                  <Image src={"/assets/images/social/google.png"} width={50} height={50} alt="toast success" className="w-[2rem] h-[2rem]" />
                  <span className="">Google</span>
            </Link>
      );
};

export default ButtonLoginGoogle;
