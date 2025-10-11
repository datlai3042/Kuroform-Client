/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useContext, useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import Link from "next/link";
import { onFetchUser } from "@/app/_lib/redux/authentication.slice";

import { checkValueHref } from "@/app/_lib/utils";
;
import { LockKeyhole, MailCheck } from "lucide-react";
import { ThemeContext } from "../provider/ThemeProvider";
import { loginSchema, LoginType } from "@/app/_schema/auth/login.schema";
import AuthService from "@/app/_services/auth.service";
import { ResponseApi, ResponseAuth } from "@/app/_schema/api/response.shema";
import { TUserRecent } from "@/app/_schema/user/user.type";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import ButtonLoginGoogle from "../ui/button/ButtonLoginGoogle";
import ButtonLoginGithub from "../ui/button/ButtonLoginGithub";
import IconClose from "../ui/input/IconClose";

type TProps = {
  onClose?: (state: boolean) => void;
};

const LoginForm = (props: TProps) => {
  const { onClose } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  const loginForm = useForm<LoginType>({
    defaultValues: {
      user_email: "",
      user_password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (formLogin: LoginType) =>
      AuthService.login<LoginType, ResponseApi<ResponseAuth>>(formLogin),
    onSuccess: (response) => {},
  });

  const onSubmit = (data: LoginType) => {
    loginMutation.mutate(data);
  };

  useEffect(() => {
    if (loginMutation.isSuccess) {
      const { user } = loginMutation?.data.metadata;

      const loginUserRecents = localStorage.getItem("userRecents");
      if (loginUserRecents) {
        const parseJSON = JSON.parse(loginUserRecents);
        const data = (
          Array.isArray(parseJSON) ? parseJSON : []
        ) as TUserRecent[];
        if (
          data?.filter((userRecent) => userRecent?._id === user?._id).length ===
          0
        ) {
          data.push({
            _id: user?._id,

            avatar: checkValueHref(user?.user_avatar_current)
              ? user?.user_avatar_current
              : user?.user_avatar_system,
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
            avatar: checkValueHref(user?.user_avatar_current)
              ? user?.user_avatar_current
              : user?.user_avatar_system,
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
  }, [loginMutation.isSuccess, onClose, loginMutation.data, dispatch, router]);

  useEffect(() => {
    if (Object.keys(loginForm.formState.errors).length > 0) {
    }
  }, [loginForm.formState.errors]);

  return (
    <div
      style={{}}
      className="relative   min-h-[40rem] w-full  mx-auto    flex justify-center items-center flex-col  gap-[4.4rem] rounded-[1.2rem] p-[2rem_2rem]"
    >
      <div className=" w-full flex flex-col gap-[.8rem]  ">
        <span className="text-[4.2rem]  text-[#1e2934]">Welcome Back :)</span>
        <span className="text-[#a4a5b9] font-semibold  text-[1.4rem]">
          Đăng nhập để trải nghiệm các tính năng tạo biểu mẫu đa dạng
        </span>
      </div>

      <div className=" w-full flex flex-col gap-[1.6rem] ">
        <form
          className="w-full h-full flex flex-col justify-center  gap-[1.8rem] rounded-[1.2rem]"
          onSubmit={loginForm.handleSubmit(onSubmit)}
        >
          <Input<LoginType>
            FieldKey="user_email"
            placeholder="Email"
            type="email"
            register={loginForm.register}
            error={loginForm.formState.errors}
            watch={loginForm.watch}
            icon={<MailCheck />}
          />
          <Input<LoginType>
            FieldKey="user_password"
            placeholder="Mật khẩu"
            type="password"
            register={loginForm.register}
            error={loginForm.formState.errors}
            watch={loginForm.watch}
            icon={<LockKeyhole />}

          />
          <div className="mt-[1.2rem] flex flex-col gap-[1.3rem]">
            <div className=" flex gap-[1rem]">
              <Button
                disabled={loginMutation.isPending}
                loading={loginMutation.isPending}
                type="submit"
                textContent="Đăng nhập"
                className="!min-w-[15rem] font-semibold text-[1.5rem] !h-[4.6rem] !bg-[var(--color-main)] !rounded-[999px]"
              />
              <Button
                textContent={
                  <Link href={"/register"} className=" text-[1.5rem]    w-full">
                    <span>Tạo tài khoản</span>
                  </Link>
                }
                className="!bg-background-page-color hover:!bg-[#36a420] border-[.1rem] !text-[#333] hover:!text-[#fff] hover:border-border-page-color font-semibold text-[1.5rem] !h-[4.6rem]  !rounded-[999px] !w-[15rem] "
              ></Button>
            </div>
            <div className="flex flex-col gap-[1rem]">
              <span className="mt-[1rem] text-[1.4rem] font-bold text-[#95a5b4]">
                Hoặc các phương thức khác
              </span>
              <div className="w-full flex  gap-[1.4rem]">
                <div className="">
                  <ButtonLoginGoogle />
                </div>

                <div className="">
                  <ButtonLoginGithub />
                </div>
              </div>
            </div>
          </div>
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
