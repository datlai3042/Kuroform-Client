"use client";
import { clientToken } from "@/app/_lib/http";

import React, { useRef, useState } from "react";

type TProps = {
	children: React.ReactNode;
};

const AppProvider = (props: TProps) => {
	const { children } = props;
	const count = useRef(1);
	console.log({ message: "re-render when token onChange" });

	console.log(count.current);
	count.current += 1;

	return <div className="">{children}</div>;
};

export default AppProvider;
