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
import InputIntroduceHeader from "../../InputIntroduce/InputIntroduceHeader";

type TProps = {
	inputItem: InputCore.InputText.InputTypeText;
	setOpenModel: ReactCustom.SetStateBoolean;
};

const InputTextIntroduce = (props: TProps) => {
	const { inputItem, setOpenModel } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const changeTypeInput = useChangeTypeInput();

	const handleChooseInputType = () => {
		changeTypeInput.mutate({ form: formCore, inputItem, type: "TEXT" });
	};
	return (
		<DivNative className="w-full h-full flex flex-col py-[1rem] ">
			<InputIntroduceHeader
				title={inputIntroduceText.title}
				description={inputIntroduceText.description}
				action={handleChooseInputType}
			/>

			<DivNative className="h-[50%] flex flex-col gap-[2.6rem] p-[3rem_2rem]">
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
