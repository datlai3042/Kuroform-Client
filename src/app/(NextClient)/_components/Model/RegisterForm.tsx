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
      AuthService.register<
        Omit<RegisterType, "confirm_password">,
        ResponseApi<ResponseAuth>
      >(formRegister),
  });

  useEffect(() => {
    if (registerMutation.isSuccess) {
      const { user } = registerMutation.data.metadata;

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
  }, [
    registerMutation.isSuccess,
    onClose,
    registerMutation.data,
    dispatch,
    router,
  ]);

  const onSubmit = (data: RegisterType) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="relative w-full flex h-full justify-center items-center flex-col  gap-[2rem] rounded-[1.2rem] p-[2rem_2rem] ">
      <div className=" w-full flex flex-col gap-[.8rem]  ">
        <span className="text-[4.2rem]  text-[#1e2934]">@Hi, Welcome...</span>
        <span className="text-[#a4a5b9] font-semibold  text-[1.4rem]">
          Đăng kí để trải nghiệm các tính năng tạo biểu mẫu đa dạng
        </span>
      </div>

      <div className=" w-full flex flex-col gap-[1.8rem] ">
        <form
          className="w-full flex flex-col justify-center  gap-[1.8rem] rounded-[1.2rem] "
          onSubmit={registerForm.handleSubmit(onSubmit)}
        >
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
          <div className=" mt-[.8rem] flex flex-col gap-[1.3rem]">
            <div className=" flex gap-[1rem]">
              <Button
                type="submit"
                textContent="Đăng kí"
                disabled={registerMutation.isPending}
                loading={registerMutation.isPending}
                className="!w-[15rem] font-semibold text-[1.5rem] !h-[4.6rem] !bg-[var(--color-main)] !rounded-[999px]"
              />

              <Button
                textContent={
                  <Link href={"/login"} className=" text-[1.5rem]    w-full">
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
