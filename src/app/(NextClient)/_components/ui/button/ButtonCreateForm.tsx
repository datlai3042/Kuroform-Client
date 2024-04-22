"use client";

import React from "react";
import { ButtonCustomProps } from "./Button";
import { ButtonCustomNavigation } from "./ButtonNavigation";
import Link from "next/link";

interface TProps extends ButtonCustomNavigation {
	icon?: React.ReactNode;
	position?: "LEFT" | "RIGHT";
}

const ButtonCreateForm = (props: TProps) => {
	const { textContent, urlNavigation, position = "LEFT", icon, ...AnchorProps } = props;

	return (
		<Link
			tabIndex={-1}
			href={urlNavigation}
			{...AnchorProps}
			className={`${AnchorProps.className}  p-[6px_12px] flex  justify-center items-center gap-[.8rem] text-[1.8rem] text-[#ffffff] bg-[rgb(0_112_215)] opacity-[.95] hover:opacity-100 transition-colors duration-200 rounded-[.6rem]`}
		>
			{position === "LEFT" && icon && icon}
			{textContent}
			{position === "RIGHT" && icon && icon}
		</Link>
	);
};

export default ButtonCreateForm;
