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
            <div className="flex flex-col w-full h-max gap-[1rem]  ">
                  <label htmlFor={`${FieldKey}-${id}`} className="first-letter:uppercase text-[#3d4f58] font-semibold text-[1.4rem]">
                        {placeholder}
                  </label>

                  <div className="relative w-full h-[60%]">
                        <input
                              type={showPassword ? "text" : "password"}
                              id={input_id}
                              {...register(FieldKey)}
                              className="inline-block w-full min-h-[4.4rem] p-[.6rem_1.2rem] border-[.1rem] border-[rgb(136, 147, 151)] bg-color-section-theme opacity-100 rounded-[.6rem] text-text-theme  placeholder:text-[1.2rem] text-[1.4rem] outline outline-[.2rem]  focus:font-semibold outline-transparent focus:outline-color-main focus:outline-4 focus:border-transparent placeholder:opacity-100 "
                              placeholder={input_placeholder}
                        />

                        <button
                              tabIndex={-1}
                              type="button"
                              className="absolute top-[50%] translate-y-[-50%] right-[1rem]"
                              onClick={() => setShowPassword((prev) => !prev)}
                        >
                              {!showPassword ? <Eye size={18}/> : <EyeOff size={18}/>}
                        </button>
                  </div>
                  <div className="min-h-[1rem] text-[1.2rem] text-red-400 font-bold my-[.2rem]">{error && <p>{input_erros}</p>}</div>
            </div>
      );
};

export default InputPassword;
