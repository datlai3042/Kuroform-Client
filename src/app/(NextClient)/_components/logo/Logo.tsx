"use client";
import { RootState } from "@/app/_lib/redux/store";
import { UserType } from "@/app/_schema/user/user.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Logo = () => {
      const user = useSelector((state: RootState) => state.authReducer.user) as UserType;

      return (
            <Link href={"/"}>
                  {user?.user_avatar_current && (
                        <Image
						unoptimized={true}
						src={user.user_avatar_current} width={20} height={20} alt="avatar" className="w-[12rem] h-[12rem] object-cover rounded-full" />
                  )}
                  {!user?.user_avatar_current && (
                        <div className="w-[12rem] h-[12rem] object-cover rounded-full">{user?.user_first_name.slice(0, 1) || user?.user_email?.slice(0, 1)}</div>
                  )}
            </Link>
      );
};

export default Logo;
