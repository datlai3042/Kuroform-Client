import React from "react";

type TProps = {
	onClose: (state: boolean) => void;
};

const IconClose = (props: TProps) => {
	const { onClose } = props;

	return (
		<button
			className="w-[4.8rem] h-[4.8rem] bg-[#ffffff] flex items-center justify-center rounded-full shadow text-[12px] text-color-main font-semibold"
			onClick={() => onClose(false)}
		>
			X
		</button>
	);
};

export default IconClose;
