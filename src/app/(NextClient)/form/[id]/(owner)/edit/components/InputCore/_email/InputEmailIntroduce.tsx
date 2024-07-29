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
            <DivNative className="w-full h-full flex flex-col py-[1rem] ">
                  <InputIntroduceHeader title={inputIntroduceEmail.title} description={inputIntroduceEmail.description} action={handleChooseInputType} />

                  <DivNative className="h-[50%] flex flex-col gap-[2.6rem] p-[3rem_2rem]">
                        <DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-gray-200  text-gray-400">
                              Ví dụ
                        </DivNative>
                        <DivNative className="flex flex-col gap-[1rem]">
                              <SpanNative textContent="Email" className="text-[1.6rem] font-bold" />
                              <DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
                                    <input
                                          className="w-full h-full p-[1rem] rounded-lg text-[1.6rem]   border-[.1rem] border-gray-400  outline-none focus:outline-blue-200 focus:border-transparent text-[#000]"
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
