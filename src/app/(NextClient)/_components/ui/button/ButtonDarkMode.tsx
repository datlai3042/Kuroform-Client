"use client";
import React, { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeProvider";
import Image from "next/image";
import { LightbulbIcon } from "lucide-react";

const ButtonDarkMode = () => {
	const { theme, setTheme } = useContext(ThemeContext);

	const onChangeTheme = () => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	};

	const changeCirclePosition = theme === "light" ? "animate-rtl bg-[#fff]" : " animate-ltr bg-[#fff]";

	return (
		<button
			onClick={onChangeTheme}
			className="relative text-text-theme min-w-[4rem] bg-[#fff] w-[6rem] h-[3rem] rounded-full"
		>
			<div
				className={`${changeCirclePosition} w-[2.2rem] h-[2.2rem] rounded-full absolute top-[50%] translate-y-[-50%]  `}
			></div>
			{theme === "light" ? (
				<Image
					src={"/assets/images/icon/theme/bg_dark.jpg"}
					width={18}
					height={18}
					alt="icon"
					className="w-full h-full rounded-full object-cover"
					unoptimized={true}
				/>
			) : (
				<Image
					src={"/assets/images/icon/theme/bg_light.jpg"}
					width={18}
					height={18}
					alt="icon"
					className="w-full h-full rounded-full"
					unoptimized={true}
				/>
			)}
		</button>
	);
};

export default ButtonDarkMode;
