"use client";
import { FormCore, InputCore, UI } from "@/type";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import InputAnswerWrapper from "../InputAnswerWrapper";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import { superTextValidate } from "../_validate/inputText.validate";
import InputErrorMessage from "../InputError/InputErrorMessage";
import {
      deleteErrorGlobal,
      renderControllerInputAnswer,
      renderErrorInput,
      setDataInputGlobal,
      setErrorGlobal,
      setInputRequireGlobal,
} from "../_utils/formAnswer.uti";
import MinMaxInput from "../../MinMaxInput";
import { superPhoneValidate } from "../_validate/inputPhone.validate";
import { AtSign, CalendarCheckIcon, ImageIcon, Phone } from "lucide-react";
import Calendar from "@/app/(NextClient)/test/calendar/Calendar";
import { generateFullDateString } from "@/app/utils/time.utils";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { superDateValidate } from "../_validate/inputDate.validate";
import Image from "next/image";
import InputImageTitle from "./InputImageTitle";
import LoadingClient from "@/app/(NextClient)/_components/LoadingClient";
import LoadingSpinner from "@/app/(NextClient)/_components/ui/loading/LoadingSpinner";
import useUploadFileFormAnswers from "@/app/hooks/form-answer/useUploadFileFormAnswer";
import { UploadFileAnswer } from "@/app/_services/formAnswer.service";
import { usePathname } from "next/navigation";
import { checkValueHref } from "@/app/_lib/utils";
import UploadNone from "@/app/(NextClient)/_components/ui/loading/UploadNone";
import UploadPending from "@/app/(NextClient)/_components/ui/loading/UploadPending";
import UploadSuccess from "@/app/(NextClient)/_components/ui/loading/UploadSuccess";

type TProps = {
      inputItem: InputCore.InputImage.InputTypeImage;
      formCore: FormCore.Form;
};

const InputImageAnswer = (props: TProps) => {
      const { inputItem, formCore } = props;
      const segment = usePathname();

      const tempMode = segment.startsWith("/form") && segment.endsWith("/edit");

      const {
            formAnswer: { inputFormErrors, inputFormData, submitState, form_answer_id },
            setFormAnswer,
      } = useContext(FormAnswerContext);

      const uploadFile = useUploadFileFormAnswers();

      const [value, setValue] = useState<string>(() => {
            const data_input_item = inputFormData.find((ip) => ip._id === inputItem._id && ip.type === "FILE_IMAGE");
            return data_input_item?.value as string;
      });

      useEffect(() => {
            setValue(() => {
                  const data_input_item = inputFormData.find((ip) => ip._id === inputItem._id && ip.type === "FILE_IMAGE");
                  return data_input_item?.value as string;
            });
      }, []);

      const [error, setError] = useState<FormCore.FormAnswer.InputError>(() => {
            return renderErrorInput(inputFormErrors, inputItem);
      });

      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      //focus -> write = true
      //xóa lỗi local, xóa lỗi global
      //đặt lại cờ require trong global bằng false
      //xét data global

      const inputRef = useRef<HTMLInputElement | null>(null);

      const [filePreview, setFilePreview] = useState<string>("");

      const handleClick = () => {
            if (inputRef.current) {
                  inputRef.current.click();
            }
      };

      const [write, setWrite] = useState(false);

      const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                  setWrite(true);
                  const file = e.target.files[0];
                  const formData: UploadFileAnswer = new FormData();
                  formData.append("file", file);
                  formData.append("form_answers_id", form_answer_id);
                  formData.append("form_id", formCore._id);

                  const link_preview = URL.createObjectURL(file);
                  setFilePreview(link_preview);
                  if (tempMode) return;
                  uploadFile.mutate(formData);
            }
      };

      useEffect(() => {
            if (uploadFile.isSuccess) {
                  const { url } = uploadFile.data.metadata;
                  setValue(url);
                  setFilePreview(url);
                  if (inputItem.core.setting.require) {
                        setInputRequireGlobal(setFormAnswer, inputItem._id!, true);
                  }

                  deleteErrorGlobal(setFormAnswer, inputItem._id!);

                  //xét data global
                  setDataInputGlobal({ callback: setFormAnswer, input_id: inputItem._id!, input_value: url });
            }
      }, [uploadFile.isSuccess]);

      useEffect(() => {
            return () => {
                  URL.revokeObjectURL(filePreview);
            };
      }, [filePreview]);

      return (
            <InputAnswerWrapper>
                  <DivNative
                        id={`_inputid_${inputItem._id}`}
                        className={`${
                              (error && write) || inputItemInArrayGlobal.globalError.state ? "input-answer-invalid" : " border-[.2rem] border-transparent "
                        } relative w-full min-h-[20rem] h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[1.8rem]  rounded-lg`}
                  >
                        <InputImageTitle inputItem={inputItem} formCore={formCore} />
                        <DivNative className="relative flex  items-center justify-between gap-[1rem] text-text-theme ">
                              <DivNative className={`h-[12rem] w-[10rem] xl:w-[24rem]   flex flex-col   justify-start  gap-[1.4rem]  `}>
                                    {value && checkValueHref(value) && (
                                          <a href={value} target="_blank" className="text-[#000] text-[1.3rem] flex items-center gap-[1rem]">
                                                <ImageIcon />
                                                Xem Ảnh
                                          </a>
                                    )}
                                    <p className="w-max text-[1.3rem] text-[#000]">Chỉ nhận các file JPEG, JPEG,PNG</p>
                                    <button
                                          onClick={handleClick}
                                          className="p-[.6rem] border-[.1rem] w-[9rem] border-text-theme bg-slate-900 text-[#fff] text-[1.4rem] rounded-xl"
                                    >
                                          {value ? "Tải lại" : "Tải ảnh lên"}
                                    </button>

                                    {value ? <UploadSuccess /> : uploadFile.isPending ? <UploadPending /> : <UploadNone />}

                                    <input type="file" hidden={true} ref={inputRef} onChange={handleUpload} accept=".jpg, .jpeg, .png" />
                              </DivNative>

                              <div className="w-[12rem] xl:w-[14rem] h-[12rem] flex items-center justify-center">
                                    {!value && !uploadFile.isPending && (
                                          <Image
                                                width={32}
                                                height={32}
                                                alt="upload hình ảnh"
                                                src={"/assets/images/icon/form_answer/photographer.png"}
                                                unoptimized={true}
                                                className="w-[10rem] h-[10rem]"
                                          />
                                    )}
                                    {uploadFile.isPending ? (
                                          <LoadingSpinner color="blue" />
                                    ) : (
                                          !tempMode &&
                                          !!value && (
                                                <Image
                                                      src={value}
                                                      width={70}
                                                      height={70}
                                                      alt="file hinh anh"
                                                      className="w-full h-full rounded-lg"
                                                      unoptimized={true}
                                                />
                                          )
                                    )}

                                    {tempMode && filePreview && (
                                          <Image src={filePreview} width={70} height={70} alt="file hinh anh" className="w-full h-full" unoptimized={true} />
                                    )}
                              </div>
                        </DivNative>
                        {(error.error || inputItemInArrayGlobal.globalError.state) && (
                              <InputErrorMessage
                                    message={inputItemInArrayGlobal.globalError.message || error.message}
                                    type={inputItemInArrayGlobal.globalError.type || error.type}
                              />
                        )}
                  </DivNative>
            </InputAnswerWrapper>
      );
};

export default InputImageAnswer;
