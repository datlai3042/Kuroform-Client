"use client";
import React, { useContext } from "react";
import DivNative from "../../_components/ui/NativeHtml/DivNative";
import ButtonDarkMode from "../../_components/ui/button/ButtonDarkMode";
import { ThemeContext } from "../../_components/provider/ThemeProvider";
import Image from "next/image";
import ImageAndText from "../../_components/ui/ImageAndText";

const IntroduceDarkMode = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<DivNative className=" flex flex-col  h-max ">
			<ImageAndText
				BeforeTextHighlight="Chuyển đổi chế độ xem một các dễ dàng"
				TextHighlight=""
				AfterTextHighlight=""
				TextSub="Mỗi khi bạn thay đổi mode thì giao diện sẽ render ra phù hợp"
				ImageRight="/assets/images/home/darkMode.png"
				Position={{ mode: "WRAPPER" }}
			/>
			<div className="flex justify-end">
				<ButtonDarkMode />
			</div>
			{theme === "light" && (
				<Image
					src={"/assets/images/home/layout_2.png"}
					width={18}
					height={18}
					alt="icon"
					unoptimized={true}
					className="w-full h-[25rem] xl:h-[60rem] object-contain rounded-3xl"
				/>
			)}

			{theme === "dark" && (
				<Image
					src={"/assets/images/home/layout_1.png"}
					width={18}
					height={18}
					alt="icon"
					unoptimized={true}
					className="w-full h-[25rem] xl:h-[60rem] object-contain rounded-3xl"
				/>
			)}
		</DivNative>
	);
};

export default IntroduceDarkMode;
