import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import FormEmpty from "./FormEmpty";
import DashboardPagination from "../DashboardPagination";
import DashboardFormItem from "./DashboardFormItem";
import useGetFormPagination from "@/app/hooks/form/useGetFormPagination";
import { LIMIT_PAGINATION_FORM } from "@/app/_constant/api.constant";
import LoadingClient from "@/app/(NextClient)/_components/LoadingClient";
import LoadingArea from "@/app/(NextClient)/_components/ui/loading/LoadingArea";

moment.locale("vi");

const DashboardForms = () => {
	const [page, setPage] = useState<number>(1);
	const getFormPagination = useGetFormPagination({ page, limit: LIMIT_PAGINATION_FORM });

	return (
		<DivNative className="my-[2rem] w-full min-h-[40rem] h-max  flex flex-col gap-[0rem] p-0 bg-color-gap-empty">
			<div className="flex flex-col gap-[1rem]">
				<p className="text-color-main font-bold text-[2rem]">Quản lí Form</p>
				{!getFormPagination.isPending &&
					getFormPagination.isSuccess &&
					getFormPagination.data.metadata.forms.length > 0 && (
						<DivNative className={`flex flex-wrap justify-between gap-[2rem] pb-[2rem] text-[1.3rem]`}>
							{getFormPagination.data.metadata.forms.map((form, index) => (
								<div className="w-full xl:w-[49%]" key={form._id}>
									<DashboardFormItem form={form} />
								</div>
							))}
						</DivNative>
					)}
			</div>
			{getFormPagination.isPending && (
				<div className="w-full min-h-[6rem]">
					<LoadingClient width="w-full" height="h-[50rem]" message="Đang lấy thông tin Form" />
				</div>
			)}

			{getFormPagination.isSuccess && getFormPagination.data.metadata.total_page > 0 && (
				<DashboardPagination
					page={page}
					setPage={setPage}
					total_page={getFormPagination.data?.metadata.total_page || 1}
				/>
			)}

			{getFormPagination.isSuccess && getFormPagination.data.metadata.forms.length === 0 && (
				<div className="w-full h-full flex items-center justify-center ">
					<FormEmpty />
				</div>
			)}
		</DivNative>
	);
};

export default DashboardForms;
