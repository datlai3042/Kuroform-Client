"use client";

import Http, { clientToken } from "@/app/_lib/http";
import { onLogout } from "@/app/_lib/redux/features/authentication.slice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const ButtonLogOut = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const handleLogout = async () => {
		const response = await Http.post<{ message: string }>("/v1/api/auth/logout", {}, { baseUrl: "" });
		if (response) {
			clientToken.accessToken = "";
			clientToken.refreshToken = "";
			clientToken.id = "";
			dispatch(onLogout());
			router.push("/");
		}
	};

	// return <button onClick={handleLogout}>ButtonLogOut</button>;
	return <Link href={"/"}>Trang chủ</Link>;
};

export default ButtonLogOut;
