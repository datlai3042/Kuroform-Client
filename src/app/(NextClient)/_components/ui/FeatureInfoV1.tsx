import { TextCursorInput } from "lucide-react";
import Image from "next/image";
import React from "react";

type TProps = {
	BeforeTextHighlight: string;
	TextHighlight: string;
	AfterTextHighlight: string;
	ImageHighlight: string;
	ImageRight: string;
	TextSub: string;
	DescriptionIcon: React.ReactNode;
	DescriptionText: string;
	DescriptionTextSub: string;
	DescriptionBgImg: string;
	DescriptionImage: string;
};

const FeatureInfoV1 = (props: TProps) => {
	const {
		BeforeTextHighlight,
		TextHighlight,
		AfterTextHighlight,
		ImageHighlight,
		TextSub,
		ImageRight,
		DescriptionIcon,
		DescriptionText,
		DescriptionTextSub,
		DescriptionBgImg,
		DescriptionImage,
	} = props;

	return (
		<div className="w-full h-max flex flex-col  gap-[40px]">
			<div className="flex min-w-full  ">
				<div className="w-[50%] mt-[80px] flex flex-col gap-[12px]">
					<h2 className="text-h2 ">
						{BeforeTextHighlight}
						<span className="relative px-[6px]">
							{TextHighlight}
							<Image
								src={ImageHighlight}
								width={78}
								height={24}
								className="hidden xl:inline absolute left-0 bottom-[-16px] w-[78px] xl:h-[24px]"
								alt="highlight-text"
							/>
						</span>
						{AfterTextHighlight}
					</h2>
					<p className="text-[2.2rem]">{TextSub}</p>
				</div>

				<div className="w-[50%] flex justify-end">
					<Image src={ImageRight} width={320} height={237} alt="Person clicking on a plus sign" />
				</div>
			</div>

			<div className="border-shadow-normal min-h-[705px] w-full  !rounded-xl flex flex-col gap-[20px] overflow-hidden ">
				<div className="p-[36px] flex flex-col gap-[20px]">
					{DescriptionIcon}
					<h3 className="text-h3">{DescriptionText}</h3>
					<p className="text-[1.6rem]">{DescriptionTextSub}</p>
				</div>
				<div className="flex-1 " style={{ backgroundImage: `url(${DescriptionBgImg})` }}>
					<div className="mt-[3%] ml-[16%] h-full bg-red-800"></div>
				</div>
			</div>
		</div>
	);
};

export default FeatureInfoV1;
