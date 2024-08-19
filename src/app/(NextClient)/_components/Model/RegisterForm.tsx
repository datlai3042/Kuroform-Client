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
                  email: "",
                  password: "",
                  first_name: "",
                  last_name: "",
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
            <div className="relative w-full xl:min-w-[50rem] max-w-[50rem] mx-auto min-h-[80rem]  h-max flex justify-start xl:justify-center items-center flex-col  gap-[2rem] rounded-[1.2rem] p-[2.4rem_2rem] mb-[4rem]">
                  <div className="mb-[2rem] flex items-center flex-col gap-[.2rem] ">
                        <p className="text-[2.4rem] xl:text-[3.8rem] font-semibold text-center">Tạo tài khoản</p>
                        <p className="text-[1.6rem] xl:text-[1.8rem]  text-center">Đăng kí tài khoản để tạo cho bạn.</p>
                  </div>

                  <div className="w-full flex gap-[1rem] my-[2rem]">
                        <div className="w-[50%]">
                              <ButtonLoginGoogle />
                        </div>

                        <div className="w-[50%]">
                              <ButtonLoginGithub />
                        </div>
                  </div>
                  <form className="w-full flex flex-col justify-center  gap-[2rem] rounded-[1.2rem] " onSubmit={registerForm.handleSubmit(onSubmit)}>
                        <Input<RegisterType>
                              FieldKey="first_name"
                              placeholder="Nhập họ của bạn"
                              type="text"
                              register={registerForm.register}
                              watch={registerForm.watch}
                              error={registerForm.formState.errors}
                        />

                        <Input<RegisterType>
                              FieldKey="last_name"
                              placeholder="Nhập tên của bạn"
                              type="text"
                              register={registerForm.register}
                              watch={registerForm.watch}
                              error={registerForm.formState.errors}
                        />
                        <Input<RegisterType>
                              FieldKey="email"
                              placeholder="email"
                              type="email"
                              register={registerForm.register}
                              watch={registerForm.watch}
                              error={registerForm.formState.errors}
                        />
                        <Input<RegisterType>
                              FieldKey="password"
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

                  <p className="text-[1.4rem]">
                        Bạn có đã có tài khoản?{" "}
                        <Link href={"/login"} className="text-blue-400 underline">
                              Đăng nhập
                        </Link>
                  </p>

                  {onClose && (
                        <div className="absolute  top-[-20px] right-[-10px] xl:right-[-20px]">
                              <IconClose onClose={onClose} />
                        </div>
                  )}
            </div>
      );
};

export default RegisterForm;
