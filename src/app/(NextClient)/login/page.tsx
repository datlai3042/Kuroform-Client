"use client";

import React, { useEffect } from "react";
import LoginForm from "../_components/Model/LoginForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginPage = () => {
	const router = useRouter();

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

			<LoginForm />
		</div>
	);
};

export default LoginPage;
