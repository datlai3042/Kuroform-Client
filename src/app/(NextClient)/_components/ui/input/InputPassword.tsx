"use client";
import { Eye, EyeOff } from "lucide-react";
import React, { ReactNode, useId, useState } from "react";
import { FieldErrors, FieldValues, FormState, Path, UseFormRegister, UseFormWatch } from "react-hook-form";

type TProps<FormType extends FieldValues> = {
	FieldKey: Path<FormType>;
	error: FieldErrors<FormType>;
	placeholder: string;
	register: UseFormRegister<FormType>;
	watch: UseFormWatch<FormType>;
};

const InputPassword = <FormType extends FieldValues>(props: TProps<FormType>) => {
	const { FieldKey, error, placeholder, register, watch } = props;
	const id = useId();
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const input_id = `${FieldKey}-${id}`;
	const input_placeholder = `Nhập ${placeholder} của bạn`;
	const input_erros: React.ReactNode = error[FieldKey]?.message as ReactNode;

	return (
		<div className="flex flex-col w-full min-h-[8rem] h-max gap-[.6rem]  ">
			<label
				htmlFor={`${FieldKey}-${id}`}
				className="first-letter:uppercase text-slate-700 font-semibold text-[1.4rem]"
			>
				{placeholder}
			</label>

			<div className="relative w-full h-[60%]">
				<input
					type={showPassword ? "text" : "password"}
					id={input_id}
					{...register(FieldKey)}
					className="w-full h-full p-[.6rem_1.2rem] border-[.2rem] border-slate-200 bg-slate-50 focus:bg-[#ffffff] opacity-70 focus:opacity-100 rounded-[.6rem] placeholder:text-[1.4rem] outline outline-[4px] outline-transparent focus:outline-blue-200 focus:border-transparent"
					placeholder={input_placeholder}
				/>

				<button
					tabIndex={-1}
					type="button"
					className="absolute top-[50%] translate-y-[-50%] right-[1rem]"
					onClick={() => setShowPassword((prev) => !prev)}
				>
					{!showPassword ? <Eye /> : <EyeOff />}
				</button>
			</div>
			<div className="min-h-[1rem] text-[1.2rem] text-red-400">{error && <p>{input_erros}</p>}</div>
		</div>
	);
};

export default InputPassword;
