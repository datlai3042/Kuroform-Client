import { UI } from "@/type";

export const getDateInMonth = ({ month, year }: { month: number; year: number }) => {
	return new Date(year, month, 0).getDate();
};

export const fillTwoCharDate = (value_date: number): string => {
	return value_date <= 9 ? `0${value_date}` : value_date.toString();
};
export const generateFullDateString = ({ day, month, year }: { day: number; month: number; year: number }): string => {
	const result = `${year}-${fillTwoCharDate(month)}-${fillTwoCharDate(day)}`;
	return result;
};

export const decodeGetDateInMonth = (time: string) => {
	const date = new Date(time).getDate();
	return date;
};

export const getNameWeekDate = ({
	date,
	locale = "en-EN",
}: {
	date: string;
	locale?: string;
}): UI.Calender.DateNameInWeek => {
	const date_name = new Date(date);
	return date_name.toLocaleDateString(locale, { weekday: "long" }) as UI.Calender.DateNameInWeek;
};

export const getScopeBetweenTwoMonthStart = ({ date_name }: { date_name: UI.Calender.DateNameInWeek }) => {
	let scope: number;
	switch (date_name) {
		case "Sunday":
			return (scope = 0);
		case "Monday":
			return (scope = 1);
		case "Tuesday":
			return (scope = 2);
		case "Wednesday":
			return (scope = 3);
		case "Thursday":
			return (scope = 4);
		case "Friday":
			return (scope = 5);
		case "Saturday":
			return (scope = 6);
		default:
			return (scope = 0);
	}
};

export const getScopeBetweenTwoMonthEnd = ({ date_name }: { date_name: UI.Calender.DateNameInWeek }) => {
	let scope: number;
	switch (date_name) {
		case "Sunday":
			return (scope = 6);
		case "Monday":
			return (scope = 5);
		case "Tuesday":
			return (scope = 4);
		case "Wednesday":
			return (scope = 3);
		case "Thursday":
			return (scope = 2);
		case "Friday":
			return (scope = 1);
		case "Saturday":
			return (scope = 0);
		default:
			return (scope = 0);
	}
};
