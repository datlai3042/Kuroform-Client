import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { regexPhoneVietNam } from "@/app/(NextClient)/form/[id]/_components/InputAnswer/_validate/inputPhone.validate";
import { inputIntroducePhone } from "@/app/_constant/inputIntroduceUI.constant";
import { RootState } from "@/app/_lib/redux/store";
import useChangeTypeInput from "@/app/hooks/useChangeTypeInput";
import { InputCore, ReactCustom } from "@/type";
import { ArrowBigRight, AtSign } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputIntroduceHeader from "../../InputIntroduce/InputIntroduceHeader";

type TProps = {
	inputItem: InputCore.InputPhone.InputTypePhone;
	setOpenModel: ReactCustom.SetStateBoolean;
};

const InputPhoneIntroduce = (props: TProps) => {
	const { inputItem, setOpenModel } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const [phone, setPhone] = useState<number>(0);

	const changeTypeInput = useChangeTypeInput();
	const handleChooseInputType = () => {
		changeTypeInput.mutate({ form: formCore, inputItem, type: "PHONE" });
	};

	return (
		<DivNative className="w-full h-full flex flex-col  sm:py-[4rem] ">
			<InputIntroduceHeader
				title={inputIntroducePhone.title}
				description={inputIntroducePhone.description}
				action={handleChooseInputType}
			/>
			<DivNative className="h-[50%] flex flex-col gap-[2.6rem] p-[1rem_2rem] sm:p-[3rem_2rem]">
				<DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-color-main text-[#fff]">
					Ví dụ
				</DivNative>
				<DivNative className="flex flex-col gap-[1rem]">
					<SpanNative textContent="Số điện thoại" className="text-[1.6rem] font-bold" />
					<DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
						<input
							value={phone}
							type="number"
							className="w-full h-full p-[1rem] rounded-lg text-[1.6rem]   border-[.1rem] border-[var(--border-color-input)] bg-color-section-theme text-[#fff]  outline-none "
							placeholder="Nhập số điện thoại của bạn"
							onChange={(e) => setPhone(+e.target.value)}
						/>
					</DivNative>
					<span className="text-[1.4rem]">
						Số điện thoại bạn nhập{" "}
						{phone > 0 && phone.toString().match(regexPhoneVietNam) ? "hợp lệ" : "không hợp lệ"}
					</span>
				</DivNative>
			</DivNative>
		</DivNative>
	);
};

export default InputPhoneIntroduce;
