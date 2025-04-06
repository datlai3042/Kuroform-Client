import { FormCore, InputCore as TInputCore } from "@/type";
import React, { useMemo, useState } from "react";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { regexPhoneVietNam } from "@/app/(NextClient)/form/[id]/_components/InputAnswer/_validate/inputPhone.validate";
import InputCore from "../InputCore";

type TProps = {
	inputItem: TInputCore.InputPhone.InputTypePhone;
};

const InputCorePhone = (props: TProps) => {
	const { inputItem } = props;
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
	const form_mode_display = formCore.form_mode_display === "custom";

	const [phone, setPhone] = useState<number>(0);

	const InputPhone = (
		<DivNative className="flex flex-col gap-[1rem] text-text-theme bg-color-section-theme">
			<SpanNative
				textContent="Số điện thoại"
				className={`${
					form_mode_display ? "group-hover:!text-[#ffffff]" : "text-text-theme"
				} text-[1.6rem] font-medium`}
			/>
			<DivNative className={` relative min-h-[5rem] bg-[var(--color-section-theme)] border-[.1rem] rounded-[.4rem] border-[var(--border-color-input)] h-max flex items-center gap-[.5rem] `}>
				<input
					value={phone}
					type="number"
					className="w-full h-full text-text-theme p-[1rem] rounded-lg text-[1.6rem] bg-[var(--color-section-theme)]    outline-none focus:outline-blue-200 focus:border-transparent"
					placeholder="Nhập số điện thoại của bạn"
					onChange={(e) => setPhone(+e.target.value)}
				/>
			</DivNative>
			{phone != 0 && !phone.toString().match(regexPhoneVietNam) && (
				<>
					<span className="text-[1.4rem]">Số điện thoại bạn nhập không hợp lệ</span>

					<span>Input này chỉ chấp nhập giá trị là số</span>
				</>
			)}

			{phone != 0 && phone.toString().match(regexPhoneVietNam) && (
				<>
					<span className="text-[1.4rem]">Số điện thoại bạn nhập hợp lệ</span>
				</>
			)}
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

export default InputCorePhone;
