import { RootState } from "@/app/_lib/redux/store";
import { FormCore, InputCore as TInputCore, UI } from "@/type";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import InputCore from "../InputCore";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import Image from "next/image";

type TProps = {
	inputItem: TInputCore.InputImage.InputTypeImage;
};

const InputCoreImage = (props: TProps) => {
	const { inputItem } = props;
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
	const inputRef = useRef<HTMLInputElement | null>(null);

	const [filePreview, setFilePreview] = useState<string>("");

	const handleClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			if (!file) return;
			const link_preview = URL.createObjectURL(file);
			setFilePreview(link_preview);
		}
	};

	useEffect(() => {
		return () => {
			URL.revokeObjectURL(filePreview);
		};
	}, [filePreview]);

	const InputImage = (
		<DivNative className="relative flex flex-col items-start gap-[1rem] text-text-theme ">
			<DivNative className={`h-[90%]  flex flex-col items-start  gap-[3rem] `}>
				<button
					onClick={handleClick}
					className="p-[.8rem] min-w-[12rem] text-text-theme border-[.1rem] border-text-theme bg-color-section-theme text-[1.4rem] rounded-xl"
				>
					Tải ảnh lên
				</button>
				<input type="file" hidden={true} ref={inputRef} onChange={handleUpload} />
				{filePreview && (
					<Image
						src={filePreview}
						width={70}
						height={70}
						alt="demo upload hình ảnh"
						className="w-[20rem] h-[20rem]"
					/>
				)}
			</DivNative>
		</DivNative>
	);

	return (
		<InputCore
			InputComponent={InputImage}
			inputItem={inputItem}
			inputTitle={inputItem.input_title || ""}
			dataTextTitle="Thêm mô tả về ngày được chọn"
		/>
	);
};

export default InputCoreImage;
