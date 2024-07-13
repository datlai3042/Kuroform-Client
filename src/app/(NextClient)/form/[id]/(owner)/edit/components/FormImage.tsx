import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import React, { useContext } from "react";
import FormBackground from "./FormBackground";
import FormAvatar from "./FormAvatar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";

const FormImage = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
	const { openFormDesign } = useContext(FormDesignContext);

	// const styleEffect = {
	// 	onCheckBackground: (check: boolean) => {
	// 		if (check) return  ";
	// 		return "min-h-[20rem]";
	// 	},
	// };

	return (
		<DivNative
			className={`${
				openFormDesign && formCore.form_background_state && formCore.form_background?.form_background_iamge_url
					? "xl:min-h-[40rem] max-h-[40rem]"
					: "xl:min-h-[31rem] max-h-[31rem]"
			} h-[23rem]  group  relative w-full  xl:h-max px-[4rem] xl:px-0`}
		>
			{(formCore.form_background || formCore.form_background_state) && <FormBackground />}

			{(formCore.form_avatar || formCore.form_avatar_state) && <FormAvatar />}
		</DivNative>
	);
};

export default FormImage;
