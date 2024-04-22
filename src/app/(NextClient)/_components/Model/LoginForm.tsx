/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect } from "react";

import WrapperAuthLayout from "../Layout/WrapperAuthLayout";
import IconClose from "../ui/input/IconClose";
import { Controller, useForm } from "react-hook-form";
import { LoginType, loginSchema } from "@/app/_schema/auth/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import { useMutation } from "@tanstack/react-query";
import Http, { clientToken } from "@/app/_lib/http";
import { useDispatch } from "react-redux";
import { onLoginUser } from "@/app/_lib/redux/features/authentication.slice";
import { ResponseApi, ResponseAuth } from "@/app/_schema/api/response.shema";
import { useRouter } from "next/navigation";
import Link from "next/link";

type TProps = {
	onClose?: (state: boolean) => void;
};

const LoginForm = (props: TProps) => {
	const { onClose } = props;
	const dispatch = useDispatch();
	const router = useRouter();

	const loginForm = useForm<LoginType>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(loginSchema),
	});

	const loginMutation = useMutation({
		mutationKey: ["login"],
		mutationFn: (formLogin: LoginType) => Http.post<ResponseApi<ResponseAuth>>("/v1/api/auth/login", formLogin, {}),
		onSuccess: (response) => {
			const {
				user,
				token: { access_token, refresh_token },
			} = response.metadata;
			dispatch(onLoginUser({ user }));
			const setTokenResponse = Http.post<{ access_token: string; refresh_token: string; _id: string }>(
				"/v1/api/auth/set-token",
				{
					access_token,
					refresh_token,
					_id: user._id,
				},
				{ baseUrl: "" }
			).then((response) => {
				if (onClose) {
					onClose(false);
				}
			});
		},
	});

	const onSubmit = (data: LoginType) => {
		loginMutation.mutate(data);
	};

	useEffect(() => {
		if (loginMutation.isSuccess) {
			if (onClose) {
				onClose(false);
			}
		}
	}, [loginMutation.isSuccess, onClose]);

	console.log({ errors: loginForm.formState.errors });

	return (
		<WrapperAuthLayout zIndex={300}>
			<div className="relative  h-[40rem] w-[40rem] xl:h-[40rem] bg-[#ffffff] flex justify-center items-center flex-col  gap-[2rem] rounded-[1.2rem] p-[2.4rem_2rem]">
				<p className="mb-[4rem] text-[3rem] font-semibold">Welcome back</p>
				<form
					className="w-full h-full flex flex-col justify-center  gap-[1.8rem] rounded-[1.2rem]"
					onSubmit={loginForm.handleSubmit(onSubmit)}
				>
					<Input<LoginType>
						FieldKey="email"
						placeholder="Email"
						type="email"
						register={loginForm.register}
						error={loginForm.formState.errors}
						watch={loginForm.watch}
					/>
					<Input<LoginType>
						FieldKey="password"
						placeholder="Mật khẩu"
						type="password"
						register={loginForm.register}
						error={loginForm.formState.errors}
						watch={loginForm.watch}
					/>
					<Button type="submit" textContent="Đăng nhập" className="!w-full !h-[4rem] !bg-blue-600 " />
				</form>

				<p className="text-[1.4rem]">
					Don't have an account yet?{" "}
					<Link href={"/register"} className="text-blue-400 underline">
						Sign up
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

export default LoginForm;
