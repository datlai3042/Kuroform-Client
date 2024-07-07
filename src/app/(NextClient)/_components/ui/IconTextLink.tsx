import React from "react";

type TProps = {
	Icon: React.ReactNode;
	Title: string;
	TextSub: string;
	TextLink: string;
	LinkColorBg: string;
	LinkTextColor: string;
	LinkIcon?: React.ReactNode;
};

const IconTextLink = (props: TProps) => {
	const { Icon, Title, TextSub, TextLink, LinkColorBg, LinkTextColor, LinkIcon } = props;

	return (
		<div className="border-shadow-normal p-[30px] bg-color-section-theme flex flex-col gap-[20px] rounded-xl text-[1.4rem] sm:text-[1.6rem]">
			{Icon}
			<p className="text-medium">{Title}</p>
			<p>{TextSub}</p>
			<button
				className={`${LinkColorBg} ${LinkTextColor} relative w-full h-[40px] rounded-md flex items-center justify-center`}
			>
				<span className="truncate">{TextLink}</span>
				{LinkIcon && <span className="absolute right-[20px]">{LinkIcon}</span>}
			</button>
		</div>
	);
};

export default IconTextLink;
