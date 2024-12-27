import Portal from "@/app/(NextClient)/_components/Portal";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import ButtonNativeIcon from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNativeIcon";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import { InputCore, ReactCustom } from "@/type";
import {
	ALargeSmall,
	Anchor,
	AtSign,
	Baseline,
	CalendarDays,
	Check,
	CheckCheck,
	CircleHelp,
	ListChecks,
	ListTodo,
	MapPinned,
	PhoneOutgoing,
	Star,
	Upload,
} from "lucide-react";
import React, { SetStateAction, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import InputGuideIntroduce from "./InputGuideIntroduce";
import InputTextIntroduce from "../InputCore/_text/InputTextIntroduce";
import InputEmailIntroduce from "../InputCore/_email/InputEmailIntroduce";
import InputOptionIntroduce from "../InputCore/_option/InputOptionIntrudce";
import InputOptionMultipleIntroduce from "../InputCore/_options/InputOptionMultipleIntroduce";
import InputDateIntroduce from "../InputCore/_date/InputDateIntroduce";
import InputVoteIntroduce from "../InputCore/_vote/InputVoteIntroduce";
import InputPhoneIntroduce from "../InputCore/_phone/InputPhoneIntroduce";
import Image from "next/image";
import InputImageIntroduce from "../InputCore/_image/InputImageIntroduct";
import IconClose from "@/app/(NextClient)/_components/ui/input/IconClose";
import InputAddressIntroduce from "../InputCore/_address/InputAddressIntroduce";
import InputAnchorIntroduce from "../InputCore/_anchor/InputAnchorIntroduce";
import {
	inputIntroduceAddress,
	inputIntroduceEmail,
	inputIntroduceOption,
	inputIntroduceOptionMultiple,
	inputIntroducePhone,
	inputIntroduceText,
	inputIntroduceVote,
} from "@/app/_constant/inputIntroduceUI.constant";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";

type TProps = {
	setOpenModel: React.Dispatch<SetStateAction<boolean>>;

	inputItem: InputCore.InputForm;
};

type ButtonInputType = { type: InputCore.InputForm["type"] | "Guide"; Icon: React.ReactNode; content: string };
const buttons: ButtonInputType[] = [
	{ type: "Guide", Icon: <CircleHelp className="" size={18} />, content: "Hướng dẫn" },
	{
		type: "EMAIL",
		Icon: <AtSign size={18} />,
		content: inputIntroduceEmail.title,
	},
	{
		type: "TEXT",
		Icon: <Baseline size={18} />,
		content: inputIntroduceText.title,
	},
	{
		type: "VOTE",
		Icon: <Star size={18} />,

		content: inputIntroduceVote.title,
	},
	{
		type: "PHONE",
		Icon: <PhoneOutgoing size={18} />,
		content: inputIntroducePhone.title,
	},

	{
		type: "ADDRESS",
		Icon: <MapPinned size={18} />,
		content: inputIntroduceAddress.title,
	},

	{
		type: "ANCHOR",
		Icon: <Anchor size={18} />,

		content: "Liên kết",
	},
	{
		type: "OPTION",
		Icon: <Check size={18} />,
		content: inputIntroduceOption.title,
	},
	{
		type: "OPTION_MULTIPLE",
		Icon: <CheckCheck size={18} />,
		content: inputIntroduceOptionMultiple.title,
	},
	{ type: "DATE", Icon: <CalendarDays className="" size={18} />, content: "Thời gian" },
	{ type: "FILE_IMAGE", Icon: <Upload className="" size={18} />, content: "Upload Ảnh" },
];

const chooseInputIntroduce = (
	type: ButtonInputType["type"],
	inputItem: InputCore.InputForm,
	setOpenModel: ReactCustom.SetStateBoolean
) => {
	switch (type) {
		case "Guide":
			return <InputGuideIntroduce />;
		case "TEXT":
			return (
				<InputTextIntroduce
					inputItem={inputItem as InputCore.InputText.InputTypeText}
					setOpenModel={setOpenModel}
				/>
			);

		case "EMAIL":
			return (
				<InputEmailIntroduce
					inputItem={inputItem as InputCore.InputEmail.InputTypeEmail}
					setOpenModel={setOpenModel}
				/>
			);

		case "VOTE":
			return (
				<InputVoteIntroduce
					inputItem={inputItem as InputCore.InputVote.InputTypeVote}
					setOpenModel={setOpenModel}
				/>
			);

		case "PHONE":
			return (
				<InputPhoneIntroduce
					inputItem={inputItem as InputCore.InputPhone.InputTypePhone}
					setOpenModel={setOpenModel}
				/>
			);

		case "DATE":
			return (
				<InputDateIntroduce
					inputItem={inputItem as InputCore.InputDate.InputTypeDate}
					setOpenModel={setOpenModel}
				/>
			);

		case "FILE_IMAGE":
			return (
				<InputImageIntroduce
					inputItem={inputItem as InputCore.InputImage.InputTypeImage}
					setOpenModel={setOpenModel}
				/>
			);

		case "ADDRESS":
			return (
				<InputAddressIntroduce
					inputItem={inputItem as InputCore.InputAddress.InputTypeAddress}
					setOpenModel={setOpenModel}
				/>
			);

		case "ANCHOR":
			return (
				<InputAnchorIntroduce
					inputItem={inputItem as InputCore.InputAnchor.InputTypeAnchor}
					setOpenModel={setOpenModel}
				/>
			);
		case "OPTION":
			return (
				<InputOptionIntroduce
					inputItem={inputItem as InputCore.InputOption.InputTypeOption}
					setOpenModel={setOpenModel}
				/>
			);

		case "OPTION_MULTIPLE":
			return (
				<InputOptionMultipleIntroduce
					inputItem={inputItem as InputCore.InputOptionMultiple.InputTypeOptionMultiple}
					setOpenModel={setOpenModel}
				/>
			);

		default:
			return <InputGuideIntroduce />;
	}
};

const InputIntroduceWrapper = (props: TProps) => {
	const { inputItem, setOpenModel } = props;

	const [inputIntroduce, setInputIntroduce] = useState<ButtonInputType["type"]>("Guide");

	const renderInputIntroduce = useMemo(
		() => chooseInputIntroduce(inputIntroduce, inputItem, setOpenModel),
		[inputIntroduce, inputItem, setOpenModel]
	);

	return (
		<Portal>
			<DivNative className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[999] px-[1rem] flex justify-center items-center">
				<DivNativeRef className="relative w-[80rem]  xl:w-[80rem] h-[50rem] overflow-y-auto   flex flex-col bg-color-section-theme text-text-theme rounded-lg border-[.1rem] border-gray-300  ">
					<ClickOutSide
						width="w-full xl:w-[80rem]"
						height="h-[64rem] xl:h-[68rem]"
						setOpenModel={setOpenModel}
					>
						<>
							<DivNative className="flex-1 w-full min-h-full flex  ">
								<DivNative className=" min-w-[16rem] min-h-full p-[1rem_.6rem] xl:p-[2rem_1.4rem] flex flex-col gap-[1rem] border-r-[.1rem] border-gray-300 ">
									<ParagraphNative
										className="text-textGray text-[1.2rem] font-bold opacity-80"
										textContent="Input"
									/>
									<DivNative className="flex flex-col gap-[1.2rem] ">
										{buttons.map((btn) => (
											<ButtonNativeIcon
												key={btn.content + btn.type}
												className="w-full p-[.4rem_.6rem]  flex items-center justify-start gap-[2rem] text-[1.5rem] xl:text-[1.6rem] hover:bg-color-btn-primarily text-text-theme hover:text-[#fff] transition-colors duration-300 rounded-lg"
												onClick={() => setInputIntroduce(btn.type)}
												textContent={btn.content}
												icon={btn.Icon}
											/>
										))}
									</DivNative>
								</DivNative>
								<DivNative className="flex w-max min-h-full py-[1rem] ">
									{renderInputIntroduce}
								</DivNative>
							</DivNative>
							<div className="absolute right-[1rem] top-[1rem] xl:right-[-2.4rem] xl:top-[-2.4rem]">
								<IconClose onClose={setOpenModel} />
							</div>
						</>
					</ClickOutSide>
				</DivNativeRef>
			</DivNative>
		</Portal>
	);
};

export default InputIntroduceWrapper;
