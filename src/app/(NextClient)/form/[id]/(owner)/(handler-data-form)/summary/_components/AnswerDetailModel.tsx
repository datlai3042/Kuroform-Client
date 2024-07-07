import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import Portal from "@/app/(NextClient)/_components/Portal";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import { Clock, X } from "lucide-react";
import moment from "moment";
import React, { SetStateAction } from "react";
import { useSelector } from "react-redux";

import "moment/locale/vi"; // without this line it didn't work
import { checkValueHref, generateValueInputAnswer } from "@/app/_lib/utils";
moment.locale("vi");

type TProps = {
	formAnswer: FormCore.FormAnswer.OneReport;
	setOpenModel: React.Dispatch<SetStateAction<boolean>>;
	time: Date;
};

const AnswerDetailModel = (props: TProps) => {
	const { formAnswer, time, setOpenModel } = props;
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

	const color = formCore.form_title.form_title_color
		? formCore.form_title.form_title_color
		: formCore.form_setting_default.form_title_color_default;

	return (
		<Portal>
			<div className="fixed z-[200] inset-0 max-w-full overflow-hidden  flex items-center justify-center bg-[rgba(0,0,0,.6)] hover:cursor-pointer">
				<ClickOutSide setOpenModel={setOpenModel}>
					<div className="relative w-[28rem] xl:w-[50rem] min-h-[20rem] h-max mx-auto px-[2rem] py-[3rem] bg-color-section-theme text-text-theme rounded-lg">
						<h3 style={{ color }} className="mb-[2rem] text-center font-medium text-[2.4rem]">
							{formCore.form_title.form_title_value}
						</h3>
						<div
							style={{ "--scorll-form-answer-detail": color } as React.CSSProperties}
							className="scroll-form-answer-detail w-full max-h-[50rem] pb-[1rem]  overflow-y-scroll p-[3rem] flex flex-col gap-[3rem]   rounded-lg"
						>
							{formAnswer.answers.map((fans) => {
								const input_value = generateValueInputAnswer(fans) || "Trường này không có dữ liệu";
								const input_title = fans.title || `${fans.type}_#${fans._id}`;
								const checkHttps = checkValueHref(input_value);
								return (
									<div
										key={fans._id}
										className="flex flex-col gap-[2.4rem] pb-[1rem] border-b-[.1rem] border-gray-200"
									>
										<h4 className="text-[1.5rem] font-medium flex flex-col gap-[.2rem]">
											<span className="max-w-full break-words">{input_title}</span>

											{fans.title.length === 0 && (
												<span className="text-[1.2rem] opacity-65">
													Hãy nhập title của thẻ input để custom phần này
												</span>
											)}
										</h4>
										{!checkHttps && (
											<p className="max-w-[90%] break-words text-[1.4rem] opacity-75">
												{input_value}
											</p>
										)}

										{checkHttps && (
											<a
												href={input_value}
												target="_blank"
												className="max-w-[90%] break-words text-[1.4rem] opacity-75"
											>
												{input_value}
											</a>
										)}
									</div>
								);
							})}
							<div className="bg-color-main w-[20rem] min-h-[4.5rem] ml-auto flex items-center justify-center gap-[1rem] rounded-lg   text-[1.3rem] text-[#fff] ">
								<Clock />
								<span>{moment(new Date(time)).format("hh:mm Do MMMM YYYY")}</span>
							</div>
						</div>

						<button
							onClick={() => setOpenModel(false)}
							className="bg-color-main absolute right-[-2rem] top-[-2rem] w-[4rem] h-[4rem]  flex items-center justify-center rounded-full  "
						>
							<X size={16} color="white" />
						</button>
					</div>
				</ClickOutSide>
			</div>
		</Portal>
	);
};

export default AnswerDetailModel;
