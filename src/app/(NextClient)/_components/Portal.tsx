"use client";

import React from "react";
import { createPortal } from "react-dom";

type TProps = {
	children: React.ReactNode;
};

const Portal = (props: TProps) => {
	const { children } = props;
	return createPortal(children, document.querySelector("body") as HTMLBodyElement);
};

export default Portal;
