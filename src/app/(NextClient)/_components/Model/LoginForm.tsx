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
import SpaceLine from "./SpaceLine";

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
      className="relative    w-full  mx-auto    flex  items-center flex-col  gap-[3.6rem] rounded-[1.2rem] "
    >
      <div className=" w-full flex flex-col gap-[.5rem] text-center ">
        <span className="text-[2rem]  text-[#1e2934] gradient-app-name font-bold">
          Chào mừng trở lại 👋
        </span>
        <span className="text-[#333] opacity-80 font-semibold  text-[1.3rem]">
          Đăng nhập để trải nghiệm các tính năng tạo biểu mẫu đa dạng
        </span>
      </div>

      <div className=" w-full flex flex-col gap-[2rem] ">
        <form
          className="w-full h-full flex flex-col justify-center  gap-[1.4rem] rounded-[1.2rem]"
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
          <div className="mt-[.8rem] flex flex-col gap-[2.4rem]">
            <div className="w-full flex gap-[1rem]">
              <Button
                disabled={loginMutation.isPending}
                loading={loginMutation.isPending}
                type="submit"
                textContent="Đăng nhập"
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
              <Link
                href={"/register"}
                className=" text-[1.5rem] flex gap-[.6rem] justify-center text-center   w-full"
              >
                <span className="text-[#333]">Bạn là người mới?.</span>
                <span className="hover:text-[#36a420] font-medium">Tạo tài khoản</span>
              </Link>
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
