import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { FormCore } from "@/type";
import moment from "moment";
import React, { SetStateAction } from "react";
import DashboardFormItem from "../DashboardFormItem";

type TProps = {
	forms: FormCore.Form[];
	date_full: string;
	setOpenModel: React.Dispatch<SetStateAction<boolean>>;
};

const DashboardFilterDetails = (props: TProps) => {
	const { forms, date_full, setOpenModel } = props;

	return (
		<div className="fixed top-[0] right-[0rem] z-[100] bg-[rgba(0,0,0,.2)] w-screen h-screen flex items-center justify-center">
			<ClickOutSide setOpenModel={setOpenModel}>
				<div className=" text-text-theme w-[36rem] min-h-[26rem] flex flex-col gap-[2rem] p-[2rem_1rem_3rem]  bg-color-section-theme rounded-lg">
					<p className="py-[1rem] w-full text-center">
						Dữ liệu ngày {moment(date_full).format("DD-MMMM-YYYY").toUpperCase()}
					</p>
					<div className="max-h-[32rem] overflow-y-scroll scroll-color-main w-full flex flex-col items-center gap-[2rem]">
						{forms.map((form) => (
							<DashboardFormItem form={form} key={form._id} />
						))}
					</div>
				</div>
			</ClickOutSide>
		</div>
	);
};

export default DashboardFilterDetails;
