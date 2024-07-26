import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { inputIntroduceVote } from "@/app/_constant/inputIntroduceUI.constant";
import { RootState } from "@/app/_lib/redux/store";
import useChangeTypeInput from "@/app/hooks/useChangeTypeInput";
import { InputCore, ReactCustom } from "@/type";
import { Rate } from "antd";
import { ArrowBigRight, AtSign } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputIntroduceHeader from "../../InputIntroduce/InputIntroduceHeader";

type TProps = {
	inputItem: InputCore.InputVote.InputTypeVote;
	setOpenModel: ReactCustom.SetStateBoolean;
};

const InputVoteIntroduce = (props: TProps) => {
	const { inputItem, setOpenModel } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const [start, setStart] = useState<number>(2.5);

	const changeTypeInput = useChangeTypeInput();
	const handleChooseInputType = () => {
		changeTypeInput.mutate({ form: formCore, inputItem, type: "VOTE" });
	};

	return (
		<DivNative className="w-full h-full flex flex-col py-[1rem] ">
			<InputIntroduceHeader
				title={inputIntroduceVote.title}
				description={inputIntroduceVote.description}
				action={handleChooseInputType}
			/>

			<DivNative className="h-[50%] flex flex-col gap-[2.6rem] p-[3rem_2rem]">
				<DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-gray-200  text-gray-400">
					Ví dụ
				</DivNative>
				<DivNative className="flex flex-col gap-[1rem]">
					<SpanNative textContent="Đánh giá" className="text-[1.6rem] font-bold" />
					<DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
						<div className="p-[1rem_2rem] rounded-lg bg-color-section-theme border-[.1rem] border-text-theme">
							<Rate allowHalf value={start} onChange={(e) => setStart(e)} />
						</div>
					</DivNative>
					<span className="text-[1.4rem]">Số đánh giá bạn chọn là: {start}</span>
				</DivNative>
			</DivNative>
		</DivNative>
	);
};

export default InputVoteIntroduce;
