"use client";
import React, { useEffect, useState } from "react";
import Portal from "../Portal";
import ButtonDarkMode from "../ui/button/ButtonDarkMode";
import AuthorDat from "../author/AuthorDat";

type TProps = {
	children: React.ReactNode;
	zIndex?: number;
};

const WrapperAuthLayout = (props: TProps) => {
	const { children, zIndex } = props;
	const [loader, setLoader] = useState<boolean>(false);

	useEffect(() => {
		setLoader(true);
	}, []);

	const styleEffect = {
		_zIndex: zIndex ? zIndex : 500,
	};

	if (!loader) return null;

	return (
		<Portal>
			<div
				style={{ zIndex: styleEffect._zIndex }}
				className="relative top-0 xl:top-0 left-0 w-full min-h-screen h-max  xl:pt-0 flex justify-center  items-center bg-[#ffffff] px-[20px]"
			>
				{children}
				<AuthorDat />
			</div>
		</Portal>
	);
};

export default WrapperAuthLayout;
