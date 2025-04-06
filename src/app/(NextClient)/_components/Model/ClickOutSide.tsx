import React, { SetStateAction, useCallback, useEffect, useRef, useState } from "react";

type TProps = {
	children: React.ReactElement;
	setOpenModel: React.Dispatch<SetStateAction<boolean>>;
	width?: string;
	height?: string;
};

const ClickOutSide = (props: TProps) => {
	const { children, width, height, setOpenModel } = props;

	const divWrapper = useRef<HTMLDivElement | null>(null);

	const globalClick = useCallback(
		(e: MouseEvent) => {
			if (divWrapper.current && !divWrapper.current.contains(e.target as Node)) {
				setOpenModel(false);
			}
		},
		[setOpenModel]
	);

	useEffect(() => {
		document.addEventListener("click", globalClick);

		return () => {
			document.removeEventListener("click", globalClick);
		};
	}, [globalClick]);

	const widthStyle = width ? width : "w-max";
	const heightStyle = height ? height : "w-max";

	return (
		<div ref={divWrapper} className={`${width || ''} ${height || ''}`}>
			{children}
		</div>
	);
};

export default ClickOutSide;
