import Image from "next/image";
import React from "react";

type TProps = {
	BlockquoteContent: string;
	ImagePath: string;
	Author: string;
	Description: string;
};

const BlockQuote = (props: TProps) => {
	const { BlockquoteContent, ImagePath, Author, Description } = props;

	return (
		<div className="w-full mt-[30px] px-[20px] flex flex-col gap-[24px] items-center ">
			<blockquote className="blockquote-color-1 text-center">{BlockquoteContent}</blockquote>
			<div className="flex gap-[12px] items-center">
				<Image src={ImagePath} width={40} height={40} alt="author" className="rounded-full w-[40px] h-[40px]" />
				<div className="flex flex-col gap-[2px]">
					<span className="text-medium">{Author}</span>
					<span className="text-[1.2rem]">{Description}</span>
				</div>
			</div>
		</div>
	);
};

export default BlockQuote;
