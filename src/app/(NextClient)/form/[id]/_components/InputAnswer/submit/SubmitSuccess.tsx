import React from "react";

type TProps = {
	message?: string;
	color: string;
};

const SubmitSuccess = (props: TProps) => {
	const { message = "Câu trả lời của bạn đã được gửi đi", color } = props;

	return (
		<div
			style={{ color: color }}
			className="w-full min-h-[14rem] bg-[var(--bg-dark-readOnly)]  p-[0rem_1rem] md:mt-[8rem] h-max flex items-center justify-center text-[2rem] font-bold rounded-lg"
		>
			{message}
		</div>
	);
};

export default SubmitSuccess;
