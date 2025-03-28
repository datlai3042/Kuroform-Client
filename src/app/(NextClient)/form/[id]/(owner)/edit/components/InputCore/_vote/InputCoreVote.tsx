import { InputCore as TInputCore } from "@/type";
import React, { useState } from "react";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { Rate } from "antd";
import InputCore from "../InputCore";

type TProps = {
	inputItem: TInputCore.InputVote.InputTypeVote;
};

const InputCoreVote = (props: TProps) => {
	const { inputItem } = props;

	const [start, setStart] = useState<number>(2.5);

	const InputVote = (
		<DivNative className="flex flex-col gap-[1rem]">
			<SpanNative textContent="Đánh giá" className="text-[1.6rem] font-sans" />
			<DivNative className={` relative min-h-[5rem]  h-max flex items-center gap-[.5rem] `}>
				<div className="w-max px-[2rem] h-[4rem] bg-bg-input-theme flex items-center rounded-lg ">
					<Rate allowHalf value={start} onChange={(e) => setStart(e)} className="" />
				</div>
			</DivNative>
			<span className="text-[1.4rem]">Số đánh giá bạn chọn là: {start}</span>
		</DivNative>
	);

	return (
		<InputCore
			InputComponent={InputVote}
			inputItem={inputItem}
			inputTitle={inputItem.input_title || ""}
			dataTextTitle="Thêm tiêu đề cho đánh giá"
		/>
	);
};

export default InputCoreVote;
