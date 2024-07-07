import React from "react";

const DashboardFilterLoading = () => {
	return (
		<div className="flex flex-wrap justify-end gap-[.4rem] w-full h-[28rem] rounded-xl   text-[1.3rem]">
			{Array(30)
				.fill(1)
				.map((_, i) => (
					<div
						key={i}
						className={`animate-pulse bg-gray-400  w-[3rem] h-[3rem] flex items-center justify-center rounded-md `}
					></div>
				))}
		</div>
	);
};

export default DashboardFilterLoading;
