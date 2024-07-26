import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { inputIntroduceDate, inputIntroduceText } from "@/app/_constant/inputIntroduceUI.constant";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import FormService from "@/app/_services/form.service";
import { FormCore, InputCore, ReactCustom } from "@/type";
import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBigRight } from "lucide-react";
import { inputSettingDate } from "@/app/_constant/input.constant";
import Calendar from "@/app/(NextClient)/test/calendar/Calendar";
import useChangeTypeInput from "@/app/hooks/useChangeTypeInput";
import InputIntroduceHeader from "../../InputIntroduce/InputIntroduceHeader";

type TProps = {
	inputItem: InputCore.InputDate.InputTypeDate;
	setOpenModel: ReactCustom.SetStateBoolean;
};

const InputDateIntroduce = (props: TProps) => {
	const { inputItem, setOpenModel } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const changeTypeInput = useChangeTypeInput();

	const handleChooseInputType = () => {
		changeTypeInput.mutate({ form: formCore, inputItem, type: "DATE" });
	};

	return (
		<DivNative className="w-full h-full flex flex-col py-[1rem] ">
			<InputIntroduceHeader
				title={inputIntroduceDate.title}
				description={inputIntroduceDate.description}
				action={handleChooseInputType}
			/>
			<DivNative className="h-[76%]  max-h-[76%] overflow-hidden flex flex-col gap-[2.6rem] p-[1rem_1.4rem]  ">
				<DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-gray-200  text-gray-400">
					Ví dụ
				</DivNative>
				<DivNative className={`h-full   flex flex-col  gap-[1rem] `}>
					<Calendar />
				</DivNative>
			</DivNative>
		</DivNative>
	);
};

export default InputDateIntroduce;
