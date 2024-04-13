"use client";

import Http, { clientToken } from "@/app/_lib/http";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ButtonNavigation from "../_components/ui/button/ButtonNavigation";
import { abort } from "process";

const RefreshTokenPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const oldToken = searchParams.get("old_token");
	const new_access_token = searchParams.get("new_access_token");
	const new_refresh_token = searchParams.get("new_refresh_token");
	const domain = searchParams.get("domain");
	const user_id = searchParams.get("user_id");

	useEffect(() => {
		const abort = new AbortController();
		if (oldToken === clientToken.refreshToken) {
			console.log("run api ");
			const signal = abort.signal;
			const setTokenApi = Http.post(
				"/v1/api/auth/set-token",
				{
					access_token: new_access_token,
					refresh_token: new_refresh_token,
					_id: user_id,
				},
				{ baseUrl: "", signal }
			).then(() => {
				clientToken.accessToken = new_access_token as string;
				clientToken.refreshToken = new_refresh_token as string;
				// router.push("/");
			});
		}

		return () => {
			abort.abort();
		};
	}, [router, new_access_token, new_refresh_token, user_id, oldToken, domain]);

	if (oldToken !== clientToken.refreshToken) {
		return (
			<>
				<ButtonNavigation Url="/dashboard" />
				<p>Page Không tồn tại</p>;
			</>
		);
	}

	return (
		<div className="flex flex-col gap-10 ">
			<p className="w-[360px] break-words">Client ref: {clientToken.refreshToken}</p>
			<p className="w-[360px] break-words">Server ref: {oldToken}</p>
			<ButtonNavigation Url="/dashboard" />
		</div>
	);
};

export default RefreshTokenPage;
