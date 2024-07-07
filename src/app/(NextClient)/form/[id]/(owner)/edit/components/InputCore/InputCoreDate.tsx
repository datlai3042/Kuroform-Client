import { RootState } from "@/app/_lib/redux/store";
import { FormCore, InputCore as TInputCore, UI } from "@/type";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputCore from "./InputCore";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import Calendar from "@/app/(NextClient)/test/calendar/Calendar";
import { generateFullDateString } from "@/app/utils/time.utils";
import { CalendarCheckIcon } from "lucide-react";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";

type TProps = {
	inputItem: TInputCore.InputDate.InputTypeDate;
};

const InputCoreDate = (props: TProps) => {
	const { inputItem } = props;
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
	const form_mode_display = formCore.form_mode_display === "custom";

	const [openModel, setOpenModel] = useState<boolean>(false);

	const date = new Date();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const year = date.getFullYear();
	const [pickDate, setPickDate] = useState({
		day,
		month,
		year,
		date_string: generateFullDateString({ day, month, year }),
	});

	const handleOnChange = (value: UI.Calender.Event.DateResult) => {
		const { day, month, date_string, year } = value;
		setPickDate({ day, month, year, date_string });
		setOpenModel(false);
	};

	const actionCancle = () => {
		setOpenModel(false);
		setPickDate({ day, month, year, date_string: generateFullDateString({ day, month, year }) });
	};

	const InputDate = (
		<DivNative className="relative flex flex-col items-start gap-[1rem] text-text-theme ">
			<button
				onClick={() => setOpenModel((prev) => !prev)}
				className="border-[.1rem] border-text-theme p-[1rem] rounded-xl flex items-center gap-[1rem]"
			>
				<span>{pickDate.date_string}</span>
				<CalendarCheckIcon />
			</button>
			{openModel && (
				<div className="absolute z-[3] bottom-[-44rem] left-0">
					<ClickOutSide setOpenModel={setOpenModel}>
						<Calendar onChange={handleOnChange} callbackCancel={actionCancle} />
					</ClickOutSide>
				</div>
			)}
			<p>
				Thời gian bạn chọn là:
				<span> {pickDate.date_string}</span>
			</p>
		</DivNative>
	);

	return (
		<InputCore
			InputComponent={InputDate}
			inputItem={inputItem}
			inputTitle={inputItem.input_title || ""}
			dataTextTitle="Thêm mô tả về ngày được chọn"
		/>
	);
};

export default InputCoreDate;
