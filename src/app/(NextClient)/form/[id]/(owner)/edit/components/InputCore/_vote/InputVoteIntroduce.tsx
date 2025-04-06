import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { inputIntroduceVote } from "@/app/_constant/inputIntroduceUI.constant";
import { RootState } from "@/app/_lib/redux/store";
import useChangeTypeInput from "@/app/hooks/useChangeTypeInput";
import { InputCore, ReactCustom } from "@/type";
import { Rate } from "antd";
import { ArrowBigRight, AtSign } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputIntroduceHeader from "../../InputIntroduce/InputIntroduceHeader";

type TProps = {
      inputItem: InputCore.InputVote.InputTypeVote;
      setOpenModel: ReactCustom.SetStateBoolean;
};

const InputVoteIntroduce = (props: TProps) => {
      const { inputItem, setOpenModel } = props;

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const [start, setStart] = useState<number>(2.5);

      const changeTypeInput = useChangeTypeInput();
      const handleChooseInputType = () => {
            changeTypeInput.mutate({ form: formCore, inputItem, type: "VOTE" });
      };

      return (
            <DivNative className="w-full h-full flex flex-col  sm:pt-[4rem] ">
                  <InputIntroduceHeader title={inputIntroduceVote.title} description={inputIntroduceVote.description} action={handleChooseInputType} />
                  <DivNative className="h-[50%] flex flex-col gap-[1.8rem] p-[2rem] ">
                        <DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-color-main text-[#fff]">
                              Ví dụ
                        </DivNative>
                        <DivNative className="flex flex-col gap-[1rem]">
                              <DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
                                    <div className="">
                                          <Rate allowHalf value={start} onChange={(e) => setStart(e)} />
                                    </div>
                              </DivNative>
                              <span className="text-[1.4rem]">Số đánh giá bạn chọn là: {start}</span>
                        </DivNative>
                  </DivNative>
            </DivNative>
      );
};

export default InputVoteIntroduce;
