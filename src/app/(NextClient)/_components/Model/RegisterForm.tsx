/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useContext, useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";

import { useDispatch } from "react-redux";
import Link from "next/link";
import { onFetchUser } from "@/app/_lib/redux/authentication.slice";
import { useRouter } from "next/navigation";
import { checkValueHref } from "@/app/_lib/utils";
import { LockKeyhole, MailCheck } from "lucide-react";
import { ThemeContext } from "../provider/ThemeProvider";
import { registerSchema, RegisterType } from "@/app/_schema/auth/register.schema";
import AuthService from "@/app/_services/auth.service";
import { ResponseApi, ResponseAuth } from "@/app/_schema/api/response.shema";
import { TUserRecent } from "@/app/_schema/user/user.type";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import ButtonLoginGoogle from "../ui/button/ButtonLoginGoogle";
import ButtonLoginGithub from "../ui/button/ButtonLoginGithub";
import IconClose from "../ui/input/IconClose";
import SpaceLine from "./SpaceLine";
type TProps = {
      onClose?: (state: boolean) => void;
};

const RegisterForm = (props: TProps) => {
      const { onClose } = props;
      const router = useRouter();
      const { theme } = useContext(ThemeContext);

      const dispatch = useDispatch();

      const registerForm = useForm<RegisterType>({
            defaultValues: {
                  user_email: "",
                  user_password: "",
                  // user_first_name: "",
                  // user_last_name: "",
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

                  const loginUserRecents = localStorage.getItem("userRecents");
                  if (loginUserRecents) {
                        const parseJSON = JSON.parse(loginUserRecents);
                        const data = (Array.isArray(parseJSON) ? parseJSON : []) as TUserRecent[];
                        if (data?.filter((userRecent) => userRecent?._id === user?._id).length === 0) {
                              data.push({
                                    _id: user?._id,

                                    avatar: checkValueHref(user?.user_avatar_current) ? user?.user_avatar_current : user?.user_avatar_system,
                                    name: user?.user_last_name || user?.user_email?.split("@")[0],
                                    user_first_name: user?.user_first_name,
                                    user_last_name: user?.user_last_name,
                                    email: user?.user_email,
                              });
                        }

                        localStorage.setItem("userRecents", JSON.stringify(data));
                  } else {
                        const data = [
                              {
                                    _id: user?._id,
                                    avatar: checkValueHref(user?.user_avatar_current) ? user?.user_avatar_current : user?.user_avatar_system,
                                    email: user?.user_email,

                                    name: user?.user_last_name || user?.user_email?.split("@")[0],
                                    user_first_name: user?.user_first_name,
                                    user_last_name: user?.user_last_name,
                              },
                        ];
                        localStorage.setItem("userRecents", JSON.stringify(data));
                  }
                  router.push("/dashboard");
                  dispatch(onFetchUser({ user }));
            }
      }, [registerMutation.isSuccess, onClose, registerMutation.data, dispatch, router]);

      const onSubmit = (data: RegisterType) => {
            registerMutation.mutate(data);
      };

      return (
            <div className="relative w-full flex h-full  items-center flex-col  gap-[4rem] rounded-[1.2rem]  ">
                  <div className=" w-full flex flex-col gap-[.5rem] text-center ">
                        <span className="text-[2rem]   gradient-app-name font-bold">Xin chào bạn 👋</span>
                        <span className="text-[#333] opacity-80 font-semibold  text-[1.3rem]">Hãy tạo tài khoản để bắt đầu cùng Kuroform nhé!</span>
                  </div>

                  <div className=" w-full flex flex-col gap-[2rem] ">
                        <form className="w-full flex flex-col justify-center  gap-[1.6rem] rounded-[1.2rem] " onSubmit={registerForm.handleSubmit(onSubmit)}>
                              {/* <Input<RegisterType>
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
                              /> */}
                              <Input<RegisterType>
                                    FieldKey="user_email"
                                    placeholder="email"
                                    type="email"
                                    register={registerForm.register}
                                    watch={registerForm.watch}
                                    error={registerForm.formState.errors}
                                    icon={<MailCheck />}
                              />
                              <Input<RegisterType>
                                    FieldKey="user_password"
                                    placeholder="mật khẩu"
                                    type="password"
                                    register={registerForm.register}
                                    watch={registerForm.watch}
                                    error={registerForm.formState.errors}
                                    icon={<LockKeyhole />}

                                    // formState={registerForm.formState}
                              />
                              <Input<RegisterType>
                                    FieldKey="confirm_password"
                                    placeholder="xác nhận mật khẩu"
                                    type="password"
                                    register={registerForm.register}
                                    watch={registerForm.watch}
                                    error={registerForm.formState.errors}
                                    icon={<LockKeyhole />}
                              />
                              <div className="mt-[.8rem] flex flex-col gap-[2.4rem]">
                                    <div className=" flex gap-[1rem]">
                                          <Button
                                                type="submit"
                                                textContent="Đăng kí"
                                                disabled={registerMutation.isPending}
                                                loading={registerMutation.isPending}
                                                className="!min-w-[15rem] !w-full font-semibold text-[1.5rem] !h-[4rem] !bg-[var(--color-main)] !rounded-[.4rem]"
                                          />
                                    </div>
                                    <div className="flex flex-col gap-[1.6rem]">
                                          <SpaceLine content="Hoặc các phương thức khác" />

                                          <div className="w-full flex  gap-[.4rem]">
                                                <div className="flex-1">
                                                      <ButtonLoginGoogle />
                                                </div>

                                                <div className="flex-1">
                                                      <ButtonLoginGithub />
                                                </div>
                                          </div>
                                    </div>
                                    <div className="border-t-[.1rem] pt-[1rem] border-t-border-page-color">
                                          <Link href={"/login"} className=" text-[1.5rem] flex gap-[.6rem] justify-center text-center   w-full">
                                                <span className="text-[#333]">Bạn là người cũ?.</span>
                                                <span className="hover:text-color-main font-medium">Đăng nhập</span>
                                          </Link>
                                    </div>
                              </div>
                        </form>
                        {/* <SpaceLine content="Hoặc đăng nhập luôn bằng phương thức khác" /> */}
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
