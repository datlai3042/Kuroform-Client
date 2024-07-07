"use client";
import { FormCore, InputCore, UI } from "@/type";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import InputAnswerWrapper from "../InputAnswerWrapper";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import { InputError } from "../_email/InputEmailAnswer";
import { superTextValidate } from "../_validate/inputText.validate";
import InputErrorMessage from "../InputError/InputErrorMessage";
import { deleteErrorGlobal, setDataInputGlobal, setErrorGlobal, setInputRequireGlobal } from "../_utils/formAnswer.uti";
import MinMaxInput from "../../MinMaxInput";
import { superPhoneValidate } from "../_validate/inputPhone.validate";
import { AtSign, CalendarCheckIcon, Phone } from "lucide-react";
import InputDateTitle from "./InputDateTitle";
import Calendar from "@/app/(NextClient)/test/calendar/Calendar";
import { generateFullDateString } from "@/app/utils/time.utils";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { superDateValidate } from "../_validate/inputDate.validate";

type TProps = {
	inputItem: InputCore.InputDate.InputTypeDate;
	formCore: FormCore.Form;
};

const InputDateAnswer = (props: TProps) => {
	const { inputItem, formCore } = props;

	const {
		formAnswer: { inputFormErrors, inputFormData, submitState },
		setFormAnswer,
	} = useContext(FormAnswerContext);

	const [error, setError] = useState<InputError>(() => {
		let instanceError: InputError = {} as InputError;
		const temp = inputFormErrors.filter((dataError) => {
			if (dataError._id === inputItem._id) {
				return dataError;
			}
		})[0];
		instanceError = {
			error: !!temp,
			message: temp?.message,
			type: temp?.type,
		};
		return instanceError;
	});
	const [write, setWrite] = useState<boolean>(false);

	//Xem input này có bắt buộc nhập không
	const checkRequire = useMemo(() => {
		if (inputFormErrors.some((ip) => ip._id === inputItem._id!) && inputItem.core.setting.require) return true;
		return false;
	}, [inputItem, inputFormErrors]);

	//Check input này có nằm trong mảng lỗi global khi submit không
	const checkErrorSubmit = useMemo(() => {
		let inputError = inputFormErrors.filter((ip) => ip._id === inputItem._id!)[0];
		return inputError ? inputError : null;
	}, [inputItem, inputFormErrors]);

	//focus -> write = true
	//xóa lỗi local, xóa lỗi global
	//đặt lại cờ require trong global bằng false
	//xét data global
	const onFocus = () => {
		//Xét write ?
		setWrite(true);

		//reset lỗi
		if (error.error) {
			setError((prev) => ({ ...prev, error: false, type: null, message: "" }));
		}

		//delete lỗi trong mảng global error
		if (inputFormErrors.some((ip) => ip._id === inputItem._id!)) {
			deleteErrorGlobal(setFormAnswer, inputItem._id!);
		}

		//nếu input có yêu cầu require thì đặt bằng false, nào blur validate lại thì đặt bằng true
		if (inputItem.core.setting.require) {
			setInputRequireGlobal(setFormAnswer, inputItem._id!, false);
		}
	};

	const styleEffect = {
		onCheckError: {
			borderWrapper: (error: boolean) => {
				if (error) return "border-red-600";
				return " border-zinc-100";
			},

			borderInput: (error: boolean) => {
				if (error) return "border-red-600";
				return "border-gray-300";
			},
		},

		styleTitle: () => {
			return {
				fontSize: inputItem.core.setting.input_size || formCore.form_setting_default.input_size,
				color: inputItem.core.setting.input_color || formCore.form_setting_default.input_color,
				fontStyle: inputItem.core.setting.input_style || formCore.form_setting_default.input_style,
			};
		},
	};

	const displayError = error.error || checkErrorSubmit;

	const [openModel, setOpenModel] = useState<boolean>(false);

	const date = new Date();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const year = date.getFullYear();
	const [pickDate, setPickDate] = useState({
		day,
		month,
		year,
		date_string: generateFullDateString({ day, month, year }),
	});

	const handleOnChange = (value: UI.Calender.Event.DateResult) => {
		const { day, month, date_string, year } = value;
		setPickDate({ day, month, year, date_string });
		setOpenModel(false);
		console.log({ value });
		if (write) {
			//lấy value input để validate
			if (date_string) {
				const { setting } = inputItem.core;

				//validate dựa trên setting input
				const superValidate = superDateValidate(date_string, setting);
				const { _next, message, type } = superValidate;

				console.log({ superValidate, date_string });
				//validate pass
				if (_next) {
					//delete error global
					setError((prev) => ({ ...prev, errorState: false, type: null }));
					//đặt lại cờ require lại thành true
					if (inputItem.core.setting.require) {
						setInputRequireGlobal(setFormAnswer, inputItem._id!, true);
					}

					//xét data global
					setDataInputGlobal(setFormAnswer, inputItem._id!, new Date(date_string).toISOString());
					return;
				}
				//fail validate
				else {
					//đặt lỗi dựa vào check validate return
					setError((prev) => ({ ...prev, error: true, type: type, message }));

					//xét lỗi global
					setErrorGlobal(setFormAnswer, inputItem._id!, inputItem.input_title || "", type!, message);
				}
			}
		}
	};

	const actionCancle = () => {
		setOpenModel(false);
		setPickDate({ day, month, year, date_string: generateFullDateString({ day, month, year }) });
	};

	return (
		<InputAnswerWrapper>
			<DivNative
				id={`_inputid_${inputItem._id}`}
				className={`${styleEffect.onCheckError.borderWrapper(
					error.error || checkRequire
				)} relative w-full min-h-full h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[2rem]  rounded-lg`}
			>
				<InputDateTitle inputItem={inputItem} formCore={formCore} />
				<DivNative className="relative flex flex-col items-start gap-[1rem] text-[#000] ">
					<button
						onClick={() => setOpenModel((prev) => !prev)}
						className="border-[.1rem] border-text-theme p-[1rem] rounded-xl flex items-center gap-[1rem]"
					>
						<span>{pickDate.date_string}</span>
						<CalendarCheckIcon />
					</button>
					{openModel && (
						<div className="absolute z-[3] bottom-[-43rem] left-0" onFocus={onFocus}>
							<ClickOutSide setOpenModel={setOpenModel}>
								<Calendar onChange={handleOnChange} callbackCancel={actionCancle} />
							</ClickOutSide>
						</div>
					)}
					<p className="text-[2rem]">
						Thời gian đang chọn là:
						<span> {pickDate.date_string}</span>
					</p>
				</DivNative>

				{displayError && (
					<InputErrorMessage
						message={checkErrorSubmit?.message || error.message}
						type={checkErrorSubmit?.type || error.type!}
					/>
				)}
			</DivNative>
		</InputAnswerWrapper>
	);
};

export default InputDateAnswer;
