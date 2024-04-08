"use client";
import React, { ReactNode, useId } from "react";
import { FieldError, FieldErrors, FieldValues, FormState, Path, UseFormRegister, UseFormWatch } from "react-hook-form";

type TProps<FormType extends FieldValues> = {
	FieldKey: Path<FormType>;
	error: FieldErrors<FormType>;
	register: UseFormRegister<FormType>;
	watch: UseFormWatch<FormType>;
};

const Input = <FormType extends FieldValues>(props: TProps<FormType>) => {
	const { FieldKey, error, register, watch } = props;
	const id = useId();

	console.log(FieldKey);

	return (
		<div className="flex flex-col w-full xl:w-[80%] min-h-[110px] h-max gap-[12px]  ">
			<label htmlFor={`${FieldKey}-${id}`} className="first-letter:uppercase text-violet-700 font-bold">
				{FieldKey}
			</label>
			<input
				id={`${FieldKey}-${id}`}
				{...register(FieldKey)}
				className="w-full h-[80%] p-[6px_12px] border-[2px] border-violet-600 outline-offset-[6px] out outline-violet-800 rounded-[6px] shadow"
			/>
			<div className="min-h-[16px] text-[13px] text-red-400">
				{error && <p>{error[FieldKey]?.message as ReactNode}</p>}
			</div>
			{/* {watch(FieldKey) && <p>{watch(FieldKey)}</p>} */}
		</div>
	);
};

export default Input;
