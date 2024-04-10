"use client";
import React from "react";

import WrapperAuthLayout from "../Layout/WrapperAuthLayout";
import IconClose from "../IconClose";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { LoginType, loginSchema } from "@/app/_schema/auth/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/input/Input";
import Button from "../Button";
import { log } from "console";

type TProps = {
	onClose?: (state: boolean) => void;
};

const LoginForm = (props: TProps) => {
	const { onClose } = props;
	const loginForm = useForm<LoginType>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data: LoginType) => {
		console.log({ data });
	};

	console.log({ errors: loginForm.formState.errors });

	return (
		<WrapperAuthLayout zIndex={300}>
			<div className="relative w-full h-[400px] xl:w-[800px] xl:h-[400px] bg-[#ffffff] flex rounded-[12px] p-[24px_20px]">
				<form
					className="w-full h-full flex flex-col justify-center  gap-[16px] rounded-[12px]"
					onSubmit={loginForm.handleSubmit(onSubmit)}
				>
					<p className="text-center mr-[20px]">Đăng nhập</p>
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
					{/* <Input register={loginForm.register} key="password" /> */}
					<Button type="submit" textContent="Đăng nhập" />
				</form>
				<Image
					src={"/assets/img/backgroundForm/bg.jpg"}
					width={400}
					height={400}
					alt="sub-image"
					fill={false}
					style={{ objectFit: "fill" }}
				/>
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
