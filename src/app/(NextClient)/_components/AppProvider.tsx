"use client";
import { clientToken } from "@/app/_lib/http";

import React, { useState } from "react";

type TProps = {
	id: string;
	access_token: string;
	refresh_token: string;
	children: React.ReactNode;
};

const AppProvider = (props: TProps) => {
	const { id, access_token, refresh_token, children } = props;
	console.log({ id, access_token, refresh_token });
	useState(() => {
		if (typeof window !== undefined) {
			clientToken.id = id;
			clientToken.accessToken = access_token;
			clientToken.refreshToken = refresh_token;
		}
	});

	return <div>{children}</div>;
};

export default AppProvider;
