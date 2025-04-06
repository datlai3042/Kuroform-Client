import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { inputIntroduceText } from "@/app/_constant/inputIntroduceUI.constant";
import { RootState } from "@/app/_lib/redux/store";
import useChangeTypeInput from "@/app/hooks/useChangeTypeInput";
import { InputCore, ReactCustom } from "@/type";

import React from "react";
import { useSelector } from "react-redux";
import InputIntroduceHeader from "../../InputIntroduce/InputIntroduceHeader";

type TProps = {
      inputItem: InputCore.InputText.InputTypeText;
      setOpenModel: ReactCustom.SetStateBoolean;
};

const InputTextIntroduce = (props: TProps) => {
      const { inputItem, setOpenModel } = props;

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const changeTypeInput = useChangeTypeInput();

      const handleChooseInputType = () => {
            changeTypeInput.mutate({ form: formCore, inputItem, type: "TEXT" });
      };
      return (
            <DivNative className="11 w-full h-full flex flex-col sm:pt-[4rem] ">
                  <InputIntroduceHeader title={inputIntroduceText.title} description={inputIntroduceText.description} action={handleChooseInputType} />

                  <DivNative className="h-[50%] flex flex-col gap-[1.8rem] p-[2rem] ">
                        <DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-color-main text-[#fff]">
                              Ví dụ
                        </DivNative>
                        <DivNative className={`min-h-[5rem] h-max flex flex-col  gap-[1rem] `}>
                              <SpanNative textContent="Nhập tiêu đề cho đoạn Text" className="text-[1.6rem] font-semibold" />
                              <DivNative
                                    className="group w-full text-text-theme min-h-[8rem] p-[1.6rem] text-[1.6rem] break-words whitespace-pre-wrap h-max border-[.1rem] border-[var(--border-color-input)] rounded-lg outline-none resize-none "
                                    spellCheck={false}
                                    contentEditable={true}
                                    data-text={`${"Nhập thông tin của bạn"}`}
                                    suppressContentEditableWarning={true}
                                    tabIndex={0}
                              ></DivNative>
                        </DivNative>
                  </DivNative>
            </DivNative>
      );
};

export default InputTextIntroduce;
