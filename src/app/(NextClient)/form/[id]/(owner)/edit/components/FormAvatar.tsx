import ModelFormImage from "@/app/(NextClient)/_components/Model/ModelFormImage";
import { FormCore } from "@/type";
import { RootState } from "@/app/_lib/redux/store";

import { generateStyleAvatarForm } from "@/app/utils/form.utils";

import Image from "next/image";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";

const FormAvatar = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
	const { openFormDesign } = useContext(FormDesignContext);

	const [openModel, setOpenModel] = useState<boolean>(false);

	const onControllModel = () => {
		setOpenModel((prev) => !prev);
	};

	const { position, shape } = generateStyleAvatarForm({
		formCore,
	});

	const positionAbsoluteImage = openFormDesign ? "translate-y-[50%] xl:xl:translate-y-0 " : "translate-y-[50%] ";

	return (
		<React.Fragment>
			<div
				className={`${
					openFormDesign ? "xl:min-h-[31rem] xl:max-h-[31rem]" : "xl:min-h-[40rem] max-h-[40rem]"
				} h-[23rem] xl:min-h-[40rem]  w-full xl:max-w-[70rem] mx-auto relative`}
			>
				<Image
					width={150}
					height={150}
					src={formCore.form_avatar?.form_avatar_url || formCore.form_setting_default.form_avatar_default_url}
					quality={100}
					onClick={onControllModel}
					alt="avatar"
					className={`${position} ${shape} ${positionAbsoluteImage} absolute bottom-0 z-[3] object-center w-[14rem] h-[14rem] xl:w-[16rem] xl:h-[16rem] hover:cursor-pointer `}
				/>
				{openModel && <ModelFormImage setOpenModel={setOpenModel} MODE="AVATAR" />}
			</div>
		</React.Fragment>
	);
};

export default FormAvatar;
