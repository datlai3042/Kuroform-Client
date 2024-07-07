import React from "react";

type TProps = {
	color: string;
	width?: string;
	height?: string;
};

const LoadingSpinner = (props: TProps) => {
	const { color, width = "min-w-[3rem]", height = "min-h-[3rem]" } = props;

	const styleSpinner = `${width} ${height}`;

	return (
		<div
			style={{
				borderTopColor: color,
				borderRightColor: color,
				borderLeftColor: "transparent",
				borderBottomColor: "transparent",
			}}
			className={`${styleSpinner} inline-block  animate-spin rounded-full border-[.3rem] border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white`}
			role="status"
		></div>
	);
};

export default LoadingSpinner;
