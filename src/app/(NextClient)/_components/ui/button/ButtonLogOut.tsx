"use client";

import Http from "@/app/_lib/http";
import useLogout from "@/app/hooks/user/useLogout";
import { LogOutIcon } from "lucide-react";
import React from "react";

export interface ButtonCustomProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent?: string;
}

const ButtonLogOut = (props: ButtonCustomProps) => {

const {textContent = 'Đăng xuất', ...buttonProps} = props
      const logoutAPI = useLogout()

    return   <button {...buttonProps} onClick={() => logoutAPI.mutate()}>
          <LogOutIcon size={18} />
{textContent}
    </button>
};

export default ButtonLogOut;
