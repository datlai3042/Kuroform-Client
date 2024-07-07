"use client";
import React from "react";
import Calendar from "./Calendar";
import ButtonDarkMode from "../../_components/ui/button/ButtonDarkMode";
import { UI } from "@/type";

const CalenderPage = () => {
	const handlerOnchange = (value: UI.Calender.Event.DateResult) => {
		console.log({ value });
	};

	return (
		<>
			<div className="flex flex-col gap-[2rem] items-center justify-center h-screen">
				<ButtonDarkMode />
				<Calendar onChange={(e) => handlerOnchange(e)} />;
			</div>
		</>
	);
};

export default CalenderPage;
