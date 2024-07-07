import { TextCursorInput } from "lucide-react";
import Image from "next/image";
import React from "react";
import SliderImages from "./SliderImages";
import ImageAndText, { PostionHighlight } from "./ImageAndText";

type ModeSlider = {
	mode: "SLIDER";
	ImagePathArray: string[];
	DescriptionBgImg?: string;
};

type ModeImage = {
	mode: "IMAGE";
	ImagePath: string;
};

type Mode = ModeSlider | ModeImage;

type TProps = {
	BeforeTextHighlight?: string;
	TextHighlight?: string;
	AfterTextHighlight?: string;
	ImageHighlight?: string;
	ImageRight?: string;
	TextSub?: string;
	HiddenTextArea?: boolean;
	DescriptionIcon?: React.ReactNode;
	DescriptionText?: string;
	DescriptionTextSub?: string;
	Mode: Mode;
	Postion: PostionHighlight;
	position_header?: "left" | "right";
	image_sub_url?: string;
};

const FeatureInfoV1 = (props: TProps) => {
	const {
		position_header = "left",
		BeforeTextHighlight,
		TextHighlight,
		image_sub_url,
		AfterTextHighlight,
		ImageHighlight = "",
		TextSub,
		HiddenTextArea = false,
		ImageRight,
		DescriptionIcon,
		DescriptionText,
		DescriptionTextSub,
		Mode,
		Postion,
	} = props;

	const styleEffect = {
		onCheckMode: () => (Mode.mode === "SLIDER" ? `url(${Mode.DescriptionBgImg})` : ""),
	};

	return (
		<div className="w-full h-full max-h-max flex flex-col  gap-[24px]">
			{!HiddenTextArea && (
				<ImageAndText
					BeforeTextHighlight={BeforeTextHighlight}
					AfterTextHighlight={AfterTextHighlight}
					TextSub={TextSub}
					ImageHighlight={ImageHighlight}
					ImageRight={ImageRight}
					Position={Postion}
					position_header={position_header}
				/>
			)}

			<div className="border-shadow-normal flex-1 justify-items-stretch h-full w-full  !rounded-xl flex flex-col  overflow-hidden ">
				<div className="flex-1 flex items-stretch " style={{ backgroundImage: styleEffect.onCheckMode() }}>
					{Mode.mode === "SLIDER" && Mode.DescriptionBgImg && (
						<div className="border-shadow-normal mt-[3%] ml-0 xl:ml-[16%] min-h-full pl-0 xl:pl-[40px] flex items-center justify-center bg-color-section-theme p-[3rem]  ">
							<div className="w-full xl:w-[850px] min-h-full   ">
								<SliderImages Images={Mode.ImagePathArray} duration={3000} />
							</div>
						</div>
					)}

					{Mode.mode === "SLIDER" && !Mode.DescriptionBgImg && (
						<div className="border-shadow-normal flex items-center justify-center xl:px-[50px] h-full  bg-color-section-theme  w-full">
							<SliderImages Images={Mode.ImagePathArray} duration={3000} />
							<Image
								className="hidden xl:inline w-[50%] min-h-[50rem]  transition-all duration-500   object-contain "
								src={image_sub_url!}
								width={300}
								height={300}
								unoptimized={true}
								alt="slider index"
							/>
						</div>
					)}
					{Mode.mode === "IMAGE" && (
						<div className=" pl-[40px] flex-1 h-full w-full ">
							<Image
								className="border-shadow-normal !min-w-full min-h-full object-contain "
								src={Mode.ImagePath}
								width={908}
								height={646}
								alt="description"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default FeatureInfoV1;
