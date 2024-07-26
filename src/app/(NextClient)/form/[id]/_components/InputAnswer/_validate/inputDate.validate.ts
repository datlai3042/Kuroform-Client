import {
	INVAILD_ERROR,
	MAX_LENGTH_ERROR,
	MIN_LENGTH_ERROR,
	REQUIRE_ERROR,
	regexEmail,
} from "@/app/_constant/input.constant";
import { InputCore } from "@/type";
import moment from "moment";

export const superDateValidate = ({
	inputValue,
	inputSetting,
}: {
	inputValue: string;
	inputSetting: InputCore.InputDate.InputSettingDate;
}) => {
	let _next = true;
	let message = "";

	let type: InputCore.Commom.ErrorText | null = null;

	const { require } = inputSetting;

	if (!require) return { _next: true, message: "Đây là trường không bắt buộc", type: null };

	if (require && inputValue) {
		const check_date_vaild = moment(inputValue).isValid();
		if (!check_date_vaild) {
			_next = false;
			message = REQUIRE_ERROR;
			type = "REQUIRE";
			return { _next, message, type };
		}
	}

	if (require && !inputValue) {
		_next = false;
		message = REQUIRE_ERROR;
		type = "REQUIRE";
		return { _next, message, type };
	}

	return { _next, message, type };
};
