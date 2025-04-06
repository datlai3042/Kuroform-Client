import React from "react";
import LoadingSpinner from "./(NextClient)/_components/ui/loading/LoadingSpinner";
import LoadingClient from "./(NextClient)/_components/LoadingClient";

const LoadingGlobal = () => {
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<LoadingClient width="w-full" height="h-full"/>
		</div>
	);
};

export default LoadingGlobal;
