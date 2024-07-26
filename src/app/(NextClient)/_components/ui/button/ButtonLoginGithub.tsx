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
                  className="w-full flex items-center justify-center gap-[2rem] border-[.1rem] border-gray-200 rounded-xl p-[.8rem_1rem] bg-[#fff] text-[#000]"
            >
                  <Image src={"/assets/images/social/github.png"} width={50} height={50} alt="toast success" className="w-[2.4rem] h-[2.4rem]" />
                  <span className="text-[1.4rem]">Github</span>
            </button>
      );
};

export default ButtonLoginGithub;
