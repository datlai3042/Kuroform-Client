import React from "react";
import DivNative from "../NativeHtml/DivNative";

export interface ButtonCustomProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	value: string;
	checked: boolean;
	color: string;
	icon?: React.ReactNode;
}

const ButtonSelect = (props: ButtonCustomProps) => {
	const { checked, color, value, icon, ...buttonProps } = props;

	const styleEffect = {
		onActiveRequireWrapper: () => {
			if (checked) return "bg-[var(--color-main)]";
			return "bg-slate-300";
		},
		onActiveRequireCircle: () => {
			if (checked) return "right-0";
			return " left-0";
		},
	};

	return (
		<button {...buttonProps} className="w-full flex  gap-[.3rem] items-center justify-between">
			{icon && <span className="mr-2">{icon}</span>}
			<span className="font-medium">{value}</span>

			<DivNative
				className={`${styleEffect.onActiveRequireWrapper()} relative  w-[4rem] h-[2.4rem] flex items-center justify-center transition-all rounded-3xl  hover:cursor-pointer`}
				// onClick={handleRequireInput}
			>
				<DivNative
					className={`${styleEffect.onActiveRequireCircle()} absolute bg-[#ffffff] w-[2rem]  transition-all  aspect-square rounded-full `}
				></DivNative>
			</DivNative>
		</button>
	);
};

export default ButtonSelect;
