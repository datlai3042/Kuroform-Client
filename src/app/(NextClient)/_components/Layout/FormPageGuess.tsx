import { FormCore, InputCore } from "@/type";
import Image from "next/image";
import React, { useContext, useMemo, useState } from "react";
import DivNative from "../ui/NativeHtml/DivNative";
import ButtonNative from "../ui/NativeHtml/ButtonNative";
import { renderStyleTitleCore } from "@/app/_lib/utils";
import FormAnswerProvider, { FormAnswerContext } from "../provider/FormAnswerProvider";
import SliderImage from "../Model/SliderImage";
import Portal from "../Portal";
import InputEmailAnswer from "../../form/[id]/_components/InputAnswer/_email/InputEmailAnswer";
import InputTextAnswer from "../../form/[id]/_components/InputAnswer/_text/InputTextAnswer";
import { checkErrorFinal } from "../../form/[id]/_components/InputAnswer/_utils/formAnswer.uti";
import RenderInputAnswers from "../../form/[id]/_components/RenderInputAnswers";
import FormAnswerHeader from "../../form/[id]/_components/FormAnswerHeader";

type TProps = {
	FormCore: FormCore.Form;
};

const generateInputAnswer = (Inputs: InputCore.InputForm[], formCore: FormCore.Form): React.ReactNode => {
	return Inputs.map((ip) => {
		switch (ip.type) {
			case "EMAIL":
				return <InputEmailAnswer inputItem={ip} formCore={formCore} key={ip._id} />;
			case "TEXT":
				return <InputTextAnswer inputItem={ip} formCore={formCore} key={ip._id} />;
		}
	});
};

const FormPageGuess = (props: TProps) => {
	const { FormCore } = props;
	const {
		formAnswer: { inputFormData, inputFormErrors, inputFormRequire },
		setFormAnswer,
	} = useContext(FormAnswerContext);

	const [page, setPage] = useState<number>(1);

	const colorMain = FormCore.form_title.form_title_color || FormCore.form_setting_default.form_title_color_default;

	const renderInputAnswer = useMemo(() => generateInputAnswer(FormCore.form_inputs, FormCore), [FormCore]);
	const formBackgroundImageUrl =
		FormCore.form_background?.form_background_iamge_url ||
		FormCore.form_setting_default.form_background_default_url;
	const formBackgroundPosition = FormCore.form_background?.position;

	const modeAvatar = FormCore.form_avatar?.mode_shape || FormCore.form_setting_default.form_avatar_default_mode;
	const positionAvatar = FormCore.form_avatar?.position || FormCore.form_setting_default.form_avatar_default_postion;

	const numberInputAPage = 3;
	const allInputAnswer = useMemo(
		() => generateInputAnswer(FormCore.form_inputs, FormCore),
		[FormCore]
	) as React.ReactNode[];
	const totalPage = Math.ceil(allInputAnswer.length / numberInputAPage);

	const generateInputWithPage = { start: numberInputAPage * (page - 1), end: numberInputAPage * page };

	const styleEffect = {
		formMarginTop: (check: boolean) => {
			if (check) return "mt-[6rem]";
			return "mt-0";
		},
		onCheckModeAvatar: (mode: FormCore.FormAvatarMode) => {
			if (mode === "circle") return "rounded-full";
			return "";
		},

		onCheckPositionAvatar: (position: FormCore.FormAvatarPosition) => {
			if (position === "left") return "left-[calc(25%-6.4rem)] ";
			if (position === "center") return "left-[50%] translate-x-[-50%]";
			return "right-[calc(25%-6.4rem)]";
		},
	};

	const handleSubmit = () => {
		const checkRequire = inputFormRequire.every((ip) => ip.checkRequire);
		if (checkRequire && inputFormErrors.length === 0) {
			const answers = inputFormData.map((ip) => {
				if (ip.setting) delete ip.setting;
				return ip;
			});

			const payload = {
				form_id: FormCore._id,
				form_owner: FormCore.form_owner,
				answers,
			};

			setFormAnswer((prev) => ({ ...prev, submitState: "pending" }));

			return
		}

		let inputErrorArray: FormCore.FormAnswer.InputFormError[] = [];
		inputErrorArray = checkErrorFinal(inputErrorArray, inputFormErrors, inputFormData);
		if (inputErrorArray.length > 0) {
			setFormAnswer((prev) => ({ ...prev, inputFormErrors: inputErrorArray, openModelError: true }));
		}
	};

	const checkMode: FormCore.FormTitle["form_title_mode_image"] = "Slider";

	let flag = false;

	return (
		<div className="px-[2rem] xl:px-0 min-h-screen h-max flex justify-center  p-[2rem] bg-formCoreBgColor  ">
			<DivNative className="w-full sm:w-[66.8rem] flex flex-col gap-[4rem] ">
				<DivNative className="relative w-full min-h-[20rem] aspect-[3.01/1]">
					<FormAnswerHeader formCore={FormCore} />
				</DivNative>
				<DivNative
					className={`${styleEffect.formMarginTop(
						FormCore.form_avatar_state
					)} w-full flex flex-col gap-[3rem] rounded-lg`}
				>
					<DivNative className="flex flex-col gap-[3rem]">
						<FormAnswerProvider formCore={FormCore} form_answer_id="">
							<RenderInputAnswers formCore={FormCore} />
						</FormAnswerProvider>
					</DivNative>
				</DivNative>
			</DivNative>
		</div>
	);
};

export default FormPageGuess;
