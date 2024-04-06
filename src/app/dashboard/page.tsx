"use client";
import { useState } from "react";
import Auth from "../auth/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
const DashboardPage = () => {
	const [turnOnModel, setTurnOnModel] = useState<boolean>(false);
	const router = useRouter();

	return (
		<main className="min-h-full min-w-full flex items-center justify-center bg-white">
			<div className="flex w-full min-h-screen h-max bg-[#ffffff] relative">
				<div
					className={`${
						turnOnModel ? "w-0 " : "w-[15%] "
					}  min-h-full bg-red-800 transition-[width] duration-200 `}
					onMouseMove={(e) => {
						const { offsetX, offsetY } = e.nativeEvent;
						console.log({ offsetX, offsetY });
					}}
				></div>
				<div
					className={`${
						turnOnModel
							? "  w-full h-[1400px]   z-[10] absolute inset-0 "
							: " left-[15%] top-[150px] h-[2000px] w-[85%] z-[1] absolute"
					} px-[20px] py-[16px]   transition-all duration-200   bg-blue-800 flex justify-end items-start  `}
				>
					<div className="w-full h-[250px] bg-yellow-700"></div>
					<button
						className=" self-start p-[16px] bg-slate-900 rounded-lg text-[#ffffff]"
						onClick={() => setTurnOnModel((prev) => !prev)}
					>
						Open
					</button>

					<button
						className=" self-start p-[16px] bg-slate-900 rounded-lg text-[#ffffff]"
						onClick={async () => {
							const json = await fetch("/v1/api/auth/logout", { method: "GET" });
							const result = (await json.json()) as { auth: boolean };
							if (result.auth) {
								console.log("OK");
								router.push("/");
							}
						}}
					>
						Logout
					</button>
				</div>
			</div>
		</main>
	);
};

export default DashboardPage;
