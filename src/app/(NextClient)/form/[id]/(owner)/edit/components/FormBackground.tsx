import { FormCore } from "@/type";
import { RootState } from "@/app/_lib/redux/store";

import React, { useContext, useState } from "react";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";

import ModelFormImage from "@/app/(NextClient)/_components/Model/ModelFormImage";
import ButtonSave from "@/app/(NextClient)/_components/ui/button/ButtonSave";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";

import { useSelector } from "react-redux";
import { generateStyleBackgroundImageForm } from "@/app/utils/form.utils";
import Image from "next/image";
import ButtonDarkMode from "@/app/(NextClient)/_components/ui/button/ButtonDarkMode";

const FormBackground = () => {
	const { modeScreen, setModeScreen } = useContext(FormModeScreenContext);
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
	const [openModel, setOpenModel] = useState<boolean>(false);

	const onControllModel = () => {
		setOpenModel((prev) => !prev);
	};

	const formBackgroundColor = formCore.form_background?.backgroundColor || "";

	const onSetScreen = () => {
		if (modeScreen === "FULL") return setModeScreen("NORMAL");
		return setModeScreen("FULL");
	};

	const myBackgroundStyle = generateStyleBackgroundImageForm({ formCore, mode: "edit" });

	const paddingX = formCore.form_background?.padding.x;
	const paddingY = formCore.form_background?.padding.y;

	const padding = `${paddingY}% ${paddingX}%`;

	return (
		<React.Fragment>
			<DivNativeRef
				onClick={() => setOpenModel(true)}
				className="absolute inset-0 z-[2]  hover:cursor-pointer max-h-[40rem] overflow-hidden"
			>
				<div
					style={{ backgroundColor: formBackgroundColor, padding }}
					className="relative inset-0 min-h-full  w-full overflow-hidden "
				>
					<Image
						src={
							formCore.form_background?.form_background_iamge_url ||
							formCore.form_setting_default.form_background_default_url
						}
						width={800}
						height={160}
						quality={100}
						style={myBackgroundStyle.style_background}
						alt="form background"
						className="absolute w-full h-full max-h-[40rem]   rounded-lg"
					/>
				</div>
			</DivNativeRef>
			{modeScreen === "NORMAL" && (
				<React.Fragment>
					<DivNative className={` flex xl:hidden absolute right-[1rem] top-[1rem]  gap-[1rem]`}>
						<DivNative className=" flex items-center justify-center " title="Review">
							<ButtonNative
								textContent={`Review ${modeScreen}`}
								className="p-[.8rem] rounded-md bg-color-main text-text-theme"
								onClick={onSetScreen}
							/>
						</DivNative>

						<ButtonSave />

						<DivNative className=" flex items-center justify-center " title="Publish">
							<ButtonNative
								textContent="Publish"
								className="p-[.8rem] rounded-md bg-color-main text-bg-input-theme"
							/>
						</DivNative>
					</DivNative>
					<DivNative
						className={`${myBackgroundStyle.position_buttn} hidden group-hover:flex absolute gap-[1rem]  flex-col justify-center  bottom-[8rem] xl:bottom-[2rem] z-[3]`}
					>
						<div className="block xl:hidden">
							<ButtonDarkMode />
						</div>
						<ButtonNative
							onClick={() => setOpenModel(true)}
							textContent="Thay đổi ảnh bìa"
							className="w-[14rem] h-[3rem] sm:w-[16rem] sm:h-[4rem] px-[1rem] border-[.1rem] border-slate-150 bg-[#ffffff] rounded-lg text-[#000]"
						/>
						<DivNative className=" flex sm:hidden   items-center justify-center " title="Review">
							<ButtonNative
								textContent={`Review ${modeScreen}`}
								className="w-[14rem] h-[3rem] sm:w-[16rem] sm:h-[4rem] px-[1rem] rounded-md bg-color-main text-bg-input-theme"
								onClick={onSetScreen}
							/>
						</DivNative>
					</DivNative>
				</React.Fragment>
			)}
			{openModel && <ModelFormImage setOpenModel={setOpenModel} MODE="COVER" />}
		</React.Fragment>
	);
};

export default FormBackground;
