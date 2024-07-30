"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CheckPathName = () => {
	const pathName = usePathname();
	const router = useRouter();



	return <div>{/* CheckPathName {pathName} (-) {access_token} */}</div>;
};

export default CheckPathName;
