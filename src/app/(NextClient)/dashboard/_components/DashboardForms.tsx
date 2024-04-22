import React from "react";

const DashboardForms = () => {
	return (
		<div className="max-w-full  flex flex-col">
			{Array(30)
				.fill(0)
				.map((_, index) => (
					<div key={index} className="min-h-[80px] h-max max-w-full  hover:bg-slate-300 rounded-md">
						{index}
					</div>
				))}
		</div>
	);
};

export default DashboardForms;
