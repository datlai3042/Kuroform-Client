import React from "react";

export type GridIconText = {
	icon: React.ReactNode;
	title: string;
	content: string;
};

type TProps = {
	ElementGrid: GridIconText[];
};

const Grid6x6 = (props: TProps) => {
	const { ElementGrid } = props;

	return (
		<div className="w-full min-h-full h-max grid grid-cols-1 grid-rows-6 xl:grid-cols-3 xl:grid-rows-2 gap-[28px_50px]">
			{ElementGrid.map((el, index) => (
				<div key={el.content + index} className="flex flex-col gap-[10px]">
					{el.icon}
					<p className="text-[1.8rem]">
						<strong>{el.title}.</strong> <span className="text-slate-500">{el.content}.</span>
					</p>
				</div>
			))}
		</div>
	);
};

export default Grid6x6;
