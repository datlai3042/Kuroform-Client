import React, { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import Image from "next/image";
import Link from "next/link";

const LogoHome = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<Link href={"/dashboard"} className="  p-[.6rem] rounded-xl">
			<Image
				src={"/assets/images/icon/logo/logo_home.png"}
				width={70}
				height={70}
				quality={100}
				alt="logo"
				className="min-w-[4rem] min-h-[4rem] object-contain"
				unoptimized={true}
			/>
		</Link>
	);
};

export default LogoHome;
