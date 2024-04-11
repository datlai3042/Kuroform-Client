"use client";

import React, { useEffect } from "react";
import LoginForm from "../_components/Model/LoginForm";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
	const router = useRouter();
	useEffect(() => {
		fetch("/v1/api/auth/set-token", { method: "POST", body: "" }).then(() => {
			router.push("/"), router.refresh();
		});
	}, []);

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
