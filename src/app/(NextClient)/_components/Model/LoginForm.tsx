/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginType, loginSchema } from "@/app/_schema/auth/login.schema";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { ResponseApi, ResponseAuth } from "@/app/_schema/api/response.shema";

import IconClose from "../ui/input/IconClose";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import Link from "next/link";
import { onFetchUser } from "@/app/_lib/redux/authentication.slice";
import AuthService from "@/app/_services/auth.service";
import ButtonLoginGoogle from "../ui/button/ButtonLoginGoogle";
import ButtonLoginGithub from "../ui/button/ButtonLoginGithub";
import SpaceLine from "./SpaceLine";

type TProps = {
      onClose?: (state: boolean) => void;
};

const LoginForm = (props: TProps) => {
      const { onClose } = props;
      const dispatch = useDispatch();
      const router = useRouter();

      const loginForm = useForm<LoginType>({
            defaultValues: {
                  user_email: "",
                  user_password: "",
            },
            resolver: zodResolver(loginSchema),
      });

      const loginMutation = useMutation({
            mutationKey: ["login"],
            mutationFn: (formLogin: LoginType) => AuthService.login<LoginType, ResponseApi<ResponseAuth>>(formLogin),
            onSuccess: (response) => {},
      });

      const onSubmit = (data: LoginType) => {
            loginMutation.mutate(data);
      };

      useEffect(() => {
            if (loginMutation.isSuccess) {
                  const { user } = loginMutation?.data.metadata;
                  router.push("/dashboard");
                  dispatch(onFetchUser({ user }));
            }
      }, [loginMutation.isSuccess, onClose, loginMutation.data, dispatch, router]);

      useEffect(() => {
            if (Object.keys(loginForm.formState.errors).length > 0) {
            }
      }, [loginForm.formState.errors]);

      return (
            <div className="relative   min-h-[40rem] w-full h-max mx-auto  flex justify-center items-center flex-col  gap-[1.6rem] rounded-[1.2rem] p-[.4rem_2rem]">
                  <p style={{letterSpacing: '.4rem'}} className=" w-full flex ">
                        <span className="text-text-theme text-[4.2rem]">Kuro</span>
                        <span className="text-[#6262e5] text-[4.2rem]">form</span>
                  </p>
                  <div className="w-full flex flex-col gap-[.2rem] text-[1.4rem] my-[1.5rem]" >
                        <p className="text-[#6262e5] font-medium text-[1.6rem]">Đăng nhập tài khoản của bạn</p>
                        <p className="text-[1.4rem]">
                              Bạn chưa có tài khoản?{" "}
                              <Link href={"/register"} className="text-[#6262e5] underline">
                                    đăng kí nhé
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

                        <SpaceLine content="Hoặc bằng email và mật khẩu"/>
                        <form className="w-full h-full flex flex-col justify-center  gap-[.6rem] rounded-[1.2rem]" onSubmit={loginForm.handleSubmit(onSubmit)}>
                              <Input<LoginType>
                                    FieldKey="user_email"
                                    placeholder="Email"
                                    type="email"
                                    register={loginForm.register}
                                    error={loginForm.formState.errors}
                                    watch={loginForm.watch}
                              />
                              <Input<LoginType>
                                    FieldKey="user_password"
                                    placeholder="Mật khẩu"
                                    type="password"
                                    register={loginForm.register}
                                    error={loginForm.formState.errors}
                                    watch={loginForm.watch}
                              />
                              <Button
                                    disabled={loginMutation.isPending}
                                    loading={loginMutation.isPending}
                                    type="submit"
                                    textContent="Đăng nhập"
                                    className="!w-full !h-[4rem] !bg-blue-600 mt-[.8rem]"
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

export default LoginForm;
