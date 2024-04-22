import { ChevronsLeft } from "lucide-react";
import React from "react";
import { ButtonCustomProps } from "./Button";

export type TProps = {
	Icon: React.ReactNode;
} & Omit<ButtonCustomProps, "textContent">;

const ButtonIcon = (props: TProps) => {
	const { Icon, ...buttonProps } = props;

	return (
		<button
			{...buttonProps}
			className={`${buttonProps.className} w-[30px] h-[30px] flex justify-center items-center `}
		>
			{Icon}
		</button>
	);
};

export default ButtonIcon;
