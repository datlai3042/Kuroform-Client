import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import { onEditForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import { useDebouncedCallback } from "@mantine/hooks";
import { theme } from "antd";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

const ButtonBackgroundPostition = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const colorMain = useSelector((state: RootState) => state.form.colorCore);
	const dispatch = useDispatch();

	const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);
	const { theme } = useContext(ThemeContext);

	const debounced = useDebouncedCallback(
		(position: number, type: "left" | "top") => onChangePosition(position, type),
		0
	);

	const formBackground = !!formCore.form_background?.form_background_iamge_url || false;

	const styleEffect = {
		onCheckHasBackground: (check: boolean) => {
			if (check) return "hover:cursor-pointer";
			return "hover:cursor-not-allowed";
		},
	};

	const directionX = formCore.form_background?.position?.left;
	const directionY = formCore.form_background?.position?.top;
	const onChangePosition = (position: number, type: "left" | "top") => {
		const formClone = structuredClone(formCore);
		const newForm: FormCore.Form = {
			...formClone,
			form_background: {
				...formClone.form_background,
				position: { ...formClone.form_background?.position, [type]: position },
			} as FormCore.Form["form_background"],
		};

		if (!isDesignForm) {
			setIsDesginForm(true);
		}

		dispatch(onEditForm({ form: newForm }));
	};

	return (
		<div className=" flex justify-between">
			<div className="flex w-[50%] flex-col gap-[.5rem] ">
				<span className="">Cách lề trái</span>
				<div
					className={`${styleEffect.onCheckHasBackground(
						formBackground
					)} w-[90%] flex items-center gap-[1rem] h-[3rem] p-[.2rem_1rem]
border-[.1rem] border-slate-300  rounded-lg bg-[#ffffff]`}
				>
					<input
						style={{ color: theme === "light" ? colorMain : "#000" }}
						disabled={!formBackground}
						value={directionX}
						type="number"
						className={` w-[80%] disabled:cursor-not-allowed  `}
						onChange={(e) => debounced(+e.target.value, "left")}
					/>

					<span className="opacity-75 text-[#000]">%</span>
				</div>
			</div>
			<div className="flex w-[50%] flex-col gap-[.5rem] ">
				<span className="">Cách lề trên</span>
				<div
					className={`${styleEffect.onCheckHasBackground(
						formBackground
					)} w-[90%] flex items-center gap-[1rem] h-[3rem] p-[.2rem_1rem]
border-[.1rem] border-slate-300  rounded-lg bg-[#ffffff]`}
				>
					<input
						style={{ color: theme === "light" ? colorMain : "#000" }}
						disabled={!formBackground}
						value={directionY}
						type="number"
						className={` w-[80%] disabled:cursor-not-allowed  `}
						onChange={(e) => debounced(+e.target.value, "top")}
					/>
					<span className="opacity-75 text-[#000]">%</span>
				</div>
			</div>
		</div>
	);
};

export default ButtonBackgroundPostition;
