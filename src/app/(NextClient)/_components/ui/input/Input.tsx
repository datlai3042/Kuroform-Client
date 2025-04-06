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
      style?: React.CSSProperties;
};

const Input = <FormType extends FieldValues>(props: TProps<FormType>) => {
      const { FieldKey, error, placeholder, type, register, watch, style = {} } = props;
      const id = useId();

      if (type === "password") {
            return <InputPassword {...props} />;
      }

      return (
            <div style={style} className="flex flex-col w-full  min-h-[8rem] h-max gap-[.6rem]  ">
                  <label htmlFor={`${FieldKey}-${id}`} className="first-letter:uppercase text-[#3d4f58] font-semibold text-[1.4rem]">
                        {placeholder}
                  </label>
                  <input
                        value={watch(FieldKey)}
                        id={`${FieldKey}-${id}`}
                        {...register(FieldKey)}
                        className="inline-block w-full min-h-[4.4rem] p-[.6rem_1.2rem] text-[1.4rem] border-[.1rem] border-[rgb(136, 147, 151)] bg-color-section-theme opacity-100 rounded-[.6rem] text-text-theme  placeholder:text-[1.2rem] outline outline-[.2rem] focus:font-semibold outline-transparent focus:outline-color-main focus:border-transparent placeholder:opacity-100 focus:outline-4"
                        placeholder={`Nhập ${placeholder} của bạn`}
                  />
                  <div className="min-h-[1rem] text-[1.2rem] text-red-400 font-bold my-[.1rem]">{error && <p>{error[FieldKey]?.message as ReactNode}</p>}</div>
                  {/* {watch(FieldKey) && <p>{watch(FieldKey)}</p>} */}
            </div>
      );
};

export default Input;
