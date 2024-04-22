"use client";

import React, { useRef } from "react";
import Button from "../../_components/ui/button/Button";

const SettingUpdateAvatar = () => {
	const inputAvatar = useRef<HTMLInputElement | null>(null);

	const onClickButton = () => {
		if (inputAvatar.current) {
			inputAvatar.current.click();
		}
	};

	const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.files);
	};

	return (
		<div className="group w-full h-[140px] flex flex-col gap-[1rem]">
			<p className="text-[1.4rem] font-bold">Photo</p>
			<div className="flex items-center gap-[2rem]">
				<div className="w-[10rem] aspect-square bg-green-400 flex items-center justify-center rounded-full text-[#ffffff]">
					L
				</div>

				<div className="hidden group-hover:flex">
					<button
						onClick={onClickButton}
						className="p-[.2rem_.8rem] h-[30%] flex items-center gap-[.8rem] hover:bg-slate-200 rounded-md"
					>
						Upload Photo
					</button>
					<input type="file" hidden ref={inputAvatar} onChange={onChangeFile} />
				</div>
			</div>
		</div>
	);
};

export default SettingUpdateAvatar;
