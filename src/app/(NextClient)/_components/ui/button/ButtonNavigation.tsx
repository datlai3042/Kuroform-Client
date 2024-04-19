"use client";

import Link from "next/link";

export type ButtonCustomNavigation = {
	urlNavigation: string;
	textContent: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const ButtonNavigation = (props: ButtonCustomNavigation) => {
	const { urlNavigation, textContent, ...anchorProps } = props;
	console.log({ props });
	return (
		<>
			<Link
				tabIndex={-1}
				href={urlNavigation || "/"}
				{...anchorProps}
				className={`${anchorProps.className} p-[8px] text-[rgb(119_118_114)] text-[1.4rem] hover:bg-[rgba(55,53,47,0.09)] hover:text-[rgb(55_53_47)] transition-colors duration-200 rounded-[6px]`}
			>
				{textContent || "/"}
			</Link>
		</>
	);
};

export default ButtonNavigation;
