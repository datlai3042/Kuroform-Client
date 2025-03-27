import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { inputIntroduceEmail } from "@/app/_constant/inputIntroduceUI.constant";
import { RootState } from "@/app/_lib/redux/store";
import useChangeTypeInput from "@/app/hooks/useChangeTypeInput";
import { InputCore, ReactCustom } from "@/type";
import { AtSign } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import InputIntroduceHeader from "../../InputIntroduce/InputIntroduceHeader";

type TProps = {
      inputItem: InputCore.InputEmail.InputTypeEmail;
      setOpenModel: ReactCustom.SetStateBoolean;
};

const InputEmailIntroduce = (props: TProps) => {
      const { inputItem, setOpenModel } = props;

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

      const changeTypeInput = useChangeTypeInput();

      const handleChooseInputType = () => {
            changeTypeInput.mutate({ form: formCore, inputItem, type: "EMAIL" });
      };
      return (
            <DivNative className="w-full h-full flex flex-col sm:py-[4rem] ">
                  <InputIntroduceHeader title={inputIntroduceEmail.title} description={inputIntroduceEmail.description} action={handleChooseInputType} />

                  <DivNative className="h-[50%] flex flex-col gap-[2.6rem] p-[1rem_2rem] sm:p-[3rem_2rem]">
                        <DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-color-main  text-[#fff]">
                              Ví dụ
                        </DivNative>
                        <DivNative className="flex flex-col gap-[1rem]">
                              <SpanNative textContent="Email" className="text-[1.6rem] font-bold" />
                              <DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
                                    <input
                                          className="w-full h-full p-[1rem] rounded-lg text-[1.6rem]   border-[.1rem] border-[var(--border-color-input)]  outline-none  text-[#fff] bg-[var(--color-section-theme)]"
                                          placeholder="Nhập email của bạn"
                                    />
                                    <AtSign className="absolute z-[2] right-[1rem]  opacity-50" size={18} />
                              </DivNative>
                        </DivNative>
                  </DivNative>
            </DivNative>
      );
};

export default InputEmailIntroduce;
