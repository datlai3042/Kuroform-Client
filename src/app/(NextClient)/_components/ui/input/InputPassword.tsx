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
		<div className="flex flex-col w-full xl:w-[80%] min-h-[115px] h-max gap-[12px]  ">
			<label htmlFor={`${FieldKey}-${id}`} className="first-letter:uppercase text-slate-700 font-bold">
				{placeholder}
			</label>

			<div className="relative w-full h-[80%]">
				<input
					type={showPassword ? "text" : "password"}
					id={input_id}
					{...register(FieldKey)}
					className="w-full h-full p-[6px_12px] border-[2px] border-slate-200 bg-slate-50 focus:bg-[#ffffff] opacity-70 focus:opacity-100 rounded-[6px] placeholder:text-[14px]"
					placeholder={input_placeholder}
				/>

				<button
					tabIndex={-1}
					type="button"
					className="absolute top-[50%] translate-y-[-50%] right-[10px]"
					onClick={() => setShowPassword((prev) => !prev)}
				>
					{!showPassword ? <Eye /> : <EyeOff />}
				</button>
			</div>
			<div className="min-h-[16px] text-[13px] text-red-400">{error && <p>{input_erros}</p>}</div>
		</div>
	);
};

export default InputPassword;
