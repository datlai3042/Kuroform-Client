import { Check } from "lucide-react";
import React from "react";

type TProps = {
	message: string;
};

const BoxCopySuccess = (props: TProps) => {
	const { message } = props;

	return (
		<div className="w-max min-h-[3rem] flex items-center gap-[1rem]  bg-color-gap-empty text-[#0bceb2] px-[2rem] rounded-lg border-[.1rem] border-[#fff]">
			{message}
			<Check size={16} />
		</div>
	);
};

export default BoxCopySuccess;
