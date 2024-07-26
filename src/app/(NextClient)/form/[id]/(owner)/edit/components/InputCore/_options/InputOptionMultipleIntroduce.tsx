import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { inputSettingOptionMultiple, inputSettingText } from "@/app/_constant/input.constant";
import {
	inputIntroduceOption,
	inputIntroduceOptionMultiple,
	inputIntroduceText,
} from "@/app/_constant/inputIntroduceUI.constant";
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
	inputItem: InputCore.InputOptionMultiple.InputTypeOptionMultiple;
	setOpenModel: ReactCustom.SetStateBoolean;
};

const InputOptionMultipleIntroduce = (props: TProps) => {
	const { inputItem, setOpenModel } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

	const changeTypeInput = useChangeTypeInput();
	const handleChooseInputType = () => {
		changeTypeInput.mutate({ form: formCore, inputItem, type: "OPTION_MULTIPLE" });
	};

	return (
		<DivNative className="w-full h-full flex flex-col py-[1rem] ">
			<InputIntroduceHeader
				title={inputIntroduceOptionMultiple.title}
				description={inputIntroduceOptionMultiple.description}
				action={handleChooseInputType}
			/>
			<DivNative className="h-[50%] flex flex-col gap-[2.6rem] p-[3rem_2rem]">
				<DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-gray-200  text-gray-400">
					Ví dụ
				</DivNative>
				<DivNative className={`min-h-[5rem] h-max flex flex-col  gap-[1rem] text-[1.4rem]`}>
					<div className="text-[1.6rem] font-semibold">Framework Front end bạn sử dụng?</div>
					<div className="px-[4rem] flex flex-col gap-[1rem]">
						<div className="flex items-center gap-[1rem]">
							<input type="checkbox" className="" name="front-end-core" value={"React"} />
							<span>React</span>
						</div>

						<div className="flex items-center gap-[1rem]">
							<input type="checkbox" className="" name="front-end-core" value={"Angular"} />
							<span>Angular</span>
						</div>

						<div className="flex items-center gap-[1rem]">
							<input type="checkbox" className="" name="front-end-core" value={"Vue"} />
							<span>Vue</span>
						</div>

						<div className="flex items-center gap-[1rem]">
							<input type="checkbox" className="" name="front-end-core" value={"Other"} />
							<span>Other</span>
						</div>
					</div>
				</DivNative>
			</DivNative>
		</DivNative>
	);
};

export default InputOptionMultipleIntroduce;
