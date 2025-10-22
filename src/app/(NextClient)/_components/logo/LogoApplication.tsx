import Image from "next/image";
import Link from "next/link";
import React from "react";

const LogoApplication = () => {
  return (
    <Link href={"/"} className="flex gap-[1rem]">
      <Image
        unoptimized={true}
        src={"/assets/images/logo/main_logo.png"}
        width={20}
        height={20}
        alt="avatar"
        className="w-[4rem] h-[4rem] object-cover rounded-full"
      />
      <span className="gradient-app-name text-[2.4rem] font-semibold">
        Kuroform
      </span>
    </Link>
  );
};

export default LogoApplication;
