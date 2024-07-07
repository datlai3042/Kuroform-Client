"use client";

import { Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ClickOutSide from "../Model/ClickOutSide";

type TProps = {
	color?: string;
	backgroundColor?: string;
};

const AuthorDat = (props: TProps) => {
	const { color, backgroundColor } = props;

	const [openDetailAuthor, setOpenDetailAuthor] = useState<boolean>(false);

	const setAnimation = openDetailAuthor ? "animate-btt" : "animate-ttb";

	const colorStyle = color || "text-text-theme";
	const backgroundColorStyle = backgroundColor || "bg-color-section-theme";

	const background = openDetailAuthor ? "bg-[#fff]" : "bg-transparent";

	return (
		<ClickOutSide setOpenModel={setOpenDetailAuthor}>
			<button
				onClick={() => setOpenDetailAuthor((prev) => !prev)}
				className={`${colorStyle} ${backgroundColorStyle} ${background} fixed z-[2] bottom-[4rem] right-[.3rem] flex items-center justify-center gap-[1rem] transition-[width] duration-1000 min-w-[6rem] w-max rounded-full p-[.4rem_1.6rem]`}
			>
				{openDetailAuthor && <span className={`${colorStyle}`}>Được thiết kế và phát triển bởi Đạt</span>}
				<div className={`${colorStyle} ${backgroundColorStyle} w-[4rem] h-[4rem] relative rounded-full`}>
					<Image
						width={70}
						height={70}
						src={"/assets/images/home/avatar_author.png"}
						alt="Ảnh tác giả"
						className="w-full h-full rounded-full"
					/>

					<div
						className={`${setAnimation} bg-[#fff] absolute z-[1] bottom-[150%] right-[3rem] min-w-[9rem] p-[.6rem_.4rem] min-h-[8rem]  flex flex-col gap-[2rem] rounded-lg `}
					>
						<a
							onClick={(e) => e.stopPropagation()}
							href="https://www.facebook.com/datlai304"
							target="_blank"
							className="flex items-center gap-[1rem]"
						>
							<Image
								width={70}
								height={70}
								src={"/assets/images/social/facebook.png"}
								alt="Liên hệ"
								className="w-[2rem] h-[2rem] rounded-full"
							/>
							Facebook
						</a>

						<a
							onClick={(e) => e.stopPropagation()}
							href="https://github.com/datlai3042"
							target="_blank"
							className="flex items-center gap-[1rem]"
						>
							<Image
								width={70}
								height={70}
								src={"/assets/images/social/github.png"}
								alt="Liên hệ"
								className="w-[2rem] h-[2rem] rounded-full"
							/>
							Github
						</a>
					</div>
				</div>
			</button>
		</ClickOutSide>
	);
};

export default AuthorDat;
