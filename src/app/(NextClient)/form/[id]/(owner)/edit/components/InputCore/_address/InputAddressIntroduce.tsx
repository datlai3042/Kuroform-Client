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

type TProps = {
	inputItem: InputCore.InputAddress.InputTypeAddress;
	setOpenModel: ReactCustom.SetStateBoolean;
};

const InputAddressIntroduce = (props: TProps) => {
	const { inputItem, setOpenModel } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const changeTypeInput = useChangeTypeInput();

	const [phone, setPhone] = useState<number>(0);

	const handleChooseInputType = () => {
		const newForm = structuredClone(formCore);
		newForm.form_inputs = newForm.form_inputs.map((ip) => {
			if (ip._id === inputItem._id) {
				const newIp = structuredClone(ip);
				newIp.type = "PHONE";
				if (newIp.type === "PHONE") {
					changeTypeInput.mutate({ form: formCore, inputItem, type: "PHONE" });
					return newIp;
				}
			}
			return ip;
		});
	};

	return (
		<DivNative className="w-full h-full flex flex-col py-[1rem] ">
			<DivNative className="w-full h-[50%] flex flex-col gap-[3rem] xl:border-b-[.2rem] border-gray-100  ">
				<DivNative className="min-h-[2rem] flex flex-col xl:flex-row xl:items-center justify-between gap-[4rem] xl:gap-0  px-[2rem]">
					<DivNative className="text-[2.2rem] font-semibold ">{inputIntroducePhone.title}</DivNative>
					<ButtonIcon
						textContent="Thêm input này"
						className="h-[50%] flex items-center p-[.8rem] xl:p-[1rem] bg-blue-600 rounded-lg text-[1.2rem] xl:text-[1.4rem] text-[#ffffff]"
						Icon={<ArrowBigRight />}
						onClick={handleChooseInputType}
					/>
				</DivNative>
				<DivNative className="flex-1 px-[2rem] text-[1.6rem] opacity-60">
					{inputIntroducePhone.description}
				</DivNative>
			</DivNative>
			<DivNative className="h-[50%] hidden xl:flex flex-col gap-[2.6rem] p-[3rem_2rem]">
				<DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-gray-200  text-gray-400">
					Ví dụ
				</DivNative>
				<DivNative className="flex flex-col gap-[1rem]">
					<SpanNative textContent="Số điện thoại" className="text-[1.6rem] font-bold" />
					<DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
						<input
							value={phone}
							type="number"
							className="w-full h-full p-[1rem] rounded-lg text-[1.6rem]   border-[.1rem] border-gray-400  outline-none focus:outline-blue-200 focus:border-transparent"
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

export default InputAddressIntroduce;
