"use client";
import React, { useState } from "react";
import ButtonDarkMode from "../../_components/ui/button/ButtonDarkMode";
import { UI } from "@/type";
import Star from "./Rate";
import Rate from "./Rate";

/**
 * 
 * Có 3 thống số -1 0 1
	khi hover -> left-100
	khi click dựa vào 3 thông số trên mà render left

 */

const RatePage = () => {
	return (
		<div className="flex  gap-[2rem] items-center justify-center h-screen bg-[#fff]">
			<Rate />
		</div>
	);
};

export default RatePage;
