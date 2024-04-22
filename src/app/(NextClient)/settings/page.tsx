"use client";

import React from "react";
import SettingHeader from "./_components/SettingHeader";
import SettingSection from "./_components/SettingSection";
const SettingPage = () => {
	return (
		<div className="w-full h-full   p-[.8rem_1.8rem] flex flex-col gap-[5rem] text-[1.4rem]">
			<SettingHeader />
			<SettingSection />
		</div>
	);
};

export default SettingPage;
