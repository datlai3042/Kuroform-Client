import { RootState } from "@/app/_lib/redux/store";
import { FormCore, InputCore as TInputCore, UI } from "@/type";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import InputCore from "../InputCore";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import Image from "next/image";
import UploadSuccess from "@/app/(NextClient)/_components/ui/loading/UploadSuccess";
import UploadPending from "@/app/(NextClient)/_components/ui/loading/UploadPending";
import UploadNone from "@/app/(NextClient)/_components/ui/loading/UploadNone";

type TProps = {
      inputItem: TInputCore.InputImage.InputTypeImage;
};

const InputCoreImage = (props: TProps) => {
      const { inputItem } = props;
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
      const inputRef = useRef<HTMLInputElement | null>(null);

      const [filePreview, setFilePreview] = useState<string>("");

      const handleClick = () => {
            if (inputRef.current) {
                  inputRef.current.click();
            }
      };

      const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                  const file = e.target.files[0];
                  if (!file) return;
                  const link_preview = URL.createObjectURL(file);
                  setFilePreview(link_preview);
            }
      };

      useEffect(() => {
            return () => {
                  URL.revokeObjectURL(filePreview);
            };
      }, [filePreview]);

      const InputImage = (
            <DivNative className="relative flex flex-col items-start gap-[1rem] text-text-theme ">
                  <DivNative className={`h-[90%]  flex flex-col items-start  gap-[1rem] `}>
                        <button onClick={handleClick} className="btn-primarily bg-color-main min-w-[12rem]   rounded-[.4rem]">
                              {filePreview ? "Tải lên lại" : "Tải ảnh lên"}
                        </button>

                        <input type="file" hidden={true} ref={inputRef} onChange={handleUpload} accept=".jpg, .jpeg, .png" />
                        {filePreview && (
                              <Image src={filePreview} width={70} height={70} alt="demo upload hình ảnh" className="w-[10rem] aspect-square xl:w-[20rem]" />
                        )}
                        {filePreview ? <UploadSuccess /> : <UploadNone />}
                  </DivNative>
            </DivNative>
      );

      return (
            <InputCore
                  InputComponent={InputImage}
                  inputItem={inputItem}
                  inputTitle={inputItem.input_title || ""}
                  dataTextTitle="Thêm mô tả về hình ảnh được chọn"
            />
      );
};

export default InputCoreImage;
