import React from "react";
import LoadingSpinner from "./(NextClient)/_components/ui/loading/LoadingSpinner";

const LoadingGlobal = () => {
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<LoadingSpinner color="#0bceb2" />
		</div>
	);
};

export default LoadingGlobal;
