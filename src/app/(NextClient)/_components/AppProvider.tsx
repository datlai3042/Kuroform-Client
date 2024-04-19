"use client";
import { clientToken } from "@/app/_lib/http";

import React, { useRef, useState } from "react";

type TProps = {
	id: string;
	access_token: string;
	refresh_token: string;
	children: React.ReactNode;
};

const AppProvider = (props: TProps) => {
	const { id, access_token, refresh_token, children } = props;
	const count = useRef(1);
	console.log({ message: "re-render when token onChange" });
	useState(() => {
		if (typeof window !== undefined) {
			clientToken.id = id;
			clientToken.accessToken = access_token;
			clientToken.refreshToken = refresh_token;
		}
	});

	console.log({ App: "App layout" });
	console.log({ refresh_token });
	console.log(count.current);
	count.current += 1;

	return <div className="p-[16px] xl:p-0">{children}</div>;
};

export default AppProvider;
