"use client";
import React from "react";

import WrapperAuthLayout from "../Layout/WrapperAuthLayout";
import IconClose from "../IconClose";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { LoginType, loginSchema } from "@/app/_schema/auth/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input";
import Button from "../Button";
import { RegisterType, registerSchema } from "@/app/_schema/auth/register.schema";

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

	const onSubmit = (data: LoginType) => {
		console.log({ data });
	};

	return (
		<WrapperAuthLayout zIndex={300}>
			<div className="relative group w-full h-[400px] xl:w-[500px] xl:h-[600px] bg-violet-100 flex items-center justify-center rounded-[12px] py-[20px]  ">
				<div className="absolute w-[500px] h-[600px] z-[3] bg-[#ffffff] blur-[20px] "></div>
				<form
					className="w-[500px] h-[600px] p-[24px_20px] flex flex-col items-center justify-center gap-[16px] rounded-[12px] absolute z-[4]"
					onSubmit={registerForm.handleSubmit(onSubmit)}
				>
					<p className="text-center mr-[20px] text-violet-600 text-[24px] [letter-spacing:4px]">Đăng Kí</p>
					<Input<RegisterType>
						register={registerForm.register}
						FieldKey="email"
						watch={registerForm.watch}
						error={registerForm.formState.errors}
					/>
					<Input<RegisterType>
						register={registerForm.register}
						FieldKey="password"
						watch={registerForm.watch}
						error={registerForm.formState.errors}

						// formState={registerForm.formState}
					/>
					<Input<RegisterType>
						register={registerForm.register}
						FieldKey="confirm_password"
						watch={registerForm.watch}
						error={registerForm.formState.errors}
					/>

					<Button type="submit" textContent="Đăng kí" className="!bg-violet-800" />
				</form>
				{/* <Image
					src={"/assets/img/backgroundForm/bg.jpg"}
					width={800}
					height={600}
					alt="sub-image"
					// fill={false}
					// style={{ objectFit: "fill" }}
					className="group-hover:opacity-100 absolute z-[2] top-0 opacity-60 h-[600px] overflow-hidden"
				/> */}
				{onClose && (
					<div className="absolute  top-[-20px] right-[-10px] xl:right-[-20px] z-[3]">
						<IconClose onClose={onClose} />
					</div>
				)}
			</div>
		</WrapperAuthLayout>
	);
};

export default RegisterForm;
