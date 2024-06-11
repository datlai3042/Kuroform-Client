import ModelFormImage from "@/app/(NextClient)/_components/Model/ModelFormImage";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import ButtonRemoveBackgroudForm from "@/app/(NextClient)/_components/ui/button/ButtonRemoveBackgroudForm";
import ButtonSave from "@/app/(NextClient)/_components/ui/button/ButtonSave";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMouse, useMove } from "@mantine/hooks";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";

const FormBackground = () => {
	const { modeScreen, setModeScreen } = useContext(FormModeScreenContext);
	const dispatch = useDispatch();
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
	const [openModel, setOpenModel] = useState<boolean>(false);

	const onControllModel = () => {
		setOpenModel((prev) => !prev);
	};

	const onSetScreen = () => {
		if (modeScreen === "FULL") return setModeScreen("NORMAL");
		return setModeScreen("FULL");
	};

	const formBackgroundImageUrl =
		formCore.form_background?.form_background_iamge_url ||
		formCore.form_setting_default.form_background_default_url;
	const formBackgroundPosition =
		formCore.form_background?.form_background_position ||
		formCore.form_setting_default.form_background_position_default;

	const positionAvatar = formCore.form_avatar?.position;

	return (
		<React.Fragment>
			<DivNativeRef
				style={{
					backgroundImage: `url("${formBackgroundImageUrl}")`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: ` ${formBackgroundPosition?.y || 0}px ${formBackgroundPosition?.x || 0}px`,
				}}
				className="absolute inset-0 z-[2] "
			></DivNativeRef>
			{modeScreen === "NORMAL" && (
				<React.Fragment>
					<DivNative className={` flex xl:hidden absolute right-[1rem] top-[1rem]  gap-[1rem]`}>
						<DivNative className=" flex items-center justify-center " title="Review">
							<ButtonNative
								textContent={`Review ${modeScreen}`}
								className="p-[.8rem] rounded-md bg-blue-500 text-white"
								onClick={onSetScreen}
							/>
						</DivNative>

						<ButtonSave />

						<DivNative className=" flex items-center justify-center " title="Publish">
							<ButtonNative
								textContent="Publish"
								className="p-[.8rem] rounded-md bg-blue-500 text-white"
							/>
						</DivNative>
					</DivNative>
					<DivNative
						className={`${
							positionAvatar === "left" ? "right-[2rem] xl:right-[6rem]" : "left-[2rem] xl:left-[6rem]"
						} hidden group-hover:flex absolute gap-[1rem]  flex-col justify-center  bottom-[2rem] z-[3]`}
					>
						<ButtonNative
							onClick={() => setOpenModel(true)}
							textContent="Thay đổi ảnh bìa"
							className="w-[14rem] h-[3rem] sm:w-[16rem] sm:h-[4rem] px-[1rem] border-[.1rem] border-slate-150 bg-[#ffffff] rounded-lg"
						/>
						<DivNative className=" flex sm:hidden   items-center justify-center " title="Review">
							<ButtonNative
								textContent={`Review ${modeScreen}`}
								className="w-[14rem] h-[3rem] sm:w-[16rem] sm:h-[4rem] px-[1rem] rounded-md bg-blue-500 text-white"
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