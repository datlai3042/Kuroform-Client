"use client";
import React, { ReactNode, useId } from "react";
import { FieldError, FieldErrors, FieldValues, FormState, Path, UseFormRegister, UseFormWatch } from "react-hook-form";
import InputPassword from "./InputPassword";
import { InputType } from "@/type";

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
		<div className="flex flex-col w-full  min-h-[8rem] h-max gap-[1.6rem]  ">
			<label
				htmlFor={`${FieldKey}-${id}`}
				className="first-letter:uppercase text-text-theme font-semibold text-[1.4rem]"
			>
				{placeholder}
			</label>
			<input
				value={watch(FieldKey)}
				id={`${FieldKey}-${id}`}
				{...register(FieldKey)}
				className="inline-block w-full min-h-[4rem] p-[.6rem_1.2rem] border-[.2rem] border-slate-300 bg-[#ffffff] opacity-100 rounded-[.6rem] text-[#000] placeholder:text-[#000] outline outline-[4px] outline-transparent focus:outline-blue-200 focus:border-transparent placeholder:opacity-50"
				placeholder={`Nhập ${placeholder} của bạn`}
			/>
			<div className="min-h-[1rem] text-[1.2rem] text-red-400">
				{error && <p>{error[FieldKey]?.message as ReactNode}</p>}
			</div>
			{/* {watch(FieldKey) && <p>{watch(FieldKey)}</p>} */}
		</div>
	);
};

export default Input;
