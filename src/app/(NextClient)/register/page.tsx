"use client";

import React from "react";
import Link from "next/link";
import RegisterForm from "../_components/Model/RegisterForm";
import Image from "next/image";

const RegisterPage = () => {
	return (
		<div className="p-[16px] ">
			<header className="relative z-[301] p-[10px] xl:p-[10px] flex justify-between items-center ">
				<Link href={"/"}>
					<Image
						src={"/assets/images/icon/logo_v2.png"}
						width={70}
						height={28}
						alt="logo"
						className="w-[70px] h-[28px]"
					/>
				</Link>
			</header>
			<RegisterForm />
		</div>
	);
};

export default RegisterPage;
