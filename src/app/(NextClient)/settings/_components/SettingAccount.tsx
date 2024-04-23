import React from "react";
import InputLayout from "../../_components/ui/input/InputLayout";
import { registerSchema } from "@/app/_schema/auth/register.schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../_components/ui/input/Input";

const userUpdateSchema = registerSchema.pick({ first_name: true, last_name: true });
type UserUpdateInfo = z.infer<typeof userUpdateSchema>;

const SettingAccount = () => {
	const formUpdate = useForm<UserUpdateInfo>({
		defaultValues: {
			first_name: "12113",
			last_name: "411144",
		},
		resolver: zodResolver(userUpdateSchema),
	});

	const onSubmit = (dataForm: UserUpdateInfo) => {
		console.log({ dataForm });
	};

	console.log({ errors: formUpdate.formState.errors });
	console.log({ value: formUpdate.formState.defaultValues });

	return (
		<div className="flex flex-col ">
			<form onSubmit={formUpdate.handleSubmit(onSubmit)} id="form_update">
				<Input<UserUpdateInfo>
					FieldKey="first_name"
					placeholder="Nhập first name"
					register={formUpdate.register}
					type="text"
					watch={formUpdate.watch}
					error={formUpdate.formState.errors}
				/>

				<Input<UserUpdateInfo>
					FieldKey="last_name"
					placeholder="Nhập last name"
					register={formUpdate.register}
					type="text"
					watch={formUpdate.watch}
					error={formUpdate.formState.errors}
				/>
			</form>
			<InputLayout placeholder="email" value="123" />
			<button
				type="submit"
				form="form_update"
				className="w-[10%] p-[.2rem_.8rem] h-[2.7rem] flex justify-center items-center gap-[.8rem] bg-slate-700 text-white rounded-md"
			>
				Update
			</button>
		</div>
	);
};

export default SettingAccount;