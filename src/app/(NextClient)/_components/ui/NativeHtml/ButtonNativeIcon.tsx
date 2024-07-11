"use client";

import React from "react";

export interface ButtonNativeIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent: string;
	icon: React.ReactNode;
}

const ButtonNativeIcon = (props: ButtonNativeIconProps) => {
	const { textContent, icon, ...buttonProps } = props;
	return (
		<button {...buttonProps} className={` ${buttonProps.className}`}>
			<span className="hidden xl:inline">{icon}</span>
			{textContent}
		</button>
	);
};

export default ButtonNativeIcon;
