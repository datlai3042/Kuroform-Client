import { RootState } from "@/app/_lib/redux/store";
import useGetFormTotalView from "@/app/hooks/form/useGetFormTotalView";
import useGetTotalFormAnswer from "@/app/hooks/form/useGetTotalFormAnswer";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const DashboardTotalView = () => {
	const data = useGetFormTotalView();
	const response = useGetTotalFormAnswer();

	const total_views = useSelector((state: RootState) => state.formAsnwer.form_total_views);
	const total_answer = useSelector((state: RootState) => state.formAsnwer.form_total_answers);

	return (
		<div className="relative w-full h-full bg-[#bf2c68] rounded-lg p-[1rem] xl:p-[3rem] flex flex-col gap-[.5rem] xl:gap-[1rem]">
			<div className="w-full flex  gap-[2rem]">
				<p className="flex flex-col gap-[1rem] h-max w-full text-[1.3rem]">
					<span className="w-full break-words ">Tổng sô lượt xem Form: {total_views}</span>
					<span className="w-full break-words r">Số lượt phản hồi: {total_answer}</span>

					<span className="w-full break-words r">
						Tỉ lệ: {((total_answer / total_views) * 100).toFixed(2) || 0}%
					</span>
				</p>
			</div>

			<div className="absolute bottom-[2rem] right-[2rem]">
				<Image
					src={"/assets/images/icon/form/views.png"}
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

export default DashboardTotalView;
