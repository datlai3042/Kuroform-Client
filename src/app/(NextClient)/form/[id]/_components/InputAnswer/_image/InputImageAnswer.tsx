"use client";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import LoadingSpinner from "@/app/(NextClient)/_components/ui/loading/LoadingSpinner";
import UploadNone from "@/app/(NextClient)/_components/ui/loading/UploadNone";
import UploadPending from "@/app/(NextClient)/_components/ui/loading/UploadPending";
import UploadSuccess from "@/app/(NextClient)/_components/ui/loading/UploadSuccess";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { checkValueHref } from "@/app/_lib/utils";
import useUploadFileFormAnswers from "@/app/hooks/form-answer/useUploadFileFormAnswer";
import { FormCore, InputCore } from "@/type";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import BoxHandlerInputAnswerError from "../../BoxHandlerInputAnswerError";
import BoxHandlerInputAnswerErrorMsg from "../../BoxHandlerInputAnswerErrorMsg";
import { deleteErrorGlobal, renderControllerInputAnswer, setDataInputGlobal, setInputRequireGlobal } from "../_utils/formAnswer.uti";
import InputAnswerWrapper from "../InputAnswerWrapper";
import InputImageTitle from "./InputImageTitle";
import InputAnswerTitle from "../../InputAnswerTitle";
import InputContent from "../InputContent";

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
                  setDataInputGlobal({ callback: setFormAnswer, input_id: inputItem._id!, input_value: url, description: url });
            }
      }, [uploadFileFormAnswerAPI.isSuccess]);

      useEffect(() => {
            return () => {
                  URL.revokeObjectURL(filePreview);
            };
      }, [filePreview]);
      const isError = write || inputItemInArrayGlobal?.globalError?.state;
      return (
            <InputAnswerWrapper formCore={formCore}>
                  <BoxHandlerInputAnswerError inputItemInArrayGlobal={inputItemInArrayGlobal} input_id={inputItem._id!} write={write}>
                        <InputAnswerTitle inputItem={inputItem} formCore={formCore} isError={isError} />
                        <InputContent>
                              <DivNative className={`$ text-inherit relative flex flex-col  items-center justify-between gap-[1rem]  `}>
                                    <DivNative className={`${formCore.form_styles === 'GOOGLE_FORM' ? ' gap-[2rem]' : ' gap-[1rem]'} w-full     flex flex-col   justify-start   `}>
                                          <div className=" flex justify-between gap-[2rem] flex-wrap">
                                                <p className="w-max text-[1.3rem] ">Vui lòng chọn các file JPG, JPEG,PNG</p>
                                                <button
                                                      onClick={handleClick}
                                                      className="p-[.3rem_.6rem]  bg-color-main text-[#fff] text-[1.4rem] rounded-[.4rem]"
                                                >
                                                      {(inputItemInArrayGlobal.input?.value as string) ? "Tải ảnh khác" : "Tải ảnh lên"}
                                                      <input type="file" hidden={true} ref={inputRef} onChange={handleUpload} accept=".jpg, .jpeg, .png" />
                                                </button>
                                          </div>

                                          {(inputItemInArrayGlobal.input?.value as string) && !uploadFileFormAnswerAPI.isPending ? (
                                                <UploadSuccess />
                                          ) : uploadFileFormAnswerAPI.isPending ? (
                                                <UploadPending />
                                          ) : (
                                                <UploadNone />
                                          )}
                                    </DivNative>
                                    {uploadFileFormAnswerAPI.isPending ||
                                          (!tempMode && !!inputItemInArrayGlobal.input?.value && (
                                                <div className="w-full flex justify-between gap-[2rem]">
                                                      <div className="max-w-[25rem] max-h-[25rem] flex items-center ">
                                                            {/* {!inputItemInArrayGlobal.input?.value && !uploadFileFormAnswerAPI.isPending && (
                                                <Image
                                                      width={32}
                                                      height={32}
                                                      alt="upload hình ảnh"
                                                      src={"/assets/images/icon/form_answer/photographer.png"}
                                                      unoptimized={true}
                                                      className="w-[10rem] h-[10rem]"
                                                />
                                          )} */}
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
                                                                              className="w-max h-full rounded-lg object-contain"
                                                                              unoptimized={true}
                                                                        />
                                                                  )
                                                            )}
                                                      </div>
                                                      {typeof inputItemInArrayGlobal.input?.value === "string" &&
                                                            checkValueHref(inputItemInArrayGlobal.input?.value as string) && (
                                                                  <div className="flex items-end">
                                                                        <a
                                                                              href={inputItemInArrayGlobal.input?.value as string}
                                                                              target="_blank"
                                                                              className=" flex gap-[.6rem]
                                                                  p-[.4rem_.2rem]  min-w-[10rem] justify-center border-[.1rem] w-max border-[var(--border-color-input)] bg-color-main text-[#fff] text-[1.3rem] rounded-[.4rem]"
                                                                        >
                                                                              <ImageIcon size={20} />
                                                                              Xem Ảnh
                                                                        </a>
                                                                  </div>
                                                            )}
                                                </div>
                                          ))}

                                    {tempMode && filePreview && (
                                          <div className="w-full flex justify-between gap-[2rem]">
                                                <div className="max-w-[25rem] max-h-[25rem] flex items-center">
                                                      <Image
                                                            src={filePreview}
                                                            width={70}
                                                            height={70}
                                                            alt="file hinh anh"
                                                            className="w-max h-full object-contain"
                                                            unoptimized={true}
                                                      />
                                                </div>
                                                {typeof inputItemInArrayGlobal.input?.value === "string" &&
                                                      checkValueHref(inputItemInArrayGlobal.input?.value as string) && (
                                                            <div className="flex items-end">
                                                                  <a
                                                                        href={inputItemInArrayGlobal.input?.value as string}
                                                                        target="_blank"
                                                                        className="
                                                                  p-[.4rem_.2rem] min-w-[10rem] justify-center border-[.1rem] w-[9rem] border-[var(--border-color-input)] bg-color-main text-[#fff] text-[1.4rem] rounded-[.4rem]"
                                                                  >
                                                                        <ImageIcon />
                                                                        Xem Ảnh
                                                                  </a>
                                                            </div>
                                                      )}
                                          </div>
                                    )}
                              </DivNative>
                              {inputItemInArrayGlobal?.globalError?.state && (
                                    <BoxHandlerInputAnswerErrorMsg inputItem={inputItem} inputItemInArrayGlobal={inputItemInArrayGlobal} />
                              )}
                        </InputContent>
                  </BoxHandlerInputAnswerError>
            </InputAnswerWrapper>
      );
};

export default InputImageAnswer;
