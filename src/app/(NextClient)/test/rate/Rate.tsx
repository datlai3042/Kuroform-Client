"use client";
import React, { useState } from "react";
import ButtonDarkMode from "../../_components/ui/button/ButtonDarkMode";
import { UI } from "@/type";
import RateItem from "./RateItem";

/**
 * 
 * Có 3 thống số -1 0 1
	khi hover -> left-100
	khi click dựa vào 3 thông số trên mà render left

 */

type TProps = {
	width?: string;
	height?: string;
	onChange?: () => void;
	gap?: string;
};
const default_value = () => {
	return Array(5)
		.fill(0)
		.map((_, i) => ({ point: "none", index: i })) as UI.Rate.RateControl[];
};
const Rate = (props: TProps) => {
	const { width = "w-[4rem]", height = "h-[4rem]", onChange, gap = "gap-[.6rem]" } = props;

	const [rate, setRate] = useState<UI.Rate.RateControl[]>(default_value());

	const [itemHover, setItemHover] = useState(-1);

	const [rateBackUp, setRateBackUp] = useState<UI.Rate.RateControl[]>(rate);

	const onChangeItem = (point: UI.Rate.RatePoint, index: number) => {
		const rate_temp = structuredClone(rate);
		let rate_star = rate_temp.slice(0, index + 1);
		let rate_end = rate_temp.slice(index + 1);
		rate_star = rate_star.map((rateItem, i) => {
			if (i === index) {
				rateItem.point = point;
				return rateItem;
			}
			rateItem.point = "hight";
			return rateItem;
		});

		rate_end = rate_end.map((rate) => {
			rate.point = "none";
			return rate;
		});

		const newRate = [...rate_star, ...rate_end];
		setRate(newRate);
		setRateBackUp(newRate);
	};

	const onHover = (index: number) => {
		setItemHover(index);
	};

	console.log({ itemHover });

	return (
		<div className={` min-w-[30rem] w-max bg-red-800 h-[30rem] flex flex-col items-center justify-center`}>
			<div className={`${gap} flex`}>
				{rate.map((rateItem, i) => (
					<RateItem
						key={i}
						rate_default={rateItem.point}
						width={width}
						height={height}
						index={rateItem.index}
						onChangeItem={onChangeItem}
						hover={i <= itemHover ? true : false}
						onHover={onHover}
					/>
				))}
			</div>

			<p>
				Tổng đánh giá{" "}
				{rate.reduce((acc, total) => {
					let point = 0;
					if (total.point === "none") {
						point = 0;
					} else {
						point = total.point === "mid" ? 0.5 : 1;
					}
					return acc + point;
				}, 0)}
			</p>
		</div>
	);
};

export default Rate;
