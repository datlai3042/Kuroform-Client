import {
	INVAILD_ERROR,
	MAX_LENGTH_ERROR,
	MIN_LENGTH_ERROR,
	REQUIRE_ERROR,
	regexEmail,
} from "@/app/_constant/input.constant";
import { InputCore } from "@/type";
import moment from "moment";

export const superDateValidate = (date_full: string, inputPhoneSetting: InputCore.InputDate.InputSettingDate) => {
	let _next = true;
	let message = "";

	let type: InputCore.Commom.ErrorText | null = null;

	const { require } = inputPhoneSetting;

	if (!require) return { _next: true, message: "Đây là trường không bắt buộc", type: null };

	if (require && date_full) {
		const check_date_vaild = moment(date_full).isValid();
		if (!check_date_vaild) {
			_next = false;
			message = REQUIRE_ERROR;
			type = "REQUIRE";
			return { _next, message, type };
		}
	}

	if (require && !date_full) {
		_next = false;
		message = REQUIRE_ERROR;
		type = "REQUIRE";
		return { _next, message, type };
	}

	return { _next, message, type };
};
