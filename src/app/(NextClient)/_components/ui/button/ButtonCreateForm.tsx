"use client";

import React from "react";
import { ButtonCustomProps } from "./Button";
import { ButtonCustomNavigation } from "./ButtonNavigation";
import Link from "next/link";

interface TProps extends ButtonCustomNavigation {
	icon?: React.ReactNode;
}

const ButtonCreateForm = (props: TProps) => {
	const { textContent, urlNavigation, icon, ...AnchorProps } = props;

	return (
		<Link
			tabIndex={-1}
			href={urlNavigation}
			{...AnchorProps}
			className={`${AnchorProps.className}  p-[8px_10px]  justify-center items-center gap-[8px] text-[14px] text-[#ffffff] bg-[rgb(0_112_215)] opacity-[.9] hover:opacity-100 transition-colors duration-200 rounded-[6px]`}
		>
			{textContent}
			{icon && icon}
		</Link>
	);
};

export default ButtonCreateForm;
