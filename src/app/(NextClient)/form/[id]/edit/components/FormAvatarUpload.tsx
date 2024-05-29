import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import Button from "@/app/(NextClient)/_components/ui/button/Button";
import FormService from "@/app/_services/form.service";
import { FormCore } from "@/type";
import { useMutation } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";

type Mode = "UPLOAD" | "COLOR";

const FormAvatarUpload = () => {
	const [mode, setMode] = useState<Mode>("UPLOAD");
	const { formInitial, setFormInitial } = useContext(FormEditContext);

	const fileUploadMutation = useMutation({
		mutationKey: ["upload-avatar-form"],
		mutationFn: (infoForm: FormCore.uploadFile) => FormService.uploadAvatar(infoForm),
	});

	useEffect(() => {
		if (fileUploadMutation.isSuccess) {
			const { form } = fileUploadMutation.data.metadata;
			setFormInitial((prev) => ({ ...prev, form_avatar: form }));
		}
	}, [fileUploadMutation.isSuccess, fileUploadMutation.data, setFormInitial]);

	const deleteCoverMutaion = useMutation({
		mutationKey: ["delete-avatar-form"],
		mutationFn: (id: string) => FormService.deleteCover(id),
		onSuccess: (res) => {
			const { form } = res.metadata;
			setFormInitial(form);
		},
	});

	const inputCoverRef = useRef<HTMLInputElement | null>(null);

	const onClickBtnChangeAvatar = () => {
		if (inputCoverRef.current) {
			inputCoverRef.current.click();
		}
	};

	const actionDelete = () => {
		deleteCoverMutaion.mutate(formInitial._id);
	};

	const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			const formData: FormCore.uploadFile = new FormData();
			formData.append("file", file);
			formData.append("form_id", formInitial._id);
			console.log({ formData, file, _id: formInitial._id });
			fileUploadMutation.mutate(formData);
		}
	};

	const styleEffect = {
		onActive: (modeContent: Mode) => {
			if (modeContent === mode) {
				return "border-slate-900";
			}
			return "border-transparent";
		},
	};

	return (
		<DivNative className="w-full h-full flex flex-col ">
			<DivNative className="h-[10%] px-[2.2rem] flex justify-between border-b-[.1rem] border-slate-200">
				<DivNative className="flex gap-[2rem]">
					<ButtonNative
						onClick={() => setMode("UPLOAD")}
						className={`${styleEffect.onActive(
							"UPLOAD"
						)}  h-full w-max flex items-center border-b-[.2rem]  hover:border-slate-900 text-[1.6rem] font-bold text-textHeader hover:text-slate-800`}
						textContent="Upload"
					/>
				</DivNative>

				<ButtonNative
					textContent="Remove"
					onClick={actionDelete}
					disabled={deleteCoverMutaion.isPending}
				></ButtonNative>
			</DivNative>

			{mode === "UPLOAD" && !fileUploadMutation.isPending && (
				<ButtonNative
					className="flex-1 w-full h-full p-[2rem] hover:cursor-pointer"
					textContent=""
					disabled={fileUploadMutation.isPending}
					onClick={onClickBtnChangeAvatar}
				>
					<input ref={inputCoverRef} type="file" className="hidden" onChange={onChangeFile} />
					<DivNative className="w-full h-full border-[.1rem] border-dashed border-slate-300 flex flex-col justify-center items-center gap-[1rem] text-[2rem] ">
						<Upload size={28} />
						Chọn file để tải lên
					</DivNative>
				</ButtonNative>
			)}

			{mode === "UPLOAD" && fileUploadMutation.isPending && (
				<DivNative className="flex-1 w-full h-full p-[2rem] hover:cursor-pointer">loading</DivNative>
			)}
		</DivNative>
	);
};

export default FormAvatarUpload;
