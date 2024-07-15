import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { inputSettingText } from "@/app/_constant/input.constant";
import { inputIntroduceText } from "@/app/_constant/inputIntroduceUI.constant";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import FormService from "@/app/_services/form.service";
import useChangeTypeInput from "@/app/hooks/useChangeTypeInput";
import { FormCore, InputCore, ReactCustom } from "@/type";
import { useMutation } from "@tanstack/react-query";
import { ArrowBigRight, AtSign } from "lucide-react";

import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

type TProps = {
	inputItem: InputCore.InputText.InputTypeText;
	setOpenModel: ReactCustom.SetStateBoolean;
};

const InputTextIntroduce = (props: TProps) => {
	const { inputItem, setOpenModel } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const changeTypeInput = useChangeTypeInput();

	const handleChooseInputType = () => {
		const newForm = structuredClone(formCore);
		newForm.form_inputs = newForm.form_inputs.map((ip) => {
			if (ip._id === inputItem._id) {
				const newIp = structuredClone(ip);
				newIp.type = "TEXT";
				if (newIp.type === "TEXT") {
					changeTypeInput.mutate({ form: formCore, inputItem, type: "TEXT" });
					return newIp;
				}
			}
			return ip;
		});
	};

	return (
		<DivNative className="w-full h-full flex flex-col py-[1rem] ">
			<DivNative className="w-full  xl:h-[50%] flex flex-col gap-[3rem] xl:border-b-[.2rem] border-gray-100  ">
				<DivNative className="min-h-[2rem] flex flex-col xl:flex-row xl:items-center justify-between gap-[4rem] xl:gap-0 px-[2rem]">
					<DivNative className="text-[2.2rem] font-semibold ">{inputIntroduceText.title}</DivNative>
					<ButtonIcon
						textContent="Thêm input này"
						className="h-[30%] xl:h-[50%] flex items-center p-[.8rem] xl:p-[2rem] bg-blue-600 rounded-lg text-[1.4rem] text-[#ffffff]"
						Icon={<ArrowBigRight />}
						onClick={handleChooseInputType}
					/>
				</DivNative>
				<DivNative className="flex-1 px-[2rem] text-[1.6rem] opacity-60">
					{inputIntroduceText.description}
				</DivNative>
			</DivNative>
			<DivNative className="h-[50%] hidden xl:flex flex-col gap-[2.6rem] p-[3rem_2rem]">
				<DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-gray-200  text-gray-400">
					Ví dụ
				</DivNative>
				<DivNative className={`min-h-[5rem] h-max flex flex-col  gap-[1rem] `}>
					<SpanNative textContent="Nhập tiêu đề cho đoạn Text" className="text-[1.6rem] font-bold" />
					<DivNative
						className="group w-full min-h-[8rem] p-[1.6rem] text-[1.6rem] break-words whitespace-pre-wrap h-max border-[.1rem] border-gray-300 rounded-lg outline-none resize-none "
						spellCheck={false}
						contentEditable={true}
						data-text={`${"Nhập thông tin của bạn"}`}
						suppressContentEditableWarning={true}
						tabIndex={0}
					></DivNative>
				</DivNative>
			</DivNative>
		</DivNative>
	);
};

export default InputTextIntroduce;
