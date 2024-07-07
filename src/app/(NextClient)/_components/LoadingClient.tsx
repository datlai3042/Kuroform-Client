import React from "react";
import LoadingSpinner from "./ui/loading/LoadingSpinner";

type TProps = {
	width?: string;
	height?: string;
	message?: string;
};

const LoadingClient = (props: TProps) => {
	const { height = "h-screen", width = "w-screen", message = "Đang loading" } = props;

	const styleContainer = `${width} ${height}`;

	return (
		<div className={`${styleContainer} flex  justify-center items-center gap-[2.6rem] bg-[#0f1623]`}>
			<LoadingSpinner color="#0bceb2" />
			<span className="text-[#0bceb2] text-[2rem]">{message}</span>
		</div>
	);
};

export default LoadingClient;
