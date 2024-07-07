"use client";

import { renderArrayDatesInMonth } from "@/app/utils/ui.utils";
import { UI } from "@/type";
import React, { useEffect, useRef, useState } from "react";
import ButtonSelectTime from "../../_components/ui/button/ButtonSelectTime";
import { generateFullDateString } from "@/app/utils/time.utils";

const name_in_week = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

type TProps = {
	onChange?: UI.Calender.Event.ChangeEvent;
	callbackCancel?: () => void;
};

const Calendar = (props: TProps) => {
	const { onChange, callbackCancel } = props;

	const [weekRender, setWeekRender] = useState<UI.Calender.RenderDateInMonth[]>([]);

	const date = new Date();
	const month_now = date.getMonth() + 1;
	const today_now = date.getDate();
	const year_now = date.getFullYear();

	const [month, setMonth] = useState(month_now);
	const [year, setYear] = useState(year_now);

	const [pickDate, setPickDate] = useState({
		day: today_now,
		month: month_now,
		year: year_now,
		date_string: generateFullDateString({ day: today_now, month: month_now, year: year_now }),
	});

	useEffect(() => {
		const newWeekRender = renderArrayDatesInMonth({ month, year });
		setWeekRender(newWeekRender);
	}, [month, year]);

	const onChangeDate = (value: number, type: "month" | "year") => {
		if (type === "month") {
			setMonth(value);
			return;
		}
		setYear(value);
	};

	const styleEffect = {
		renderStyleDateItem: (dateInfo: UI.Calender.DateInfo) => {
			const { day, month, year, state } = dateInfo;
			let active = "bg-color-main text-[#fff]";
			let active_middle = "bg-blue-300 text-[#fff]";
			let hover = "hover:bg-blue-300";
			let day_current = "bg-blue-400 text-[#fff]";
			let first_day = "bg-gray-300 text-[#fff]";
			const style_normal = "hover:bg-blue-300 hover:text-[#fff]";

			if (day === pickDate.day && month === pickDate.month && year === pickDate.year) {
				return active;
			}

			if (day === 1 && state === "current") {
				return first_day;
			}
			if (day === today_now && month === month_now && year === year_now && state === "current") {
				return day_current;
			}
			if (day === 1 && month === month_now && year === year_now && state === "current") {
				return active_middle;
			}
			return style_normal;
		},
	};

	const onChangePickDate = (dateInfo: UI.Calender.DateInfo) => {
		const { day, month, year } = dateInfo;
		const date_string = generateFullDateString({ day, month, year });
		setPickDate({ day, month, year, date_string });
	};

	const onChangeReturn = () => {
		const { day, month, year, date_string } = pickDate;

		if (onChange) {
			onChange({ day, month, year, date_string });
		}
	};

	return (
		<div className="max-w-full  w-[37rem] xl:w-[53rem] min-h-[42rem] text-[1rem] flex flex-col gap-[1rem] p-[2rem_1rem] xl:p-[2rem] border-[.1rem] border-gray-100 rounded-2xl bg-color-section-theme text-text-theme">
			<div className="w-full flex flex-col xl:flex-row items-center justify-between gap-[2rem]">
				<p className="text-[2rem] order-2 xl:order-1">
					Tháng {month} năm {year}
				</p>
				<ButtonSelectTime
					month={month}
					year={year}
					cb={onChangeDate}
					className="border-[.1rem] border-color-section-theme!"
				/>
			</div>
			<div className="flex xl:w-[49rem] flex-col">
				<div className="w-full flex">
					{name_in_week.map((day_name, i) => (
						<span className="w-[7rem] h-[4rem]  flex justify-center items-center" key={day_name + i}>
							{day_name}
						</span>
					))}
				</div>
				<div className="w-full flex flex-col">
					{weekRender.map((week, i) => (
						<div key={week.week_count + "week_id" + i} className="flex">
							{week.week_menber.map((detail) => (
								<div
									key={detail.date_full}
									className="w-[7rem] h-[4rem] flex items-center justify-center"
								>
									<button
										style={{ opacity: detail.state !== "current" ? ".3" : "1" }}
										onClick={(e) => {
											e.stopPropagation();
											setMonth(detail.month);
											setYear(detail.year);
											onChangePickDate(detail);
										}}
										className={`${styleEffect.renderStyleDateItem(
											detail
										)} w-[4rem] h-[4rem] rounded-full `}
									>
										<span>{detail.day}</span>
									</button>
								</div>
							))}
						</div>
					))}
				</div>
			</div>

			<div className="mt-auto text-[1.2rem] flex flex-col xl:flex-row xl:items-center justify-between gap-[2rem] xl:gap-0">
				<span>Ngày bạn chọn là: {pickDate.date_string} </span>
				<div className="flex gap-[2rem]">
					<button
						onClick={(e) => {
							e.stopPropagation();
							callbackCancel && callbackCancel();
						}}
						className="p-[.5rem_1rem] rounded-lg text-red-400 min-w-[6rem]"
					>
						Hủy
					</button>
					<button
						onClick={onChangeReturn}
						className="p-[.5rem_1rem] rounded-lg bg-text-theme text-color-section-theme min-w-[6rem] hover:bg-[#000] hover:text-[#fff]"
					>
						Xác nhận
					</button>
				</div>
			</div>
		</div>
	);
};

export default Calendar;
