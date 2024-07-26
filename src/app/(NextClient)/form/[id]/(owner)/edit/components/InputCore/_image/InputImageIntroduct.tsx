import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { inputIntroduceImage } from "@/app/_constant/inputIntroduceUI.constant";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore, InputCore, ReactCustom } from "@/type";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBigRight } from "lucide-react";
import useChangeTypeInput from "@/app/hooks/useChangeTypeInput";
import Image from "next/image";
import InputIntroduceHeader from "../../InputIntroduce/InputIntroduceHeader";

type TProps = {
	inputItem: InputCore.InputImage.InputTypeImage;
	setOpenModel: ReactCustom.SetStateBoolean;
};

const InputImageIntroduce = (props: TProps) => {
	const { inputItem, setOpenModel } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const changeTypeInput = useChangeTypeInput();

	const inputRef = useRef<HTMLInputElement | null>(null);

	const [filePreview, setFilePreview] = useState<string>("");

	const handleChooseInputType = () => {
		changeTypeInput.mutate({ form: formCore, inputItem, type: "FILE_IMAGE" });
	};

	const handleClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			const link_preview = URL.createObjectURL(file);
			setFilePreview(link_preview);
		}
	};

	useEffect(() => {
		return () => {
			URL.revokeObjectURL(filePreview);
		};
	}, [filePreview]);

	return (
		<DivNative className="w-full h-full flex flex-col py-[1rem] ">
			<InputIntroduceHeader
				title={inputIntroduceImage.title}
				description={inputIntroduceImage.description}
				action={handleChooseInputType}
			/>
			<DivNative className="h-[90%] flex flex-col gap-[2.6rem] p-[3rem_2rem]">
				<DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-gray-200  text-gray-400">
					Ví dụ
				</DivNative>
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
		</DivNative>
	);
};

export default InputImageIntroduce;
