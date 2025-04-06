import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { InputCore } from "@/type";
import React, { SetStateAction, useContext, useRef, useState } from "react";
import InputSettingLabel from "../InputSettingLabel";

type TProps = {
	inputItem: InputCore.Commom.InputCommonText;
	setInputItemString: React.Dispatch<SetStateAction<InputCore.Commom.InputCommonText>>;
};

const InputSettingMaxLength = (props: TProps) => {
	const { inputItem, setInputItemString } = props;
	const [maxLength, setMaxLength] = useState<number>(inputItem.core.setting.maxLength || 100);

	const maxLengthRef = useRef<HTMLInputElement | null>(null);

	const labelClick = () => {
		if (maxLengthRef.current) {
			maxLengthRef.current.focus();
		}
	};

	const handleMaxLengthInput = (e: React.ChangeEvent<HTMLDivElement>) => {
		setInputItemString((prev) => {
			const newSetting = structuredClone(prev);
			newSetting.core.setting.minLength = maxLength;
			return newSetting;
		});
	};

	return (
		<DivNative className="flex items-center justify-between gap-[.5rem]">

			
			<InputSettingLabel  onClick={labelClick} className="hover:cursor-pointer">
				Max
			</InputSettingLabel>
			<input
				ref={maxLengthRef}
				onBlur={handleMaxLengthInput}
				onChange={(e) => setMaxLength(+e.target.value)}
				type="number"
				value={maxLength}
				className="text-right w-[40%] bg-color-section-theme text-text-theme border-[.1rem] border-[var(--border-color-input)] p-[.7rem] rounded-[.4rem]  outline-2 outline-blue-400"
			/>
		</DivNative>
	);
};

export default InputSettingMaxLength;
