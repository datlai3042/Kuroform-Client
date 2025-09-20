"use client";

import Http from "@/app/_lib/http";
import { RootState } from "@/app/_lib/redux/store";
import { checkValueHref } from "@/app/_lib/utils";
import { TUserRecent } from "@/app/_schema/user/user.type";
import useLogout from "@/app/hooks/user/useLogout";
import { LogOutIcon } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export interface ButtonCustomProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      textContent?: string;
}

const ButtonLogOut = (props: ButtonCustomProps) => {
      const { textContent = "Đăng xuất", ...buttonProps } = props;
      const logoutAPI = useLogout();
      const user = useSelector((state: RootState) => state?.authReducer.user);
      const onUpdateUserRecent = () => {
            const loginUserRecents = localStorage.getItem("userRecents");
            if (loginUserRecents) {
                  const parseJSON = JSON.parse(loginUserRecents);
                  const data = (Array.isArray(parseJSON) ? parseJSON : []) as TUserRecent[];
                  const index = data?.findIndex((userRecent) => userRecent._id === user?._id);
                  if (index >= 0 && user) {
                        const newData = structuredClone(data);
                        newData[index] = {
                              _id: user?._id as string,

                              avatar: checkValueHref(user?.user_avatar_current) ? user?.user_avatar_current : user?.user_avatar_system,
                              name: user?.user_last_name || user?.user_email?.split("@")[0],
                              user_first_name: user?.user_first_name,
                              user_last_name: user?.user_last_name,
                              email: user?.user_email,
                        };
                        localStorage.setItem("userRecents", JSON.stringify(newData));
                  }
            }
      };

      return (
            <button
                  {...buttonProps}
                  onClick={() => {
                        logoutAPI.mutate();
                        onUpdateUserRecent();
                  }}
            >
                  <LogOutIcon size={18} />
                  {textContent}
            </button>
      );
};

export default ButtonLogOut;
