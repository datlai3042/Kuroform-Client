import { GridIconText } from "./Grid6x6";

type TProps = {
	ElementGrid: GridIconText[];
};

const Grid3x3 = (props: TProps) => {
	const { ElementGrid } = props;

	return (
		<div className="w-full min-h-full h-max grid grid-cols-2 grid-rows-6 xl:grid-cols-4 xl:grid-rows-3 gap-[28px_50px]">
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

export default Grid3x3;
