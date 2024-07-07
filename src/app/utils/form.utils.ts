import { FormCore } from "@/type";
import { decodeGetDateInMonth } from "./time.utils";

type FormResultBaseOnDate = {
	date_createdAt: number;
	forms: FormCore.Form[] | null;
	date_full?: string;
	match: boolean;
};

export const generateStyleBackgroundImageForm = ({ formCore }: { formCore: FormCore.Form }) => {
	const formBackgroundImageUrl =
		formCore.form_background?.form_background_iamge_url ||
		formCore.form_setting_default.form_background_default_url;
	const formBackgroundPosition =
		formCore.form_background?.form_background_position ||
		formCore.form_setting_default.form_background_position_default;

	const formBackgroundSize = formCore.form_background?.mode_show;

	const positionAvatar = formCore.form_avatar?.position;

	return {
		style_background: {
			// backgroundImage: `url("${formBackgroundImageUrl}")`,
			// backgroundRepeat: "no-repeat",
			objectFit: formBackgroundSize,
			objectPosition: ` ${formBackgroundPosition?.y || 0}% ${formBackgroundPosition?.x || 0}%`,
		},

		position_buttn: positionAvatar === "left" ? "right-[2rem] xl:right-[6rem]" : "left-[2rem] xl:left-[6rem]",
	};
};

export const generateStyleAvatarForm = ({ formCore }: { formCore: FormCore.Form }) => {
	const modeAPI = formCore.form_avatar?.mode_shape;
	const positionAPI = formCore.form_avatar?.position;
	let shape = "rounded-0";
	let position = "right-0";

	if (modeAPI === "circle") shape = "rounded-full";
	if (positionAPI === "left") position = "left-0";
	if (positionAPI === "center") position = "left-[50%] translate-x-[-50%]";

	return { shape, position };
};

export const renderArrayFormFilterDate = ({
	dates_in_month,
	results,
}: {
	dates_in_month: number;
	results: FormCore.Form[];
}) => {
	const data_in_month: FormResultBaseOnDate[] = [];
	const filter_form = Array(dates_in_month)
		.fill(0)
		.map((_, day) => day + 1)
		.map((day, i) => {
			results.map((form) => {
				const date = decodeGetDateInMonth(form.createdAt || "");
				// if (date === day && !check) {
				// 	return data_in_month.push({
				// 		date_createdAt: day,
				// 		forms: data_in_month[i].forms?.concat(form)!,
				// 		match: true,
				// 		date_full: form.createdAt,
				// 	});
				// }
				if (date === day) {
					if (!data_in_month.map((d) => d.date_createdAt).includes(day)) {
						return data_in_month.push({
							date_createdAt: day,
							forms: [form],
							match: true,
							date_full: form.createdAt,
						});
					}
					const found_date_create = data_in_month.findIndex((d) => d.date_createdAt === day);

					if (found_date_create !== -1 && data_in_month[found_date_create].forms?.length! > 0) {
						data_in_month[found_date_create].forms?.push(form);
						return;
					} else {
						data_in_month[found_date_create].forms = [form];
						data_in_month[found_date_create].match = true;
						data_in_month[found_date_create].date_full = form.createdAt;

						return;
					}
				}
				if (data_in_month.map((d) => d.date_createdAt).includes(day)) {
					return;
				}
				return data_in_month.push({ date_createdAt: day, forms: null, match: false });
			});
		});
	return { data_in_month, filter_form };
};
