import Link from "next/link";
import React, { useEffect } from "react";
import ButtonOpenModel from "../_components/ButtonOpenModel";
import LoginForm from "../_components/Model/LoginForm";
import RegisterForm from "../_components/Model/RegisterForm";
import { cookies } from "next/headers";
import ButtonLogOut from "../_components/ui/button/ButtonLogOut";
import CheckPathName from "../_components/CheckPathName";

export const colorPrimary = "text-violet-700";
export const backgroundPrimary = "text-violet-700";

const HomePage = () => {
	const _cookies = cookies().get("isAuthentication")?.value;
	console.log({ layout: "home page" });

	return (
		<div className="relative  min-h-screen h-max mx-auto  max-w-full  xl:max-w-[1280px] bg-[#ffffff]">
			<div className="absolute top-[40px] right-[40px] flex gap-[20px] bg-yellow-300">
				{!_cookies && (
					<>
						<ButtonOpenModel ModelComponent={LoginForm} ContentButton="Đăng nhập" />
						<ButtonOpenModel ModelComponent={RegisterForm} ContentButton="Đăng kí" />

						<Link href={"/login"}>Go to Login Page</Link>
						<Link href={"/register"}>Go to Register Page</Link>
						<Link href={"/dashboard"}>Go to DashBoardPage</Link>
					</>
				)}

				{_cookies && <ButtonLogOut />}
				<Link href={"/me"}>Go to Me Profile</Link>
			</div>
			<div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
				Permision Authencation
			</div>
		</div>
	);
};

export default HomePage;
