import { FormCore, InputCore as TInputCore } from "@/type";
import React, { useMemo, useState } from "react";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import InputCore from "../InputCore";

type TProps = {
	inputItem: TInputCore.InputAnchor.InputTypeAnchor;
};

const InputCoreAnchor = (props: TProps) => {
	const { inputItem } = props;
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
	const form_mode_display = formCore.form_mode_display === "custom";

	const [phone, setPhone] = useState<number>(0);

	const InputPhone = (
		<DivNative className="flex flex-col gap-[1rem] text-text-theme ">
			<SpanNative
				textContent="Số điện thoại"
				className={`${
					form_mode_display ? "group-hover:!text-[#ffffff]" : "text-text-theme"
				} text-[1.6rem] font-semibold`}
			/>
			<DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
				<input
					value={phone}
					type="number"
					className="w-full h-full text-text-theme p-[1rem] rounded-lg text-[1.6rem]   border-[.1rem] border-gray-400  outline-none focus:outline-blue-200 focus:border-transparent"
					placeholder="Nhập số điện thoại của bạn"
					onChange={(e) => setPhone(+e.target.value)}
				/>
			</DivNative>
		</DivNative>
	);

	return (
		<InputCore
			InputComponent={InputPhone}
			inputItem={inputItem}
			inputTitle={inputItem.input_title || ""}
			dataTextTitle="Thêm tiêu đề cho số điện thoại"
		/>
	);
};

export default InputCoreAnchor;
