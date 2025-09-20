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

      const color = formCore.form_title.form_title_color ? formCore.form_title.form_title_color : formCore.form_setting_default.form_title_color_default;

      return (
            <Portal>
                  <div className="fixed z-[200] inset-0 max-w-full overflow-hidden  flex items-center justify-center bg-[rgba(0,0,0,.6)] hover:cursor-pointer">
                        <ClickOutSide setOpenModel={setOpenModel}>
                              <div className="relative max-w-[80vw] max-h-[90vh] sm:max-w-[48vw] min-w-[34vw] min-h-[20rem]  mx-auto px-[2rem] pt-[5rem] pb-[2rem] bg-color-section-theme text-text-theme rounded-lg">
                                    <h3  className=" text-start font-extrabold text-color-main text-[2.8rem] py-[1.2rem]">
                                          {formCore.form_title.form_title_plain_text || formCore.form_title.form_title_value}
                                    </h3>
                                    <div
                                          style={{ "--scorll-form-answer-detail": 'var(--color-main)' } as React.CSSProperties}
                                          className="scroll-form-answer-detail w-full max-h-[40rem]   pb-[1rem]  overflow-y-scroll p-[1rem_3rem_1rem_0rem] flex flex-col gap-[3rem]   rounded-lg"
                                    >
                                          {formAnswer.answers.map((fans) => {
                                                const input_value = generateValueInputAnswer(fans) || "Không có nội dung";
                                                const input_title = fans.title || `${fans.type}_#${fans._id}`;
                                                const checkHttps = typeof input_value === "string" ? checkValueHref(input_value) : false;
                                                return (
                                                      <div key={fans._id} className="flex flex-col gap-[2.4rem] pb-[1rem] border-b-[.1rem] border-[rgb(110_110_110)]">
                                                            <h4 className="text-[1.5rem] font-medium flex flex-col gap-[.2rem] ">
                                                                  <span className="max-w-full break-words">{input_title}</span>

                                                                  {fans.title.length === 0 && (
                                                                        <span className="text-[1.2rem] opacity-65">
                                                                              Hãy nhập title của thẻ input để custom phần này
                                                                        </span>
                                                                  )}
                                                            </h4>
                                                            {!checkHttps && fans.type !== "DATE" && (
                                                                  <p className="max-w-[90%] break-words text-[1.4rem] opacity-75">{input_value}</p>
                                                            )}
                                                            {!checkHttps && fans.type === "DATE" && (
                                                                  <p className="max-w-[90%] break-words text-[1.4rem] opacity-75">
                                                                        {moment(fans.value).format("DD/MM/YYYY")}
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
                                          <div className="bg-color-main min-w-[16.5rem] p-[1rem] min-h-[2.8rem] ml-auto flex items-center justify-center gap-[.6rem]  rounded-[.4rem]  text-[1.2rem] text-[#fff] ">
                                                <Clock size={"1.5rem"} />
                                                <span>{moment(new Date(time)).format("hh:mm - Do MMMM YYYY")}</span>
                                          </div>
                                    </div>
                                    <button
                                          onClick={() => setOpenModel(false)}
                                          type="button"
                                          className="absolute right-[1rem] top-[1.4rem] flex justify-center items-center  w-[10.5rem] h-[2.8rem] text-[1.3rem] text-white bg-color-main opacity-90 hover:opacity-100  font-medium rounded-[.4rem]  px-5 py-2.5 me-2 mb-2  "
                                    >
                                          Đóng Modal
                                    </button>
                                    {/* <button
							className="bg-color-main absolute right-[-2rem] top-[-2rem] w-[4rem] h-[4rem]  flex items-center justify-center rounded-full  "
						>
							<X size={16} color="white" />
						</button> */}
                              </div>
                        </ClickOutSide>
                  </div>
            </Portal>
      );
};

export default AnswerDetailModel;
