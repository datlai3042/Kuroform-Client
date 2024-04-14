"use client";

import Http, { clientToken } from "@/app/_lib/http";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ButtonNavigation from "../_components/ui/button/ButtonNavigation";
import { abort } from "process";

const RefreshTokenPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [certain, setCertain] = useState(false);

	const oldToken = searchParams.get("old_token");
	const new_access_token = searchParams.get("new_access_token");
	const new_refresh_token = searchParams.get("new_refresh_token");
	const pathName = searchParams.get("pathName") || "/";
	const user_id = searchParams.get("user_id");
	let retry: null | Promise<any> = null;

	const [process, setProcess] = useState(false);

	useEffect(() => {
		const abort = new AbortController();
		if (oldToken !== clientToken.refreshToken) {
			// setProcess(true);
			router.refresh();
		}
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
				console.log("alo");
				router.push(pathName);
				router.refresh();
			});
			// .finally(() => setProcess(true));
		}

		return () => {
			router.refresh();
			abort.abort();
		};
	}, [router, new_access_token, new_refresh_token, user_id, oldToken, pathName]);

	if (oldToken !== clientToken.refreshToken) {
		return (
			<div className="w-screen h-screen flex  justify-center items-center gap-[20px]">
				<div className="w-[500px] h-[500px] flex flex-col justify-center items-center shadow-2xl shadow-blue-400 rounded-xl">
					<p>Page Không tồn tại {JSON.stringify(process)}</p>;
					<ButtonNavigation Url="/dashboard" onClick={() => {}} />
				</div>
			</div>
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
