import { RootState } from "@/app/_lib/redux/store";
import useGetAllFormState from "@/app/hooks/form/useGetAllFormState";
import useGetAllFormUser from "@/app/hooks/useGetAllFormUser";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const DashboardTotalForm = () => {
	const { forms, pending, success } = useGetAllFormUser();
	useGetAllFormState();

	const form_delete = useSelector((state: RootState) => state.form.form_delete);
	const form_public = useSelector((state: RootState) => state.form.form_public);
	const form_private = useSelector((state: RootState) => state.form.form_private);

	return (
		<div className="relative w-full h-full bg-[#28439d] rounded-lg p-[1rem] xl:p-[3rem] flex flex-col     gap-[.5rem] xl:gap-[1rem] text-[#fff]">
			<div className="flex items-center">
				<p className="w-full  break-words ">Tổng sô Form hiện có</p>
				<p className="text-[4rem] xl:text-[4rem]">{forms.length}</p>
			</div>

			<div className="w-full flex flex-col justify-center">
				<p>Form công khai: {form_public}</p>
				<p>Form riêng tư: {form_private}</p>
				<p>Form ở thùng rác tạm thời: {form_delete}</p>
			</div>

			<div className="absolute bottom-[2rem] right-[2rem]">
				<Image
					src={"/assets/images/icon/form/form_sub.png"}
					width={20}
					height={20}
					alt="avatar"
					unoptimized={true}
					className="w-[6rem] h-[6rem] rounded-full"
				/>
			</div>
		</div>
	);
};

export default DashboardTotalForm;
