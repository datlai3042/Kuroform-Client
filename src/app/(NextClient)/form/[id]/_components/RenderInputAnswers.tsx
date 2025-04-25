"use client";
import { FormCore, InputCore } from "@/type";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import ButtonSubmitForm from "./ButtonSubmitForm";
import HeaderFormAnswer from "./HeaderFormAnswer";
import { number } from "zod";
import Link from "next/link";
import ListErrorInput from "./ListErrorInput";
import SubmitSuccess from "./InputAnswer/submit/SubmitSuccess";
import InputEmailAnswer from "./InputAnswer/_email/InputEmailAnswer";
import InputTextAnswer from "./InputAnswer/_text/InputTextAnswer";
import InputPhoneAnswer from "./InputAnswer/_phone/InputPhoneAnswer";
import InputVoteAnswer from "./InputAnswer/_vote/InputVoteAnswer";
import InputDateAnswer from "./InputAnswer/_date/InputDateAnswer";
import InputImageAnswer from "./InputAnswer/_image/InputImageAnswer";
import InputAddressAnswer from "./InputAnswer/_address/InputAddressAnswer";
import InputAnchorAnswer from "./InputAnswer/_anchor/InputAnchorAnswer";
import InputOptionAnswer from "./InputAnswer/_option/InputOptionAnswer";
import InputOptionMultipleAnswer from "./InputAnswer/_options/InputOptionMultipleAnswer";

type TProps = {
      formCore: FormCore.Form;
};

const generateInputAnswer = (Inputs: InputCore.InputForm[], formCore: FormCore.Form): React.ReactNode[] => {
      return Inputs.map((ip) => {
            switch (ip.type) {
                  case "EMAIL":
                        return <InputEmailAnswer inputItem={ip} formCore={formCore} key={ip._id} />;
                  case "TEXT":
                        return <InputTextAnswer inputItem={ip} formCore={formCore} key={ip._id} />;

                  case "PHONE":
                        return <InputPhoneAnswer inputItem={ip} formCore={formCore} key={ip._id} />;

                  case "VOTE":
                        return <InputVoteAnswer inputItem={ip} formCore={formCore} key={ip._id} />;

                  case "DATE":
                        return <InputDateAnswer inputItem={ip} formCore={formCore} key={ip._id} />;

                  case "FILE_IMAGE":
                        return <InputImageAnswer inputItem={ip} formCore={formCore} key={ip._id} />;

                  case "ADDRESS":
                        return <InputAddressAnswer inputItem={ip} formCore={formCore} key={ip._id} />;
                  case "ANCHOR":
                        return <InputAnchorAnswer inputItem={ip} formCore={formCore} key={ip._id} />;

                  case "OPTION":
                        return <InputOptionAnswer inputItem={ip} formCore={formCore} key={ip._id} />;

                  case "OPTION_MULTIPLE":
                        return <InputOptionMultipleAnswer inputItem={ip} formCore={formCore} key={ip._id} />;
            }
      });
};

const RenderInputAnswers = (props: TProps) => {
      const { formCore } = props;
      const [page, setPage] = useState<number>(1);

      const {
            formAnswer: { inputFormErrors, openModelError, submitState },
            setFormAnswer,
      } = useContext(FormAnswerContext);
      const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;
      const count = useRef(1);

      console.log({ message: "Quản lí và validate dữ liệu" });

      console.log({ "Số lần render": count.current });
      console.log({ "Trang hiện tại": page });
      if (submitState === "success")
            console.log(
                  "%cThông tin của bạn đã được gửi thành công",
                  `color:#fff;font-size:1.2rem;background: #3b36db;padding:0.3rem;border-radius:.4rem`,
            );

      count.current += 1;

      const [client, setClient] = useState<boolean>(false);

      const numberInputAPage = 3;
      const allInputAnswer = useMemo(() => generateInputAnswer(formCore.form_inputs, formCore), [formCore]);
      const totalPage = Math.ceil(allInputAnswer.length / numberInputAPage);

      const generateInputWithPage = { start: numberInputAPage * (page - 1), end: numberInputAPage * page };

      useEffect(() => {
            setClient(true);
      }, []);


      useEffect(() => {
            window.scrollTo(0,0)
      }, [page])

      return (
            <>
                  {submitState !== "success" && (
                        <>
                              {<HeaderFormAnswer formCore={formCore} />}
                              {!client && allInputAnswer}
                              {client && allInputAnswer.slice(generateInputWithPage.start, generateInputWithPage.end)}

                              <div className="flex flex-col gap-[1.2rem] px-[2rem]">
                                    <div
                                          // style={{color: formCore.form_title.form_title_color}}
                                          className="flex flex-wrap gap-[2rem] justify-end text-[1.5rem] text-color-main font-normal"
                                    >
                                          {page === totalPage && totalPage > 1 && (
                                                <button
                                                      tabIndex={0}
                                                      className="opacity-60 hover:opacity-100 p-[.4rem_.8rem]  border-b-[.18rem] border-color-main text-text-theme"
                                                      onClick={() => setPage((prev) => (prev -= 1))}
                                                >
                                                      Xem trang trước
                                                </button>
                                          )}
                                          {page > 1 && page !== totalPage && (
                                                <button
                                                      tabIndex={0}
                                                      className="opacity-60 hover:opacity-100 p-[.4rem_.8rem]  border-b-[.18rem] border-color-main text-text-theme"
                                                      onClick={() => setPage((prev) => (prev -= 1))}
                                                >
                                                      Xem trang trước
                                                </button>
                                          )}

                                          {formCore.form_inputs.length > 0 && (
                                                <p className="p-[.4rem_.8rem]  border-b-[.18rem] border-color-main text-text-theme">
                                                      Số trang:{page} / {totalPage}
                                                </p>
                                          )}
                                          {page < totalPage && page !== 1 && (
                                                <button
                                                      tabIndex={0}
                                                      className="opacity-60 hover:opacity-100 p-[.4rem_.8rem]  border-b-[.18rem] border-color-main text-text-theme"
                                                      onClick={() => setPage((prev) => (prev += 1))}
                                                >
                                                      Xem trang tiếp theo
                                                </button>
                                          )}

                                          {page === 1 && totalPage > 1 && (
                                                <button
                                                      tabIndex={0}
                                                      className="opacity-60 hover:opacity-100 p-[.4rem_.8rem]  border-b-[.18rem] border-color-main text-text-theme"
                                                      onClick={() => setPage((prev) => (prev += 1))}
                                                >
                                                      Xem trang tiếp theo
                                                </button>
                                          )}
                                    </div>

                                    {formCore.form_inputs.length > 0 && <ButtonSubmitForm formCore={formCore} />}
                              </div>

                              {inputFormErrors.length > 0 && openModelError && (
                                    <ListErrorInput
                                          formCore={formCore}
                                          setPage={setPage}
                                          inputFormErrors={inputFormErrors}
                                          numberInputAPage={numberInputAPage}
                                          onClose={() => {
                                                setFormAnswer((prev) => ({ ...prev, openModelError: false }));
                                          }}
                                    />
                              )}
                        </>
                  )}

                  {submitState === "success" && (
                        <div className="mt-[2rem]">
                              <SubmitSuccess color={colorMain} />
                        </div>
                  )}
            </>
      );
};

export default RenderInputAnswers;
