import { UI } from "@/type";
import {
	generateFullDateString,
	getDateInMonth,
	getNameWeekDate,
	getScopeBetweenTwoMonthEnd,
	getScopeBetweenTwoMonthStart,
} from "./time.utils";

export const renderArrayDatesInMonth = ({ month, year }: { month: number; year: number }) => {
	//block này lấy thông tin về tháng đang focus
	const current_date_number = getDateInMonth({ month: month, year: year });

	//lấy thông tin về ngày đầu tháng và cuối tháng
	const current_info_date_begin = generateFullDateString({ day: 1, month: month, year: year });
	const current_name_in_week_begin = getNameWeekDate({ date: current_info_date_begin });
	const current_info_date_end = generateFullDateString({ day: current_date_number, month: month, year: year });
	const current_name_in_week_end = getNameWeekDate({ date: current_info_date_end });

	//Khoảng cách giữa tháng lân cận để fill cho đũ chỗ 7 ngày trong tuần
	let scopeStart = getScopeBetweenTwoMonthStart({ date_name: current_name_in_week_begin });
	let scope_end = getScopeBetweenTwoMonthEnd({ date_name: current_name_in_week_end });

	// các thông số render
	let number_dates_appear_table = current_date_number + scope_end + scopeStart;

	let number_week_render = Math.ceil(number_dates_appear_table / 7);

	let render_result: UI.Calender.RenderDateInMonth[] = [];

	// thông số thiết lập vòng lập mỗi tuần
	let start_loop = -scopeStart;
	let end_loop = start_loop + 7;

	//Handle thông số về tháng tiếp theo
	let day_next_month = 1;
	let day_previos_month = 1;
	const next_year = month + 1 > 12 ? year + 1 : year;
	const next_month = month + 1 > 12 ? 1 : month + 1;

	//Handler thông số về tháng trước đó
	let previos_year = month - 1 === 0 ? year - 1 : year;
	let previos_month = month - 1 === 0 ? 12 : month - 1;
	//vòng lập mỗi tuần
	for (let week = 1; week <= number_week_render; week++) {
		//thu thập thông tin các ngày trong tuần
		let new_date_menber: UI.Calender.DateInfo[] = [];

		//lướt qua các ngày trong tuần
		for (let day = start_loop; day <= end_loop; day++) {
			let info_day: UI.Calender.DateInfo;

			//Tối đa 7 ngày 1 tuần
			if (new_date_menber.length === 7) continue;

			//các ngày thuộc về tháng trước đó
			if (day < 0) {
				// số ngày của tháng trước đó
				const current_date_previos_number = getDateInMonth({ month: previos_month, year: previos_year });
				//các ngày cuối tháng mà tuần của bảng còn thiếu
				const day_previos = current_date_previos_number - scopeStart + day_previos_month;

				const current_info_date_previos = generateFullDateString({
					day: day_previos,
					month: previos_month,
					year: previos_year,
				});

				const day_name_in_week = getNameWeekDate({ date: current_info_date_previos });
			
				info_day = {
					date_full: current_info_date_previos,
					day_name_in_week,
					month: previos_month,
					year: previos_year,
					day: day_previos,
					state: "previos",
				};

				//số ngày của tháng trước sẽ trừ 1 cho lần lặp sao, đơn giản là tôi giảm dần nó xuống
				day_previos_month += 1;
				new_date_menber.push(info_day);
				continue;
			} else if (day + 1 > current_date_number) {
				//Handle các ngày của tháng tiếp theo
				const current_info_date_next = generateFullDateString({
					day: day_next_month,
					month: next_month,
					year: next_year,
				});

				const day_name_in_week = getNameWeekDate({ date: current_info_date_next });

				info_day = {
					date_full: current_info_date_next,
					day_name_in_week,
					month: next_month,

					year: next_year,
					day: day_next_month,
					state: "next",
				};

				//lần loop sau thì ngày sẽ tăng một
				day_next_month += 1;
				new_date_menber.push(info_day);
				continue;
			}

			const date_full = generateFullDateString({ day: day + 1, month: month, year: year });

			const day_name_in_week = getNameWeekDate({ date: date_full });

			info_day = {
				date_full,
				day_name_in_week,
				month: month,
				year: year,
				day: day + 1,
				state: "current",
			};

			new_date_menber.push(info_day);
		}

		start_loop += 7;
		end_loop = start_loop + 7;
		render_result.push({ week_count: week, week_menber: new_date_menber });
	}
	return render_result;
};
