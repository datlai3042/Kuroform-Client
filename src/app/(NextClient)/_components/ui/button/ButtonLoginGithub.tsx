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
                  className="!h-[3.6rem] w-full aspect-square flex hover:bg-[rgb(49_100_189)] text-[1.4rem] font-medium hover:text-[#fff] text-[#333] items-center justify-center gap-[1.4rem] border-[.1rem] border-border-page-color rounded-[.4rem] p-[.8rem_1rem] "
                  onClick={onLoginGithub}
            >
                  <Image src={"/assets/images/social/github.png"} width={50} height={50} alt="toast success" className="w-[2rem] h-[2rem]" />
                  <span className="">Github</span>
            </button>
      );
};

export default ButtonLoginGithub;
