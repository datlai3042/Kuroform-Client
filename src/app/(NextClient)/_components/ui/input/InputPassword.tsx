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
      const [focus, setFocus] = useState(false);

      return (
            <div className="flex flex-col w-full min-h-[8rem] h-max gap-[.6rem]  ">
                  <label
                        style={{ color: focus ? "#71665c" : "", fontWeight: focus ? 700 : "" }}
                        htmlFor={`${FieldKey}-${id}`}
                        className="first-letter:uppercase text-[#71665c] font-semibold text-[1.4rem]"
                  >
                        {placeholder}
                  </label>

                  <div className="relative w-full h-[60%]">
                        <input
                              type={showPassword ? "text" : "password"}
                              id={input_id}
                              {...register(FieldKey, {
                                    onBlur: (event) => {
                                          setFocus(false);
                                    },
                              })}
                              onFocus={() => setFocus(true)}
                              className="inline-block w-full bg-transparent min-h-[4.8rem] p-[.6rem_1.2rem] border-[.1rem] border-[#71665c66]  opacity-100 rounded-[.6rem] text-text-theme  placeholder:text-[1.3rem] text-[1.4rem] outline outline-[.2rem]  focus:font-semibold outline-transparent focus:outline-[#71665c] focus:outline-3 focus:border-transparent placeholder:opacity-100 "
                              placeholder={input_placeholder}
                        />

                        <button
                              tabIndex={-1}
                              type="button"
                              className="absolute top-[50%] translate-y-[-50%] right-[1rem]"
                              onClick={() => setShowPassword((prev) => !prev)}
                        >
                              {!showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                  </div>
                  {input_erros && (
                        <div className="min-h-[1rem] md:pl-[.1rem] mb-[1rem] text-[1.2rem] text-red-400 font-bold my-[.2rem]">{<p>{input_erros}</p>}</div>
                  )}
            </div>
      );
};

export default InputPassword;
