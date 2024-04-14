"use client";
import Link from "next/link";
import React from "react";

type TProps = {
	Url: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const ButtonNavigation = (props: TProps) => {
	const { Url, ...anchorProps } = props;

	return (
		<Link href={Url} {...anchorProps}>
			{Url}
		</Link>
	);
};

export default ButtonNavigation;
