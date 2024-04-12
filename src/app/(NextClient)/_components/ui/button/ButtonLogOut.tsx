"use client";

import Http, { clientToken } from "@/app/_lib/http";
import { onLogout } from "@/app/_lib/redux/features/authentication.slice";
import React from "react";
import { useDispatch } from "react-redux";

const ButtonLogOut = () => {
	const dispatch = useDispatch();

	const handleLogout = async () => {
		const response = await Http.post<{ message: string }>("/v1/api/auth/logout", {}, { baseUrl: "" });
		if (response) {
			clientToken.accessToken = "";
			clientToken.refreshToken = "";
			clientToken.id = "";
			dispatch(onLogout());
		}
	};

	return <button onClick={handleLogout}>ButtonLogOut</button>;
};

export default ButtonLogOut;
