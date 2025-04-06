import { getOAuthGoogleUrl } from "@/app/_lib/OAuth2";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ButtonLoginGoogle = () => {
      const oAuthUrl = getOAuthGoogleUrl();

      return (
            <Link href={oAuthUrl} className="w-full h-full flex items-center justify-center gap-[1.4rem] border-[.1rem] border-[var(--border-color-input)] rounded-xl p-[.8rem_1rem] ">
                  <Image src={"/assets/images/icon/oauth2/google.png"} width={50} height={50} alt="toast success" className="w-[3rem] h-[3rem]" />
                  <span className="text-[1.5rem]">Google</span>
            </Link>
      );
};

export default ButtonLoginGoogle;
