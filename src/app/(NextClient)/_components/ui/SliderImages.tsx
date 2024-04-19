"use client";

import React, { useEffect, useRef } from "react";

type TProps = {
	Images: string[];
	duration: number;
};

const SliderImages = (props: TProps) => {
	const { Images, duration } = props;
	const intervalId = useRef<number>(0);

	useEffect(() => {
		intervalId.current = setInterval(() => {}, duration);
	}, []);

	return <div>SliderImages</div>;
};

export default SliderImages;
