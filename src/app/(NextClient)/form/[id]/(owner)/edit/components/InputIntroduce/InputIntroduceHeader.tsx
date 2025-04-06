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
		<DivNative className="w-full sm:min-h-[12rem] py-[1.6rem] flex flex-col gap-[1.6rem] xl:gap-[1rem] sm:border-b-[.1rem] border-[var(--border-color-input)]  ">
			<DivNative className="min-h-[2rem] flex flex-col xl:flex-row xl:items-center justify-between gap-[2rem] xl:gap-0  px-[2rem]">
				<DivNative className="text-[2.2rem] font-semibold ">{title}</DivNative>
				
			</DivNative>
			<DivNative className="flex-1 px-[2rem] text-[1.4rem] opacity-60">{description}</DivNative>
		</DivNative>
	);
};

export default InputIntroduceHeader;
