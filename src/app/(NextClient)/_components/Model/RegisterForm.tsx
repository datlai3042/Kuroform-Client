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
import { RegisterType, registerSchema } from "@/app/_schema/auth/register.schema";
import { useMutation } from "@tanstack/react-query";
import Http from "@/app/_lib/http";

type TProps = {
	onClose?: (state: boolean) => void;
};

const RegisterForm = (props: TProps) => {
	const { onClose } = props;
	const registerForm = useForm<RegisterType>({
		defaultValues: {
			email: "",
			password: "",
			confirm_password: "",
		},
		resolver: zodResolver(registerSchema),
	});

	const registerMutation = useMutation({
		mutationKey: ["register"],
		mutationFn: (formRegister: Omit<LoginType, "confirm_password">) =>
			Http.post<any>("/v1/api/auth/register", formRegister, {}),
	});

	const onSubmit = (data: LoginType) => {
		registerMutation.mutate(data);
	};

	return (
		<WrapperAuthLayout zIndex={300}>
			<div className="relative group w-full h-[400px] xl:w-[1200px] xl:h-[600px] bg-[#ffffff] flex items-center justify-center rounded-[6px] py-[40px]  ">
				{/* <div className="absolute w-[500px] h-[600px] z-[3] bg-[#ffffff] blur-[20px] "></div> */}
				<div
					className="relative h-full w-[50%] m-[20px] bg-[#ffffff]"
					style={{
						backgroundImage: "url('/assets/img/backgroundForm/bg.jpg')",
						backgroundPosition: "center",
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundColor: "black",
					}}
				>
					<div className="animate-opacityUp w-full h-full bg-[#000000]"></div>
					<h3 className="animate-topUp  absolute top-[100px] left-[50%] w-max translate-x-[-50%] font-extrabold text-[#ffffff] text-[28px] [letter-spacing:8px]">
						Project Tally Form
					</h3>
				</div>

				<form
					className="relative w-[40%] h-[600px] p-[24px_20px] flex flex-col items-center justify-center gap-[16px] rounded-[12px]"
					onSubmit={registerForm.handleSubmit(onSubmit)}
				>
					<p className="text-center mr-[20px] text-slate-600 text-[24px] [letter-spacing:4px]">Đăng Kí</p>
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

					<Button type="submit" textContent="Đăng kí" className="!bg-slate-800" />
				</form>
				{onClose && (
					<div className="absolute top-[-20px] right-[-10px] xl:right-[-20px] z-[3]">
						<IconClose onClose={onClose} />
					</div>
				)}
			</div>
		</WrapperAuthLayout>
	);
};

export default RegisterForm;
