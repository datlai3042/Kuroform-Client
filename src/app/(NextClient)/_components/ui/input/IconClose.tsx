import React from "react";

type TProps = {
	onClose: (state: boolean) => void;
};

const IconClose = (props: TProps) => {
	const { onClose } = props;

	return (
		<button
			className="w-[48px] h-[48px] bg-[#ffffff] flex items-center justify-center rounded-full shadow text-[12px]"
			onClick={() => onClose(false)}
		>
			X
		</button>
	);
};

export default IconClose;
