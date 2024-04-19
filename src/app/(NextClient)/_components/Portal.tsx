"use client";

import React from "react";
import { createPortal } from "react-dom";

type TProps = {
	children: React.ReactNode;
};

const Portal = (props: TProps) => {
	console.log(typeof window);
	const { children } = props;
	if (typeof window !== "undefined") {
		return createPortal(children, document.querySelector("body") as HTMLBodyElement);
	} else {
		return null;
	}
};

export default Portal;
