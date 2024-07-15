import Portal from "@/app/(NextClient)/_components/Portal";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import ButtonNativeIcon from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNativeIcon";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import { InputCore, ReactCustom } from "@/type";
import {
	ALargeSmall,
	AtSign,
	Baseline,
	CalendarDays,
	Check,
	CheckCheck,
	CircleHelp,
	ListChecks,
	ListTodo,
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

type TProps = {
	setOpenModel: React.Dispatch<SetStateAction<boolean>>;

	inputItem: InputCore.InputForm;
};

type ButtonInputType = { type: InputCore.InputForm["type"] | "Guide"; Icon: React.ReactNode; content: string };
type TInputIntroduce = ButtonInputType["type"] | "Guide";
const buttons: ButtonInputType[] = [
	{ type: "Guide", Icon: <CircleHelp className="" size={18} />, content: "Hướng dẫn" },
	{
		type: "EMAIL",
		Icon: <AtSign size={18} />,
		content: "Email",
	},
	{
		type: "TEXT",
		Icon: <Baseline size={18} />,
		content: "Thông tin",
	},
	{
		type: "VOTE",
		Icon: <Star size={18} />,
		content: "Đánh giá",
	},
	{
		type: "PHONE",
		Icon: <PhoneOutgoing size={18} />,
		content: "Số điện thoại",
	},
	{
		type: "OPTION",
		Icon: <Check size={18} />,
		content: "Một lựa chọn",
	},
	{
		type: "OPTION_MULTIPLE",
		Icon: <CheckCheck size={18} />,
		content: "Nhiều lựa chọn",
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

	const modelRef = useRef<HTMLDivElement | null>(null);
	const checkDocumentClick = useCallback(
		(e: MouseEvent) => {
			if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
				console.log("check");
				setOpenModel(false);
			}
		},
		[setOpenModel]
	);

	useEffect(() => {
		document.addEventListener("click", checkDocumentClick);

		return () => {
			document.removeEventListener("click", checkDocumentClick);
		};
	}, [checkDocumentClick]);

	return (
		<Portal>
			<DivNative className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[999] px-[1rem] flex justify-center items-center">
				<DivNativeRef
					className="relative w-[80rem] min-h-[40rem] h-max xl:w-[80rem] xl:h-[68rem]  flex flex-col bg-color-section-theme text-text-theme rounded-lg border-[.1rem] border-text-theme "
					ref={modelRef}
				>
					<DivNative className="flex-1 w-full min-h-full flex  ">
						<DivNative className=" w-[40%] xl:w-[30%] h-full p-[1rem_.6rem] xl:p-[2rem_1.4rem] flex flex-col gap-[1rem] border-r-[.1rem] border-gray-50 ">
							<ParagraphNative
								className="text-textGray text-[1.2rem] font-bold opacity-80"
								textContent="Input"
							/>
							<DivNative className="flex flex-col gap-[1.2rem] ">
								{buttons.map((btn) => (
									<ButtonNativeIcon
										key={btn.content + btn.type}
										className="w-full p-[.4rem_.6rem]  flex items-center justify-start gap-[2rem] text-[1.6rem] hover:bg-text-theme hover:text-color-section-theme transition-colors duration-300"
										onClick={() => setInputIntroduce(btn.type)}
										textContent={btn.content}
										icon={btn.Icon}
									/>
								))}
							</DivNative>
						</DivNative>
						<DivNative className="flex w-[65%] xl:w-[70%] h-full py-[2rem] ">
							{renderInputIntroduce}
						</DivNative>
					</DivNative>
					<div className="absolute right-[-2.4rem] top-[-2.4rem]">
						<IconClose onClose={setOpenModel} />
					</div>
				</DivNativeRef>
			</DivNative>
		</Portal>
	);
};

export default InputIntroduceWrapper;
