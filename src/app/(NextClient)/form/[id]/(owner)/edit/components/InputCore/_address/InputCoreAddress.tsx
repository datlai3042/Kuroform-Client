import { FormCore, InputCore as TInputCore } from "@/type";
import React, { useMemo, useState } from "react";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import InputCore from "../InputCore";
import ModelAddress from "@/app/(NextClient)/_components/Model/ModelAddress";

type TProps = {
	inputItem: TInputCore.InputAddress.InputTypeAddress;
};

const InputCoreAddress = (props: TProps) => {
	const { inputItem } = props;
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const [address, setAddress] = useState<string>("");
	const [checkValidate, setCheckValidate] = useState<boolean>(false);

	const [phone, setPhone] = useState<number>(0);

	const InputAddress = (
		<div className="flex flex-col gap-[2rem]">
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
		</div>
	);

	return (
		<InputCore
			InputComponent={InputAddress}
			inputItem={inputItem}
			inputTitle={inputItem.input_title || ""}
			dataTextTitle="Thêm tiêu đề cho phần địa chỉ"
		/>
	);
};

export default InputCoreAddress;
