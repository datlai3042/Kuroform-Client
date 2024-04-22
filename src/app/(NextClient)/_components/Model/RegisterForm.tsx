/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import WrapperAuthLayout from "../Layout/WrapperAuthLayout";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UserType } from "@/app/_schema/user/user.schema";
import { RegisterType, registerSchema } from "@/app/_schema/auth/register.schema";
import { LoginType } from "@/app/_schema/auth/login.schema";
import { ResponseApi, ResponseAuth } from "@/app/_schema/api/response.shema";

import Button from "../ui/button/Button";

import Http, { clientToken } from "@/app/_lib/http";
import { useMutation } from "@tanstack/react-query";

import IconClose from "../ui/input/IconClose";
import { useDispatch } from "react-redux";
import { onLoginUser } from "@/app/_lib/redux/features/authentication.slice";
import { PlaneTakeoff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Input from "../ui/input/Input";
type TProps = {
	onClose?: (state: boolean) => void;
};

const RegisterForm = (props: TProps) => {
	const { onClose } = props;
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
		mutationFn: (formRegister: Omit<RegisterType, "confirm_password">) =>
			Http.post<ResponseApi<{ user: UserType; token: { access_token: string; refresh_token: string } }>>(
				"/v1/api/auth/register",
				formRegister,
				{}
			),
		onSuccess: async (response) => {
			const {
				user,
				token: { access_token, refresh_token },
			} = response.metadata;
			dispatch(onLoginUser({ user }));
			const setTokenResponse = await Http.post<ResponseApi<ResponseAuth>>(
				"/v1/api/auth/set-token",
				{
					access_token,
					refresh_token,
					_id: user._id,
				},
				{ baseUrl: "" }
			);

			if (setTokenResponse) {
				const { access_token, refresh_token } = setTokenResponse.metadata.token;
				const { _id } = setTokenResponse.metadata.user;
				clientToken.accessToken = access_token;
				clientToken.refreshToken = refresh_token;
				clientToken.id = _id;
			}

			if (onClose) {
				onClose(true);
			}
		},
	});

	const onSubmit = (data: RegisterType) => {
		registerMutation.mutate(data);
	};

	return (
		<WrapperAuthLayout zIndex={300}>
			<div className="relative   w-[70rem] h-[80rem]  bg-[#ffffff] flex justify-start xl:justify-center items-center flex-col  gap-[2rem] rounded-[1.2rem] p-[2.4rem_2rem]">
				<div className="mb-[4rem] flex items-center flex-col gap-[.2rem] ">
					<p className="text-[2.4rem] xl:text-[3.8rem] font-semibold text-center">
						Create your Tally account
					</p>
					<p className="text-[1.6rem] xl:text-[1.8rem] text-slate-400 text-center">
						Don’t lose access to your forms by creating a Tally account.
					</p>
				</div>
				<form
					className="w-[85%] sm:w-[55%] flex flex-col justify-center  gap-[1.8rem] rounded-[1.2rem] "
					onSubmit={registerForm.handleSubmit(onSubmit)}
				>
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
					<Button type="submit" textContent="Đăng nhập" className="!w-full !h-[4rem] !bg-blue-600 " />
				</form>

				<p className="text-[1.4rem]">
					Do have an account yet?{" "}
					<Link href={"/login"} className="text-blue-400 underline">
						Login
					</Link>
				</p>

				{onClose && (
					<div className="absolute  top-[-20px] right-[-10px] xl:right-[-20px]">
						<IconClose onClose={onClose} />
					</div>
				)}
			</div>
		</WrapperAuthLayout>
	);
};

export default RegisterForm;
