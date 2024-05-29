"use client";

import { Hexagon } from "lucide-react";
import React, { useContext } from "react";
import { FormEditContext } from "../../provider/FormEditProvider";
import { useMutation } from "@tanstack/react-query";
import { FormCore } from "@/type";
import FormService from "@/app/_services/form.service";

export interface ButtonAddAvatarFormProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent?: string;
}

const ButtonAddAvatarForm = (props: ButtonAddAvatarFormProps) => {
	const { formInitial, setFormInitial } = useContext(FormEditContext);

	const { textContent = "Thêm Avatar", ...buttonProps } = props;

	const addAvatarMutation = useMutation({
		mutationKey: ["add-background"],
		mutationFn: (form: FormCore.Form) => FormService.addAvatar(formInitial),
		onSuccess: (res) => {
			const { form } = res.metadata;
			setFormInitial(form);
		},
	});

	const onAddAvatar = () => {
		addAvatarMutation.mutate(formInitial);
	};

	return (
		<button
			{...buttonProps}
			className={` ${buttonProps.className} w-[14rem] flex items-center justify-center gap-[.5rem] text-textHeader  rounded-md text-[1.5rem] font-bold hover:bg-gray-200 hover:text-slate-700`}
			onClick={onAddAvatar}
		>
			<Hexagon />
			{textContent}
		</button>
	);
};

export default ButtonAddAvatarForm;
