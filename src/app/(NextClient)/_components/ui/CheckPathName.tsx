"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type TProps = {
	access_token: string;
};

const CheckPathName = (props: TProps) => {
	const { access_token } = props;

	const pathName = usePathname();
	const router = useRouter();

	// useEffect(() => {
	// 	console.log({ Layout: "CheckPathName" });
	// 	console.log({ access_token });
	// 	router.refresh();
	// }, [access_token, router]);

	return <div>{/* CheckPathName {pathName} (-) {access_token} */}</div>;
};

export default CheckPathName;
