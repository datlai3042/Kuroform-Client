"use client";

import React from "react";
import LoginForm from "../../_components/Model/LoginForm";
import { useRouter } from "next/navigation";

const LoginPage = () => {
	const router = useRouter();

	return (
		<div className=" p-[16px]  ">
			<LoginForm />
		</div>
	);
};

export default LoginPage;
