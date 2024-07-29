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
import { superValidateImage } from "../_validate/inputImage.validate";
import { useDispatch } from "react-redux";
import { addOneToastError } from "@/app/_lib/redux/toast.slice";
import { v4 } from "uuid";
import BoxHandlerError from "../../BoxHandlerInputAnswerError";
import BoxHandlerInputAnswerError from "../../BoxHandlerInputAnswerError";
import BoxHandlerInputAnswerErrorMsg from "../../BoxHandlerInputAnswerErrorMsg";

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

      const [filePreview, setFilePreview] = useState<string>("");
      const [write, setWrite] = useState(false);

      const { uploadFileFormAnswerAPI, handleUpload } = useUploadFileFormAnswers({
            form_id: formCore._id,
            form_answer_id,
            mode: tempMode,
            setFilePreviewCallback: setFilePreview,
            setWriteCallback: setWrite,
      });

      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      const inputRef = useRef<HTMLInputElement | null>(null);

      const handleClick = () => {
            if (inputRef.current) {
                  inputRef.current.click();
            }
      };

      useEffect(() => {
            if (uploadFileFormAnswerAPI.isSuccess) {
                  const { url } = uploadFileFormAnswerAPI.data.metadata;
                  setFilePreview(url);
                  if (inputItem.core.setting.require) {
                        setInputRequireGlobal(setFormAnswer, inputItem._id!, true);
                  }

                  if (inputFormErrors.some((ip) => ip._id === inputItem._id)) {
                        deleteErrorGlobal(setFormAnswer, inputItem._id!);
                  }

                  //xét data global
                  setDataInputGlobal({ callback: setFormAnswer, input_id: inputItem._id!, input_value: url });
            }
      }, [uploadFileFormAnswerAPI.isSuccess]);

      useEffect(() => {
            return () => {
                  URL.revokeObjectURL(filePreview);
            };
      }, [filePreview]);

      return (
            <InputAnswerWrapper>
                  <BoxHandlerInputAnswerError inputItemInArrayGlobal={inputItemInArrayGlobal} input_id={inputItem._id!} write={write}>
                        <InputImageTitle inputItem={inputItem} formCore={formCore} />
                        <DivNative className="relative flex  items-center justify-between gap-[1rem] text-text-theme ">
                              <DivNative className={`h-[12rem] w-[20rem] xl:w-[24rem]   flex flex-col   justify-start  gap-[1.4rem]  `}>
                                    {(inputItemInArrayGlobal.input?.value as string) && checkValueHref(inputItemInArrayGlobal.input?.value as string) && (
                                          <a
                                                href={inputItemInArrayGlobal.input?.value as string}
                                                target="_blank"
                                                className="text-[#000] text-[1.3rem] flex items-center gap-[1rem]"
                                          >
                                                <ImageIcon />
                                                Xem Ảnh
                                          </a>
                                    )}
                                    <p className="w-max text-[1.3rem] text-[#000]">Vui lòng chọn các file JPG, JPEG,PNG</p>
                                    <button
                                          onClick={handleClick}
                                          className="p-[.6rem] border-[.1rem] w-[9rem] border-text-theme bg-slate-900 text-[#fff] text-[1.4rem] rounded-xl"
                                    >
                                          {(inputItemInArrayGlobal.input?.value as string) ? "Tải lại" : "Tải ảnh lên"}
                                    </button>

                                    {(inputItemInArrayGlobal.input?.value as string) ? (
                                          <UploadSuccess />
                                    ) : uploadFileFormAnswerAPI.isPending ? (
                                          <UploadPending />
                                    ) : (
                                          <UploadNone />
                                    )}

                                    <input type="file" hidden={true} ref={inputRef} onChange={handleUpload} accept=".jpg, .jpeg, .png" />
                              </DivNative>

                              <div className="w-[12rem] xl:w-[14rem] h-[12rem] flex items-center justify-center">
                                    {!inputItemInArrayGlobal.input?.value && !uploadFileFormAnswerAPI.isPending && (
                                          <Image
                                                width={32}
                                                height={32}
                                                alt="upload hình ảnh"
                                                src={"/assets/images/icon/form_answer/photographer.png"}
                                                unoptimized={true}
                                                className="w-[10rem] h-[10rem]"
                                          />
                                    )}
                                    {uploadFileFormAnswerAPI.isPending ? (
                                          <LoadingSpinner color="blue" />
                                    ) : (
                                          !tempMode &&
                                          !!inputItemInArrayGlobal.input?.value && (
                                                <Image
                                                      src={inputItemInArrayGlobal.input?.value as string}
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
                        {inputItemInArrayGlobal?.globalError?.state && (
                              <BoxHandlerInputAnswerErrorMsg inputItem={inputItem} inputItemInArrayGlobal={inputItemInArrayGlobal} />
                        )}
                  </BoxHandlerInputAnswerError>
            </InputAnswerWrapper>
      );
};

export default InputImageAnswer;
