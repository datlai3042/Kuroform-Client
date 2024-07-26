import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { ArrowBigRight } from "lucide-react";
import React from "react";

type TProps = {
	title: string;
	description: string;
	action: () => void;
};

const InputIntroduceHeader = (props: TProps) => {
	const { title, description, action } = props;

	return (
		<DivNative className="w-full h-[36%] xl:h-[30%] flex flex-col gap-[1.6rem] xl:gap-[3rem] xl:border-b-[.2rem] border-gray-100  ">
			<DivNative className="min-h-[2rem] flex flex-col xl:flex-row xl:items-center justify-between gap-[2rem] xl:gap-0  px-[2rem]">
				<DivNative className="text-[2.2rem] font-semibold ">{title}</DivNative>
				<ButtonIcon
					textContent="Thêm input này"
					className="h-[50%] flex items-center p-[.8rem] xl:p-[1rem] bg-blue-600 rounded-lg text-[1.2rem] xl:text-[1.4rem] text-[#ffffff]"
					Icon={<ArrowBigRight />}
					onClick={action}
				/>
			</DivNative>
			<DivNative className="flex-1 px-[2rem] text-[1.2rem] xl:text-[1.6rem] opacity-60">{description}</DivNative>
		</DivNative>
	);
};

export default InputIntroduceHeader;
