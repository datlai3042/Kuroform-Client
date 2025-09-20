/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useContext, useEffect } from "react";

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
import SpaceLine from "./SpaceLine";
import { ThemeContext } from "../provider/ThemeProvider";
import { TUserRecent } from "@/app/_schema/user/user.type";
import { checkValueHref } from "@/app/_lib/utils";
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
            <div
                  style={{
                        backgroundColor: theme === "dark" ? "rgb(27 26 26)" : "#fff",

                        boxShadow: "0 2px 4px #0000001a,0 8px 16px #0000001a",
                  }}
                  className="relative w-full h-max flex justify-start xl:justify-center items-center flex-col  gap-[2.8rem] rounded-[1.2rem] p-[2rem_2rem] "
            >
                  {/* <div className="w-full flex flex-col items-center  ">
                        <p className="text-[#3d52a2] font-semibold text-[2.8rem]">Tạo tài khoản 👋</p>
                        <span className="text-[#858d8f] text-[1.2rem]">Kuroform - Tạo tài khoản để tiếp tục dịch vụ</span>
                  </div> */}

                  <div className=" w-full flex flex-col gap-[1.8rem] ">
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
                                    className="!w-full !h-[4rem] !bg-[var(--color-main)]"
                              />
                        </form>
                        {/* <SpaceLine content="Hoặc đăng nhập luôn bằng phương thức khác" /> */}

                        <div className="w-full flex  gap-[1rem]">
                              <div className="w-[48%] h-[4.6rem]">
                                    <ButtonLoginGoogle />
                              </div>

                              <div className="w-[48%] h-[4.6rem]">
                                    <ButtonLoginGithub />
                              </div>
                        </div>
                        <div className="w-full flex flex-col items-center gap-[.2rem] text-[1.4rem]">
                              <p className="text-[1.4rem]">
                                    Bạn đã có tài khoản?{" "}
                                    <Link href={"/login"} className="text-[var(--color-main)] underline font-semibold">
                                          đăng nhập
                                    </Link>
                              </p>
                        </div>
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
