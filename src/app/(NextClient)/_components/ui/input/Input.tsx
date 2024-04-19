"use client";
import React, { ReactNode, useId } from "react";
import { FieldError, FieldErrors, FieldValues, FormState, Path, UseFormRegister, UseFormWatch } from "react-hook-form";
import InputPassword from "./InputPassword";

type TProps<FormType extends FieldValues> = {
	FieldKey: Path<FormType>;
	error: FieldErrors<FormType>;
	placeholder: string;
	type: InputType;
	register: UseFormRegister<FormType>;
	watch: UseFormWatch<FormType>;
};

const Input = <FormType extends FieldValues>(props: TProps<FormType>) => {
	const { FieldKey, error, placeholder, type, register, watch } = props;
	const id = useId();

	if (type === "password") {
		return <InputPassword {...props} />;
	}

	return (
		<div className="flex flex-col w-full xl:w-[80%] min-h-[115px] h-max gap-[12px]  ">
			<label htmlFor={`${FieldKey}-${id}`} className="first-letter:uppercase text-slate-700 font-bold">
				{placeholder}
			</label>
			<input
				id={`${FieldKey}-${id}`}
				{...register(FieldKey)}
				className="w-full h-[80%] p-[6px_12px] border-[2px] border-slate-300 bg-slate-50 focus:bg-[#ffffff] opacity-70 focus:opacity-100 rounded-[6px]  placeholder:text-[14px]"
				placeholder={`Nhập ${placeholder} của bạn`}
			/>
			<div className="min-h-[16px] text-[13px] text-red-400">
				{error && <p>{error[FieldKey]?.message as ReactNode}</p>}
			</div>
			{/* {watch(FieldKey) && <p>{watch(FieldKey)}</p>} */}
		</div>
	);
};

export default Input;
