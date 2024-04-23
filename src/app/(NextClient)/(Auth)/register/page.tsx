"use client";

import React from "react";
import Link from "next/link";
import RegisterForm from "../../_components/Model/RegisterForm";
import Image from "next/image";

const RegisterPage = () => {
	return (
		<div className="w-full p-[16px] ">
			<RegisterForm />
		</div>
	);
};

export default RegisterPage;
