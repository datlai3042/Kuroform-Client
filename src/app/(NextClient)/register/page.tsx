"use client";

import React from "react";
import Link from "next/link";
import RegisterForm from "../_components/Model/RegisterForm";

const RegisterPage = () => {
	return (
		<div className="p-[16px] ">
			<Link href={"/"} className="relative z-[999] bg-[#ffffff]">
				Quay lại trang chủ
			</Link>
			<RegisterForm />
		</div>
	);
};

export default RegisterPage;
