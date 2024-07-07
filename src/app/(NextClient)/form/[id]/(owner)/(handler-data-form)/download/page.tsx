"use client";
import { RootState } from "@/app/_lib/redux/store";
import FormAnswerService from "@/app/_services/formAnswer.service";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as XLSX from "xlsx";

import "moment/locale/vi"; // without this line it didn't work
import { FormCore, InputCore } from "@/type";
import { checkValueHref, generateValueInputAnswer, stringToSlug } from "@/app/_lib/utils";
import { addFormAnswer } from "@/app/_lib/redux/features/formAnswer.slice";
import StatusCodeResponse from "@/app/(NextClient)/_components/_StatusCodeComponent/StatusCodeResponse";
import NotFoundPage from "@/app/(NextClient)/_components/_StatusCodeComponent/NotFoundPage";
import AnswerDetailModel from "../summary/_components/AnswerDetailModel";
import { FormDataFilter } from "@/app/_lib/redux/features/dataForm.slice";
moment.locale("vi");

type TProps = {};

const DownloadFormPage = () => {
	const { form_id_current } = useSelector((state: RootState) => state.dataFormHandler);

	const formCache = useSelector((state: RootState) => state.dataFormHandler.form_cache[form_id_current]);

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const formAnswer = useSelector((state: RootState) => state.formAsnwer.formAnswerStore[form_id_current]);
	const [render, setRender] = useState<{ createAt: Date; answer: FormCore.FormAnswer.Answer[] }>();

	const [openDetailAnswer, setOpenDetailAnswer] = useState<boolean>(false);
	const [formAnswerDetail, setFormAnswerDetail] = useState<FormCore.FormAnswer.OneReport | null>(null);

	if (!formCache) return <NotFoundPage />;

	const { dataExcel, dataFormShowExcel, dataFormShowChart } = formCache;
	console.log({ dataFormShowExcel, formAnswer });

	const color = formCore.form_title.form_title_color
		? formCore.form_title.form_title_color
		: formCore.form_setting_default.form_title_color_default;
	const handleDownloadExcel = () => {
		const worksheet = XLSX.utils.json_to_sheet(dataExcel);

		let new_workSheet_col: XLSX.ColInfo[] = [];
		dataExcel.map((excel) => {
			Object.keys(excel).map((value) => {
				const length_title = value.length;
				const length_input = excel[value].length + 5;
				const width = length_input < length_title ? length_title : length_input;
				console.log({ width });
				new_workSheet_col.push({ width });
			});
		});
		worksheet["!cols"] = new_workSheet_col;
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
		const namefile = stringToSlug(formCore.form_title.form_title_value);

		XLSX.writeFile(workbook, `${namefile}.xlsx`);
	};

	return (
		<>
			{formAnswer && (
				<div className=" flex flex-col gap-[2rem] text-text-theme ">
					<button
						onClick={handleDownloadExcel}
						style={{ backgroundColor: color }}
						className="w-[16rem] h-[4rem] ml-auto flex items-center justify-center text-[#ffffff] rounded-lg "
					>
						Download File Excel
					</button>
					{/* <div
						style={{ "--scorll-form-answer-detail": color } as React.CSSProperties}
						className="scroll-form-answer-detail mb-[8rem] min-h-[8rem] overflow-y-scroll overflow-x-scroll flex flex-col xl:flex-row max-h-[37rem] max-w-full xl:max-h-[30rem]"
					>
						{formAnswer &&
							Object.keys(dataFormShowChart).map((dt, i) => {
								const type = dt.split("_#_")[1] as InputCore.InputForm["type"];
								return (
									<div
										key={dt + i}
										className="flex flex-col gap-[3rem] w-max border-[.1rem] border-gray-500 h-max mb-[2rem]"
									>
										{" "}
										<h3 className="text-[2.4rem] font-medium  border-[.1rem] border-gray-500  p-[2rem]">
											{dataFormShowChart[dt][0]?.title}
										</h3>
										<div className=" flex flex-col gap-[.8rem] max-h-[40rem]  pb-[.8rem] ">
											{dataFormShowChart[dt].map((info, i) => {
												const value =
													typeof info.value === "string" ? info.value : info.value.join(", ");
												return (
													<div
														id={info.form_answer_id}
														key={info._id + i}
														onClick={() => {
															setFormAnswerDetail(() => {
																return formAnswer.formAnswer.reports.filter(
																	(fans) => fans._id === info.form_answer_id
																)[0];
															});
															setOpenDetailAnswer(true);
														}}
														className={`
															min-w-[30rem] w-max px-[1rem] min-h-[4rem] flex items-center justify-between  hover:cursor-pointer hover:bg-color-main hover:text-[#fff]`}
													>
														{checkValueHref(value) ? (
															<a href={value} target="_blank">
																{value}
															</a>
														) : (
															<span className="min-w-[30%]  truncate xl:break-words leading-10">
																{value || "Người dùng không nhập dữ liệu"}
															</span>
														)}
													</div>
												);
											})}
										</div>
									</div>
								);
							})}{" "}
					</div> */}
					{openDetailAnswer && formAnswerDetail && (
						<AnswerDetailModel
							setOpenModel={setOpenDetailAnswer}
							formAnswer={formAnswerDetail}
							time={formAnswerDetail.createdAt}
						/>
					)}
				</div>
			)}

			{!formAnswer && <NotFoundPage gap="2rem" />}
		</>
	);
};

export default DownloadFormPage;
