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

	return (
		<React.Fragment>
			<div
				className={`
${
	formCore.form_background_state && formCore.form_background?.form_background_iamge_url
		? "xl:min-h-[40rem] max-h-[40rem]"
		: " h-[20rem]"
}   ${openFormDesign ? "!h-[30rem] !max-h-[30rem] !min-h-[30rem]" : ""}
  w-full xl:max-w-[70rem] mx-auto relative flex items-end`}
			>
				<div className="absolute h-max w-full bottom-0 flex justify-center">
					<div className="relative w-full ">
						<Image
							width={150}
							height={150}
							src={
								formCore.form_avatar?.form_avatar_url ||
								formCore.form_setting_default.form_avatar_default_url
							}
							quality={100}
							onClick={onControllModel}
							alt="avatar"
							className={`${position} ${shape} absolute top-[0] translate-y-[-50%] z-[3] object-center w-[14rem] h-[14rem] xl:w-[16rem] xl:h-[16rem] hover:cursor-pointer `}
						/>

						{(!formCore.form_background?.form_background_iamge_url || !formCore.form_background_state) && (
							<div className="absolute left-0 right-0 h-[.4rem] bg-blue-400 z-[2] top-[50%] translate-y-[-50%]"></div>
						)}
					</div>
				</div>
				{openModel && <ModelFormImage setOpenModel={setOpenModel} MODE="AVATAR" />}
			</div>
		</React.Fragment>
	);
};

export default FormAvatar;
