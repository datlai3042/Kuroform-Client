/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterType, registerSchema } from "@/app/_schema/auth/register.schema";
import { ResponseApi, ResponseAuth } from "@/app/_schema/api/response.shema";

import Button from "../ui/button/Button";

import { useMutation } from "@tanstack/react-query";

import IconClose from "../ui/input/IconClose";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Input from "../ui/input/Input";
import { onFetchUser } from "@/app/_lib/redux/authentication.slice";
import { useRouter } from "next/navigation";
import AuthService from "@/app/_services/auth.service";
import ButtonLoginGoogle from "../ui/button/ButtonLoginGoogle";
import ButtonLoginGithub from "../ui/button/ButtonLoginGithub";
type TProps = {
      onClose?: (state: boolean) => void;
};

const RegisterForm = (props: TProps) => {
      const { onClose } = props;
      const router = useRouter();

      const dispatch = useDispatch();

      const registerForm = useForm<RegisterType>({
            defaultValues: {
                  user_email: "",
                  user_password: "",
                  user_first_name: "",
                  user_last_name: "",
                  confirm_password: "",
            },
            resolver: zodResolver(registerSchema),
      });

      const registerMutation = useMutation({
            mutationKey: ["register"],
            // mutationFn: (formRegister: Omit<RegisterType, "confirm_password">) =>
            mutationFn: (formRegister: Omit<RegisterType, "confirm_password">) =>
                  AuthService.register<Omit<RegisterType, "confirm_password">, ResponseApi<ResponseAuth>>(formRegister),
      });

      useEffect(() => {
            if (registerMutation.isSuccess) {
                  const { user } = registerMutation.data.metadata;
                  router.push("/dashboard");
                  dispatch(onFetchUser({ user }));
            }
      }, [registerMutation.isSuccess, onClose, registerMutation.data, dispatch, router]);

      const onSubmit = (data: RegisterType) => {
            registerMutation.mutate(data);
      };

      return (
            <div className="relative w-full mb-[1.6rem] h-max flex justify-start xl:justify-center items-center flex-col  gap-[1.6rem] rounded-[1.2rem] p-[.4rem_2rem] ">
                  <div className="w-full flex flex-col gap-[.2rem] ">
                        <p className="text-[2.4rem] xl:text-[2.8rem] font-semibold ">Tạo tài khoản</p>
                        <p className="text-[1.6rem] xl:text-[1.8rem] ">Đăng kí tài khoản để tạo cho bạn.</p>
                  </div>
                  <div className="w-full flex flex-col gap-[.2rem] text-[1.4rem] my-[1.5rem]">
                        <p className="text-[#6262e5] font-medium text-[1.6rem]">Đăng nhập tài khoản của bạn</p>
                        <p className="text-[1.4rem]">
                              Bạn đã có tài khoản?{" "}
                              <Link href={"/login"} className="text-[#6262e5] underline">
                                    đăng nhập
                              </Link>
                        </p>
                  </div>
                  <div className=" w-full flex flex-col gap-[3rem] ">
                        <div className="w-full flex flex-col gap-[1rem]">
                              <div className="w-full h-[4.6rem]">
                                    <ButtonLoginGoogle />
                              </div>

                              <div className="w-full h-[4.6rem]">
                                    <ButtonLoginGithub />
                              </div>
                        </div>
                        <form className="w-full flex flex-col justify-center  gap-[.6rem] rounded-[1.2rem] " onSubmit={registerForm.handleSubmit(onSubmit)}>
                              <Input<RegisterType>
                                    FieldKey="user_first_name"
                                    placeholder="Nhập họ của bạn"
                                    type="text"
                                    register={registerForm.register}
                                    watch={registerForm.watch}
                                    error={registerForm.formState.errors}
                              />

                              <Input<RegisterType>
                                    FieldKey="user_last_name"
                                    placeholder="Nhập tên của bạn"
                                    type="text"
                                    register={registerForm.register}
                                    watch={registerForm.watch}
                                    error={registerForm.formState.errors}
                              />
                              <Input<RegisterType>
                                    FieldKey="user_email"
                                    placeholder="email"
                                    type="email"
                                    register={registerForm.register}
                                    watch={registerForm.watch}
                                    error={registerForm.formState.errors}
                              />
                              <Input<RegisterType>
                                    FieldKey="user_password"
                                    placeholder="mật khẩu"
                                    type="password"
                                    register={registerForm.register}
                                    watch={registerForm.watch}
                                    error={registerForm.formState.errors}

                                    // formState={registerForm.formState}
                              />
                              <Input<RegisterType>
                                    FieldKey="confirm_password"
                                    placeholder="xác nhận mật khẩu"
                                    type="password"
                                    register={registerForm.register}
                                    watch={registerForm.watch}
                                    error={registerForm.formState.errors}
                              />
                              <Button
                                    type="submit"
                                    textContent="Đăng kí"
                                    disabled={registerMutation.isPending}
                                    loading={registerMutation.isPending}
                                    className="!w-full !h-[4rem] !bg-blue-600 "
                              />
                        </form>
                  </div>

                  {onClose && (
                        <div className="absolute  top-[-20px] right-[-10px] xl:right-[-20px]">
                              <IconClose onClose={onClose} />
                        </div>
                  )}
            </div>
      );
};

export default RegisterForm;
