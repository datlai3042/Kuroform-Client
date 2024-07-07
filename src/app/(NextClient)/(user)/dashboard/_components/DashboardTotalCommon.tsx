import { RootState } from "@/app/_lib/redux/store";
import useGetAllFormState from "@/app/hooks/form/useGetAllFormState";
import React from "react";
import { useSelector } from "react-redux";

const DashboardTotalCommon = () => {
	const _ = useGetAllFormState();

	const form_delete = useSelector((state: RootState) => state.form.form_delete);
	const form_public = useSelector((state: RootState) => state.form.form_public);
	const form_private = useSelector((state: RootState) => state.form.form_private);

	return (
		<div className="w-full h-full bg-red-500 rounded-lg p-[1rem] xl:p-[1rem] flex flex-col   justify-center gap-[.5rem] xl:gap-[1rem] text-[1.3rem]">
			{/* <p className="text-[4rem] xl:text-[10rem]">100</p> */}
			{/* <p className="w-full xl:max-w-[30%] break-words ">Tổng sô Form hiện có</p> */}
			<p>Form công khai: {form_public}</p>
			<p>Form riêng tư: {form_private}</p>
			<p>Form ở thùng rác tạm thời: {form_delete}</p>
		</div>
	);
};

export default DashboardTotalCommon;
