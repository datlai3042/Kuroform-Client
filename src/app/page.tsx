"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
	const [turnOnModel, setTurnOnModel] = useState<boolean>(false);

	return (
		<main className="min-h-full min-w-full">
			<div className="flex w-full h-screen bg-[#ffffff] relative">
				<div
					className={`${
						turnOnModel ? "w-0 transition-[width] duration-700" : "w-[15%] "
					}  h-full bg-red-800  `}
				></div>
				<div
					className={`${
						turnOnModel
							? " h-full w-full transition-all duration-200  z-[10]  fixed inset-0"
							: " left-[15%] top-[150px] h-[750px] w-[85%] z-[1] absolute "
					} px-[20px] py-[16px]     bg-blue-800 flex justify-end items-start  `}
				>
					<div className="w-full h-[250px] bg-yellow-700"></div>
					<button
						className=" self-end mb-[400px] p-[16px] bg-slate-900 rounded-lg text-[#ffffff]"
						onClick={() => setTurnOnModel((prev) => !prev)}
					>
						Open
					</button>
				</div>
			</div>
		</main>
	);
}
