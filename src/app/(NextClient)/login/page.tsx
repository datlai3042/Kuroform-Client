"use client";

import React from "react";
import LoginForm from "../_components/Model/LoginForm";
import Link from "next/link";

const LoginPage = () => {
	return (
		<div className="p-[16px] ">
			<Link href={"/"} className="relative z-[999] bg-[#ffffff]">
				Quay lại trang chủ
			</Link>
			<LoginForm />
		</div>
	);
};

export default LoginPage;
