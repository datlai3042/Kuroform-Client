"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonLoginGithub = () => {
      const onLoginGithub = () => {
            window.location.assign(`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user:email`);
      };

      return (
            <button
                  onClick={onLoginGithub}
                  className="!h-[5.4rem] aspect-square flex items-center justify-center gap-[1.4rem] border-[.1rem] border-[var(--border-color-input)] hover:bg-background-page-color rounded-full  text-[#000]"
            >
                  <Image src={"/assets/images/social/github.png"} width={50} height={50} alt="toast success" className="w-[3rem] h-[3rem]" />
            </button>
      );
};

export default ButtonLoginGithub;
