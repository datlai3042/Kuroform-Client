"use client";

import React from "react";

export interface ButtonCustomProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent: string;
}

const Button = (props: ButtonCustomProps) => {
	const { textContent, ...buttonProps } = props;
	return (
		<button
			{...buttonProps}
			className={`w-full xl:w-[50%] min-h-[30px] h-max p-[16px_20px] bg-slate-900 text-white  rounded-md ${buttonProps.className}`}
		>
			{textContent}
		</button>
	);
};

export default Button;
