"use client";
import React, { ReactNode, useId, useState } from "react";
import { FieldErrors, FieldValues, Path, UseFormRegister, UseFormWatch } from "react-hook-form";
import InputPassword from "./InputPassword";
import { Info } from "lucide-react";
import { InputType } from "@/type";
import InputError from "./InputError";

type TProps<FormType extends FieldValues> = {
      FieldKey: Path<FormType>;
      error: FieldErrors<FormType>;
      placeholder: string;
      type: InputType;
      register: UseFormRegister<FormType>;
      watch: UseFormWatch<FormType>;
      style?: React.CSSProperties;
      unActiveLabel?: boolean;
      icon?: React.ReactNode;
      isValid?: boolean;
};

const Input = <FormType extends FieldValues>(props: TProps<FormType>) => {
      const { FieldKey, error, placeholder, type, register, watch, style = {}, unActiveLabel = false, icon, isValid = false } = props;
      const id = useId();
      const [focus, setFocus] = useState(false);
      if (type === "password") {
            return <InputPassword {...props} />;
      }
      const input_erros: React.ReactNode = error[FieldKey]?.message as ReactNode;

      return (
            <div style={style} className={`${focus ? "my-[.8rem]" : ""} relative flex flex-col gap-[.6rem]`}>
                  <div className="relative flex items-center p-[.5rem_0rem]  w-full border-[.1rem]  border-border-page-color bg-transparent  h-max gap-[.6rem]  rounded-[.8rem] ">
                        <label className="p-[.4rem_1rem] w-[9rem] flex-center" htmlFor={`${FieldKey}-${id}`}>
                              {icon ? icon : <Info />}
                        </label>

                        <div className=" flex flex-col gap-[.2rem]   w-full">
                              {!unActiveLabel && (
                                    <label
                                          style={{
                                                color: "rgb(103 113 130)",
                                                fontWeight: 600,
                                          }}
                                          htmlFor={`${FieldKey}-${id}`}
                                          className={`${focus ? "field-label-focus" : ""} top-0 first-letter:uppercase text-color-main font-bold text-[1.5rem]`}
                                    >
                                          {placeholder}
                                    </label>
                              )}
                              <input
                                    value={watch(FieldKey)}
                                    id={`${FieldKey}-${id}`}
                                    {...register(FieldKey, {
                                          onBlur: (event) => {
                                                setFocus(false);
                                          },
                                    })}
                                    onFocus={() => setFocus(true)}
                                    className={`${
                                          focus ? "field-input-focus" : ""
                                    } inline-block  input-form w-full  pr-[1.2rem] text-[1.4rem]  opacity-100 text-text-theme  font-semibold outline-transparent bg-transparent  placeholder:opacity-100 `}
                                    placeholder={`Nhập ${placeholder} của bạn`}
                              />
                        </div>
                  </div>

                  {error && error[FieldKey]?.message && <InputError message={input_erros as string} />}
                  {/* {watch(FieldKey) && <p>{watch(FieldKey)}</p>} */}
            </div>
      );
};

export default Input;
