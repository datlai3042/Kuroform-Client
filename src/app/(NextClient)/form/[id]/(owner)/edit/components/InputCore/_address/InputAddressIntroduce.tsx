import ModelAddress from "@/app/(NextClient)/_components/Model/ModelAddress";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { inputIntroduceAddress } from "@/app/_constant/inputIntroduceUI.constant";
import { RootState } from "@/app/_lib/redux/store";
import useChangeTypeInput from "@/app/hooks/useChangeTypeInput";
import { InputCore, ReactCustom } from "@/type";
import { ArrowBigRight } from "lucide-react";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

type TProps = {
	inputItem: InputCore.InputAddress.InputTypeAddress;
	setOpenModel: ReactCustom.SetStateBoolean;
};

const InputAddressIntroduce = (props: TProps) => {
	const { inputItem } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const changeTypeInput = useChangeTypeInput();

	const [address, setAddress] = useState<string>("");
	const [checkValidate, setCheckValidate] = useState<boolean>(false);

	const handleChooseInputType = () => {
		const newForm = structuredClone(formCore);
		newForm.form_inputs = newForm.form_inputs.map((ip) => {
			if (ip._id === inputItem._id) {
				const newIp = structuredClone(ip);
				newIp.type = "ADDRESS";
				if (newIp.type === "ADDRESS") {
					changeTypeInput.mutate({ form: formCore, inputItem, type: "ADDRESS" });
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
					<DivNative className="text-[2.2rem] font-semibold ">{inputIntroduceAddress.title}</DivNative>
					<ButtonIcon
						textContent="Thêm input này"
						className="h-[50%] flex items-center p-[.8rem] xl:p-[1rem] bg-blue-600 rounded-lg text-[1.2rem] xl:text-[1.4rem] text-[#ffffff]"
						Icon={<ArrowBigRight />}
						onClick={handleChooseInputType}
					/>
				</DivNative>
				<DivNative className="flex-1 px-[2rem] text-[1.6rem] opacity-60">
					{inputIntroduceAddress.description}
				</DivNative>
			</DivNative>
			<DivNative className="h-[10%] hidden xl:flex flex-col gap-[2.6rem] p-[2rem]">
				<DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-gray-200  text-gray-400">
					Ví dụ
				</DivNative>
				<ModelAddress
					detail={true}
					onChange={(address) => setAddress(address)}
					onCheckFullField={(check) => setCheckValidate(check)}
				/>
				<div className="flex items-center justify-between">
					{address && <span className="text-[1.4rem]">{address}</span>}
					<button className="ml-auto h-[4rem] w-[9rem] flex items-center justify-center p-[.8rem] xl:p-[1rem] bg-blue-600 rounded-lg text-[1.2rem] xl:text-[1.4rem] text-[#ffffff]">
						Xác nhận
					</button>
				</div>
			</DivNative>
		</DivNative>
	);
};

export default InputAddressIntroduce;
