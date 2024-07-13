import { CustomRequest, FormCore, InputCore, User } from "@/type";
import { inputSettingText } from "../_constant/input.constant";
import Http from "./http";
import { ResponseApi } from "../_schema/api/response.shema";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import store from "./redux/store";
import { onCalculationData } from "./redux/features/dataForm.slice";
import moment from "moment";
import { UserType } from "../_schema/user/user.type";

export const validateEmail = (email: string) => {
	const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;
	return email.match(regex);
};

export const normalizePath = (url: string) => {
	return url.startsWith("/") ? url.slice(1) : url;
};

export const expiresToken = (expireString: string) => {
	const expire = Date.parse(expireString);
	return expire / 1000;
};

export const getCookieValueHeader = (CookieName: string, CookiesString: string) => {
	const cookieSplit = CookiesString?.split(";");
	let cookies: { [key: string]: string } = {};
	cookieSplit.forEach((pair) => {
		const [name, value] = pair.split("=").map((item) => item.trim());
		cookies[name] = value;
	});

	return cookies[CookieName];
};

export const setValueLocalStorage = (key: string, value: any) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const removeValueLocalStorage = (key: string) => {
	localStorage.removeItem(key);
};

export const generateInfoRequest = (url: string, options: CustomRequest) => {
	const body = options?.body
		? options.body instanceof FormData
			? options.body
			: JSON.stringify(options.body)
		: undefined;
	const baseHeader =
		options?.body instanceof FormData
			? {}
			: {
					"Content-Type": "application/json",
			  };

	let baseUrl;
	if (options?.baseUrl === undefined) {
		if (process.env.NEXT_PUBLIC_MODE === "DEV") {
			baseUrl = "http://localhost:4000";
		} else {
			baseUrl = process.env.NEXT_PUBLIC_BACK_END_URL;
		}
	} else {
		if (process.env.NEXT_PUBLIC_MODE === "DEV") {
			baseUrl = "http://localhost:3000";
		} else {
			baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
		}
	}

	const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

	return { body, baseHeader, baseUrl, fullUrl };
};

// Handle Form

// export const setTitleForm = async (form: FormCore.Form) => {
// 	const addInputAPI = await Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/set-title-form", {
// 		form,
// 	});

// 	return addInputAPI;
// };

export const addInputToSectionTitle = async (title: string, form: FormCore.Form) => {
	const newForm = structuredClone(form);
	newForm.form_title.form_title_value = title;
	const settingMerge = {
		input_color: newForm.form_setting_default.input_color || inputSettingText.input_color,
		input_size: newForm.form_setting_default.input_size || inputSettingText.input_size,
		input_style: newForm.form_setting_default.input_style || inputSettingText.input_style,
	};

	newForm.form_inputs.push({ type: "TEXT", core: { setting: { ...inputSettingText, ...settingMerge } } });
	const addInputAPI = await Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/add-input-to-title", {
		form: newForm,
	});

	return addInputAPI;
};

//delete
export const setTitleInput = async (title: string, inputItem: InputCore.InputForm, form: FormCore.Form) => {
	const newInput = { ...inputItem };
	newInput.input_title = title;
	newInput._id = inputItem._id;

	console.log({ newInput, inputItem });
	const addInputAPI = await Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/update-input-item", {
		newInput,
		form,
	});

	return addInputAPI;
};

//delete
export const addInputItem = async (inputItem: InputCore.InputForm, form: FormCore.Form) => {
	const newForm = structuredClone(form);
	const indexInputCurrentEvent = form.form_inputs.findIndex((ip) => ip._id === inputItem._id);

	const settingMerge = {
		...inputItem.core.setting,
		input_color: newForm.form_setting_default.input_color || inputSettingText.input_color,
		input_size: newForm.form_setting_default.input_size || inputSettingText.input_size,
		input_style: newForm.form_setting_default.input_style || inputSettingText.input_style,
	} as InputCore.Setting.InputSettingTextCommon;

	const inputPush: InputCore.InputText.InputTypeText = { type: "TEXT", core: { setting: settingMerge } };
	newForm.form_inputs.splice(indexInputCurrentEvent + 1, 0, inputPush);

	const addInputAPI = await Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/update-form", {
		form: newForm,
	});

	return addInputAPI;
};

export const removeInputWithId = async (form: FormCore.Form, inpur_id: string) => {
	const newForm = { ...form };
	newForm.form_inputs = form.form_inputs.filter((ele) => ele._id !== inpur_id);
	const addInputAPI = await Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/delete-input-item", {
		form: newForm,
	});

	return addInputAPI;
};

export const renderStyleTitleCore = (formCore: FormCore.Form) => {
	return {
		fontSize: `${
			formCore.form_title.form_title_size
				? formCore.form_title.form_title_size / 10 + "rem"
				: formCore.form_setting_default.form_title_size_default / 10 + "rem"
		}`,
		color: `${
			formCore.form_title.form_title_color
				? formCore.form_title.form_title_color
				: formCore.form_setting_default.form_title_color_default
		}`,
		fontStyle: `${
			formCore.form_title.form_title_style
				? formCore.form_title.form_title_style
				: formCore.form_setting_default.form_title_style_default
		}`,
	};
};

//xóa dấu tiếng việt
export const stringToSlug = (str: string) => {
	// remove accents
	const from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
		to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
	for (let i = 0, l = from.length; i < l; i++) {
		str = str.replace(RegExp(from[i], "gi"), to[i]);
	}

	str = str
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\-]/g, "-")
		.replace(/-+/g, "-");

	return str;
};

export const checkValueHref = (value: string) => {
	const regex = new RegExp("^(http|https)://", "i");
	return value?.match(regex) || false;
};

export const filterTypeInput = <InputType extends InputCore.InputForm>(
	_id: string,
	inputItem: InputCore.InputForm
): inputItem is InputType => {
	return _id === inputItem._id;
};

export const handleDataForm = (reports: FormCore.FormAnswer.FormAnswerCore["reports"], form_id: string) => {
	let dataExcel: { [key: string]: string }[] = [];

	let filterFormShowChart: {
		[key: string]: {
			_id: string;
			title: string;
			value: string | string[];
			time: Date;
			form_answer_id: string;
		}[];
	} = {};

	let filterFormShowExcel: {
		[key: string]: {
			_id: string;
			title: string;
			value: string | string[];
			time: Date;
			form_answer_id: string;
		}[];
	} = {};
	reports.map((rp) => {
		let dataXlsx = {};
		rp.answers.map((ans) => {
			const titleExcel = ans.title || `${ans.type}_${ans._id}`;
			const titleHeaderTable = ans.title || `Không có tiêu đề`;

			const input_value = generateValueInputAnswer(ans);
			dataXlsx = {
				...dataXlsx,
				"Thời gian gửi": moment(new Date(rp.createdAt)).format("hh:mm Do MMMM YYYY"),
				[titleExcel]: input_value,
			};
			if (!filterFormShowChart[ans._id]) {
				filterFormShowChart[ans._id] = [];
				filterFormShowChart[ans._id].push({
					_id: ans._id,
					title: titleHeaderTable,
					value: input_value,
					time: rp.createdAt,
					form_answer_id: rp._id,
				});
			} else {
				filterFormShowChart[ans._id] = filterFormShowChart[ans._id].concat({
					_id: ans._id,
					title: titleHeaderTable,
					value: input_value,
					time: rp.createdAt,
					form_answer_id: rp._id,
				});
			}

			if (!filterFormShowExcel[ans._id + "_#_" + ans.type]) {
				filterFormShowExcel[ans._id + "_#_" + ans.type] = [];

				const answerItem = {
					_id: ans._id,
					title: titleHeaderTable,
					value: input_value,
					time: rp.createdAt,
					form_answer_id: rp._id,
				};

				filterFormShowExcel[ans._id + "_#_" + ans.type].push(answerItem);
			} else {
				filterFormShowExcel[ans._id + "_#_" + ans.type] = filterFormShowExcel[
					ans._id + "_#_" + ans.type
				].concat({
					_id: ans._id,
					title: titleHeaderTable,
					value: input_value,
					time: rp.createdAt,
					form_answer_id: rp._id,
				});
			}
		});

		dataExcel = dataExcel.concat(dataXlsx);
	});
	store.dispatch(
		onCalculationData({
			dataFormShowChart: filterFormShowChart,
			dataFormShowExcel: filterFormShowExcel,
			dataExcel: dataExcel,
			form_id,
			form_answer_total: reports.length,
		})
	);
	return true;
};

export const generateValueInputAnswer = (answer: FormCore.FormAnswer.Answer) => {
	let value_answer = "";

	if (typeof answer.value === "object") {
		value_answer = answer.value.join(", ");
		return value_answer;
	}
	if (answer.type === "DATE") {
		value_answer = moment(new Date(answer.value)).format(" Do MMMM YYYY");
		return value_answer;
	}

	value_answer = answer.value;
	return value_answer;
};

export const generateContentToUrl = (url: string) => {
	let content = "";
	if (url === "/dashboard") return (content = "Trang chủ");
	if (url === "/settings") return (content = "Cài đặt");
	if (url.startsWith("/profile")) return (content = "Trang cá nhân");
	if (url.endsWith("/edit")) return (content = "Trang chỉnh sửa");
	if (url === "/notifications") return (content = "Trang thông báo");
	if (url === "/trash") return (content = "Trang ");
};

export const generateFullNameUser = (user: UserType | undefined) => {
	if (!user) return;
	return user?.user_first_name + " " + user?.user_last_name;
};

export const generateContentToFormState = (form_state: FormCore.Form["form_state"]) => {
	let content = "";
	if (form_state === "isDelete") return (content = "Form đã bị xóa");
	if (form_state === "isPrivate") return (content = "Form riêng tư");
	if (form_state === "isPublic") return (content = "Form công khai");
};
