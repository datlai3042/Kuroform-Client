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
			<DivNative className="w-full h-[40%] flex flex-col gap-[3rem] border-b-[.2rem] border-gray-100  ">
				<DivNative className="min-h-[2rem] flex items-center justify-between  px-[2rem]">
					<DivNative className="text-[2.2rem] font-semibold ">{inputIntroduceDate.title}</DivNative>
					<ButtonIcon
						textContent="Thêm input này"
						className="h-[30%] xl:h-[50%] flex items-center p-[.8rem] xl:p-[2rem] bg-blue-600 rounded-lg text-[1.4rem] text-[#ffffff]"
						Icon={<ArrowBigRight />}
						onClick={handleChooseInputType}
					/>
				</DivNative>
				<DivNative className="flex-1 px-[2rem] text-[1.6rem] opacity-60">
					{inputIntroduceDate.description}
				</DivNative>
			</DivNative>
			<DivNative className="h-[90%] flex flex-col gap-[2.6rem] p-[3rem_2rem]">
				<DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-gray-200  text-gray-400">
					Ví dụ
				</DivNative>
				<DivNative className={`h-[90%]  flex flex-col  gap-[1rem] `}>
					<Calendar />
				</DivNative>
			</DivNative>
		</DivNative>
	);
};

export default InputDateIntroduce;
