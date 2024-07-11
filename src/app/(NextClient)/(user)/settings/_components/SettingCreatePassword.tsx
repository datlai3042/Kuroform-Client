import Input from "@/app/(NextClient)/_components/ui/input/Input";
import { onFetchUser } from "@/app/_lib/redux/features/authentication.slice";
import { addOneToastSuccess } from "@/app/_lib/redux/features/toast.slice";
import { CreatePasswordType, createPasswordSchema } from "@/app/_schema/user/createPassword.schema";
import useCreatePassword from "@/app/hooks/user/useCreatePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

type TProps = {
	setTab: React.Dispatch<SetStateAction<"account" | "create_password" | "update_password">>;
};

const SettingCreatePassword = (props: TProps) => {
	const { setTab } = props;

	const createPassword = useCreatePassword();
	const dispatch = useDispatch();
	const createPasswordForm = useForm<CreatePasswordType>({
		defaultValues: {
			password: "",
			confirm_password: "",
		},
		resolver: zodResolver(createPasswordSchema),
	});

	const onSubmit = (form: CreatePasswordType) => {
		createPassword.mutate({ password: form.password });
	};

	useEffect(() => {
		if (createPassword.isSuccess) {
			dispatch(
				addOneToastSuccess({
					toast_item: {
						_id: uuid(),
						toast_title: "Thông tin tài khoản",
						type: "SUCCESS",
						core: { message: "Tạo mật khẩu thành công" },
					},
				})
			);
			setTab("account");
		}
	}, [createPassword.isSuccess]);

	useEffect(() => {
		if (createPassword.isSuccess) {
			const { user } = createPassword.data.metadata;
			dispatch(onFetchUser({ user }));
		}
	}, [createPassword.isSuccess]);

	return (
		<div className="min-h-full h-max">
			<form className="flex flex-col gap-[2rem]" onSubmit={createPasswordForm.handleSubmit(onSubmit)}>
				<Input<CreatePasswordType>
					FieldKey="password"
					placeholder="Nhập mật khảu"
					register={createPasswordForm.register}
					type="password"
					watch={createPasswordForm.watch}
					error={createPasswordForm.formState.errors}
				/>

				<Input<CreatePasswordType>
					FieldKey="confirm_password"
					placeholder="Xác nhận lại mật khảu"
					register={createPasswordForm.register}
					type="password"
					watch={createPasswordForm.watch}
					error={createPasswordForm.formState.errors}
				/>

				<button
					type="submit"
					className="mt-[2rem] min-w-[10%] w-max p-[.8rem] h-[3.6rem] flex justify-center items-center gap-[.8rem] bg-blue-700 text-white rounded-lg"
				>
					Tạo mật khảu
				</button>
			</form>
		</div>
	);
};

export default SettingCreatePassword;
