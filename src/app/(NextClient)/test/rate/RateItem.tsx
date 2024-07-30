import { UI } from "@/type";
import { useDebouncedCallback } from "@mantine/hooks";
import React, { useEffect, useState } from "react";

type TProps = {
	onChangeItem: (point: UI.Rate.RatePoint, index: number) => void;
	onHover: (index: number) => void;
	hover: boolean;
	index: number;
	width: string;
	height: string;
	rate_default: UI.Rate.RatePoint;
};

const RateItem = (props: TProps) => {
	const { index, width, height, onChangeItem, onHover, rate_default, hover } = props;

	const [point, setPoint] = useState<UI.Rate.RatePoint>(rate_default);
	const [pointResult, setPointResult] = useState<UI.Rate.RatePoint>(rate_default);

	const cb = useDebouncedCallback(onChangeItem, 20);

	const containerStyle = `${width} ${height}`;

	const styleEffect = {
		onCheckPoint: () => {
			if (hover) {
				return "left-0 w-0";
			}
			if (point === "none") return "left-0 w-0";

			return point === "mid" ? "left-[-50%]" : "left-0 right-0";
		},
	};

	useEffect(() => {
		setPoint(rate_default);
		setPointResult(rate_default);
	}, [rate_default]);

	useEffect(() => {
		if (hover) setPoint("hight");
		else setPoint("none");
	}, [hover]);


	return (
		<div className={`${containerStyle} star relative`}>
			<div
				onClick={(e) => {
					const bounds = e.currentTarget.getBoundingClientRect();
					const width = e.currentTarget.getBoundingClientRect().width;
					const x = e.clientX - bounds.left;
					const y = e.clientY - bounds.top;
					let point: UI.Rate.RatePoint;
					if (x < width / 4) {
						point = "none";
						setPointResult(point);
						cb(point, index);
						return;
					} else {
						point = x > width / 2 ? "hight" : "mid";
					}
					cb(point, index);

					setPointResult(point);
				}}
				onMouseMove={(e) => {
					const bounds = e.currentTarget.getBoundingClientRect();
					const width = e.currentTarget.getBoundingClientRect().width;
					const x = e.clientX - bounds.left;
					const y = e.clientY - bounds.top;
					let point: UI.Rate.RatePoint;
					onHover(index);
					if (x < width / 4) {
						point = "none";
						setPoint(point);
						return;
					} else {
						point = x > width / 2 ? "hight" : "mid";
						setPoint(point);
					}
				}}
				onMouseLeave={() => {
					setPoint(pointResult);
					onHover(-1);
				}}
				className="absolute inset-0 w-full h-full bg-blue-400  "
			>
				{point !== "none" && (
					<div className="relative inset-0 w-full h-full  ">
						<button
							className={`${styleEffect.onCheckPoint()} absolute  bg-yellow-300 w-full h-full `}
						></button>
					</div>
				)}
			</div>
		</div>
	);
};

export default RateItem;
