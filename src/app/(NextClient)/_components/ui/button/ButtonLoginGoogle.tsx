import { getOAuthGoogleUrl } from "@/app/_lib/OAuth2";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ButtonLoginGoogle = () => {
      const oAuthUrl = getOAuthGoogleUrl();

      return (
            <Link href={oAuthUrl} className="!h-[5.4rem] aspect-square flex hover:bg-background-page-color items-center justify-center gap-[1.4rem] border-[.1rem] border-[var(--border-color-input)] rounded-full p-[.8rem_1rem] ">
                  <Image src={"/assets/images/social/google.png"} width={50} height={50} alt="toast success" className="w-[3rem] h-[3rem]" />
            </Link>
      );
};

export default ButtonLoginGoogle;
