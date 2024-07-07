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
import { AtSign, CalendarCheckIcon, ImageIcon, Phone } from "lucide-react";
import Calendar from "@/app/(NextClient)/test/calendar/Calendar";
import { generateFullDateString } from "@/app/utils/time.utils";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { superDateValidate } from "../_validate/inputDate.validate";
import Image from "next/image";
import InputImageTitle from "./InputImageTitle";
import LoadingClient from "@/app/(NextClient)/_components/LoadingClient";
import LoadingSpinner from "@/app/(NextClient)/_components/ui/loading/LoadingSpinner";
import useUploadFileFormAnswers from "@/app/hooks/form-answer/useUploadFileFormAnswer";
import { UploadFileAnswer } from "@/app/_services/formAnswer.service";
import { usePathname } from "next/navigation";
import { checkValueHref } from "@/app/_lib/utils";

type TProps = {
	inputItem: InputCore.InputImage.InputTypeImage;
	formCore: FormCore.Form;
};

const InputImageAnswer = (props: TProps) => {
	const { inputItem, formCore } = props;
	const segment = usePathname();

	const tempMode = segment.startsWith("/form") && segment.endsWith("/edit");

	const {
		formAnswer: { inputFormErrors, inputFormData, submitState, form_answer_id },
		setFormAnswer,
	} = useContext(FormAnswerContext);

	const uploadFile = useUploadFileFormAnswers();

	const [value, setValue] = useState<string>(() => {
		const data_input_item = inputFormData.find((ip) => ip._id === inputItem._id && ip.type === "FILE_IMAGE");
		return data_input_item?.value as string;
	});

	useEffect(() => {
		setValue(() => {
			const data_input_item = inputFormData.find((ip) => ip._id === inputItem._id && ip.type === "FILE_IMAGE");
			return data_input_item?.value as string;
		});
	}, []);

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

	const inputRef = useRef<HTMLInputElement | null>(null);

	const [filePreview, setFilePreview] = useState<string>("");

	const handleClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			const formData: UploadFileAnswer = new FormData();
			formData.append("file", file);
			formData.append("form_answers_id", form_answer_id);
			formData.append("form_id", formCore._id);

			const link_preview = URL.createObjectURL(file);
			setFilePreview(link_preview);
			if (tempMode) return;
			uploadFile.mutate(formData);
		}
	};

	useEffect(() => {
		if (uploadFile.isSuccess) {
			const { url } = uploadFile.data.metadata;
			setValue(url);
			setFilePreview(url);
			if (inputItem.core.setting.require) {
				setInputRequireGlobal(setFormAnswer, inputItem._id!, true);
			}

			//xét data global
			setDataInputGlobal(setFormAnswer, inputItem._id!, url);
		}
	}, [uploadFile.isSuccess]);

	console.log({ filePreview, value });

	useEffect(() => {
		return () => {
			URL.revokeObjectURL(filePreview);
		};
	}, [filePreview]);

	console.log({ value, inputFormData });

	return (
		<InputAnswerWrapper>
			<DivNative
				id={`_inputid_${inputItem._id}`}
				className={`${styleEffect.onCheckError.borderWrapper(
					error.error || checkRequire
				)} relative w-full min-h-[18rem] h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[2rem]  rounded-lg`}
			>
				<InputImageTitle inputItem={inputItem} formCore={formCore} />
				<DivNative className="relative flex  items-center justify-center gap-[1rem] text-text-theme ">
					<DivNative className={`h-full w-full  flex flex-col items-start justify-center  gap-[3rem]  `}>
						{value && checkValueHref(value) && (
							<a
								href={value}
								target="_blank"
								className="text-[#000] text-[1.4rem] flex items-center gap-[1rem]"
							>
								<ImageIcon />
								Xem Ảnh
							</a>
						)}
						<button
							onClick={handleClick}
							className="p-[.8rem] min-w-[12rem] border-[.1rem] border-text-theme bg-slate-900 text-[#fff] text-[1.4rem] rounded-xl"
						>
							Tải ảnh lên
						</button>
						<input type="file" hidden={true} ref={inputRef} onChange={handleUpload} />
					</DivNative>
					<div className="w-[16rem] h-[12rem]">
						{uploadFile.isPending ? (
							<LoadingSpinner color="blue" />
						) : (
							!tempMode &&
							!!value && (
								<Image
									src={value}
									width={70}
									height={70}
									alt="file hinh anh"
									className="w-full h-full"
									unoptimized={true}
								/>
							)
						)}

						{tempMode && filePreview && (
							<Image
								src={filePreview}
								width={70}
								height={70}
								alt="file hinh anh"
								className="w-full h-full"
								unoptimized={true}
							/>
						)}
					</div>
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

export default InputImageAnswer;
