import Image from "next/image";
import React from "react";

type PostionHighlightBottom = {
	mode: "BOTTOM";
	bottom?: string;
};
type PostionHighlightTop = {
	mode: "TOP";
	top?: string;
};
type PostionHighlightWrapper = {
	mode: "WRAPPER";
};

export type PostionHighlight = PostionHighlightTop | PostionHighlightBottom | PostionHighlightWrapper;

type TProps = {
	BeforeTextHighlight?: string;
	TextHighlight?: string;
	AfterTextHighlight?: string;
	ImageHighlight?: string;
	ImageRight?: string;
	TextSub?: string;
	Position: PostionHighlight;
	position_header?: "left" | "right";
};

const ImageAndText = (props: TProps) => {
	const {
		position_header = "left",
		BeforeTextHighlight,
		TextHighlight,
		AfterTextHighlight,
		TextSub,
		ImageHighlight = "",
		ImageRight,
		Position,
	} = props;

	const styleEffect = {
		onCheckImageRight: (check: boolean) => {
			if (!check) return "w-full";
			return "w-full xl:w-[50%]";
		},
		onCheckPosition: (Postion: PostionHighlight) => {
			if (Position.mode === "TOP") return "top-[-12px]";
			if (Position.mode === "BOTTOM") return "bottom-[-12px]";
			return "top-[50%] translate-y-[-50%]  min-h-full";
		},
	};

	const order = position_header === "left" ? "order-3" : "order-1";

	return (
		<div className="flex min-w-full justify-between items-center ">
			<div
				className={`${styleEffect.onCheckImageRight(
					ImageRight ? true : false
				)}  flex flex-col gap-[12px] order-2`}
			>
				<h2 className="text-h2  ">
					{BeforeTextHighlight}
					<span className="relative px-[6px]">
						{TextHighlight}
						{TextHighlight && (
							<Image
								src={ImageHighlight}
								width={78}
								height={24}
								className={`${styleEffect.onCheckPosition(
									Position
								)} hidden xl:inline absolute left-0 right-0 w-full bottom-[-12px]  xl:h-[16px] object-contain`}
								alt="highlight-text"
							/>
						)}
					</span>
					{AfterTextHighlight}
				</h2>
				<p className="text-[2.2rem]">{TextSub}.</p>
			</div>

			{ImageRight && (
				<div className={`${order} w-[30%] h-[40%] hidden xl:flex justify-end`}>
					<Image src={ImageRight} width={320} height={150} alt="Minh họa input" className="w-full h-full" />
				</div>
			)}
		</div>
	);
};

export default ImageAndText;
