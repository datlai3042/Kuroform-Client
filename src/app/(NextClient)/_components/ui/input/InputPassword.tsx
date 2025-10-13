"use client";
import { Eye, EyeOff, Info } from "lucide-react";
import React, { ReactNode, useId, useState } from "react";
import { FieldErrors, FieldValues, FormState, Path, UseFormRegister, UseFormWatch } from "react-hook-form";
import InputError from "./InputError";

type TProps<FormType extends FieldValues> = {
      FieldKey: Path<FormType>;
      error: FieldErrors<FormType>;
      placeholder: string;
      register: UseFormRegister<FormType>;
      watch: UseFormWatch<FormType>;
      unActiveLabel?: boolean;
      icon?: React.ReactNode;
      isValid?: boolean;
};

const InputPassword = <FormType extends FieldValues>(props: TProps<FormType>) => {
      const { FieldKey, error, placeholder, register, watch, unActiveLabel = false, icon, isValid = false } = props;
      const id = useId();
      const [showPassword, setShowPassword] = useState<boolean>(false);

      const input_id = `${FieldKey}-${id}`;
      const input_placeholder = `Nhập ${placeholder} của bạn`;
      const input_erros: React.ReactNode = error[FieldKey]?.message as ReactNode;
      const [focus, setFocus] = useState(false);

      return (
            <div className={`${focus ? 'my-[.8rem]' : ''} relative flex flex-col gap-[.6rem]`}>
                  <div className="flex items-center p-[.5rem_0rem]  w-full border-[.1rem]  border-border-page-color bg-transparent  h-max gap-[.6rem]  rounded-[.8rem] ">
                        <label className="p-[.4rem_1rem] w-[9rem] flex-center" htmlFor={`${FieldKey}-${id}`}>
                              {icon ? icon : <Info />}
                        </label>
                        <div className="flex flex-col gap-[.2rem]   w-full  ">
                              {!unActiveLabel && (
                                    <label
                                          style={{
                                                color: "rgb(103 113 130)",
                                                fontWeight: 600,
                                          }}
                                          htmlFor={`${FieldKey}-${id}`}
                                          className={`${focus ? "field-label-focus" : ""} top-0 first-letter:uppercase text-color-main font-bold text-[1.6rem]`}
                                    >
                                          {placeholder}
                                    </label>
                              )}

                              <div className="relative flex items-center w-full h-[60%]">
                                    <input
                                          type={showPassword ? "text" : "password"}
                                          id={input_id}
                                          {...register(FieldKey, {
                                                onBlur: (event) => {
                                                      setFocus(false);
                                                },
                                          })}
                                          onFocus={() => setFocus(true)}
                                          className={`${
                                                focus ? "field-input-focus" : ""
                                          } inline-block w-full bg-transparent pr-[1.2rem] opacity-100 rounded-[.3rem] text-text-theme   text-[1.4rem]   font-semibold outline-transparent  placeholder:opacity-100 `}
                                          placeholder={input_placeholder}
                                    />

                                    <div tabIndex={-1} className="px-[1rem] right-[1rem]" onClick={() => setShowPassword((prev) => !prev)}>
                                          {!showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </div>
                              </div>
                        </div>
                  </div>

                  {input_erros && <InputError message={input_erros as string} />}
            </div>
      );
};

export default InputPassword;
