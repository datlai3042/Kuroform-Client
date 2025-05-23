import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { inputSettingOption, inputSettingText } from "@/app/_constant/input.constant";
import { inputIntroduceOption, inputIntroduceText } from "@/app/_constant/inputIntroduceUI.constant";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { filterTypeInput } from "@/app/_lib/utils";
import FormService from "@/app/_services/form.service";
import useChangeTypeInput from "@/app/hooks/useChangeTypeInput";
import { FormCore, InputCore, ReactCustom } from "@/type";
import { useMutation } from "@tanstack/react-query";
import { ArrowBigRight, AtSign } from "lucide-react";

import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputIntroduceHeader from "../../InputIntroduce/InputIntroduceHeader";

type TProps = {
      inputItem: InputCore.InputOption.InputTypeOption;
      setOpenModel: ReactCustom.SetStateBoolean;
};

const InputOptionIntroduce = (props: TProps) => {
      const { inputItem, setOpenModel } = props;

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

      const changeTypeInput = useChangeTypeInput();
      const handleChooseInputType = () => {
            changeTypeInput.mutate({ form: formCore, inputItem, type: "OPTION" });
      };

      return (
            <DivNative className="w-full h-full flex flex-col sm:pt-[4rem] ">
                  <InputIntroduceHeader title={inputIntroduceOption.title} description={inputIntroduceOption.description} action={handleChooseInputType} />
                  <DivNative className="h-[50%] flex flex-col gap-[1.8rem] p-[2rem] ">
                        <DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-color-main text-[#fff]">
                              Ví dụ
                        </DivNative>
                        <DivNative className={`min-h-[5rem] h-max flex flex-col  gap-[1rem] text-[1.4rem]`}>
                              <div className="text-[1.6rem] font-semibold">Framework Front end bạn sử dụng?</div>
                              <div className="px-[4rem] flex flex-col gap-[1rem]">
                                    <div className="flex items-center gap-[1rem]">
                                          <input type="radio" name="front-end-core" value={"React"} />
                                          <span>React</span>
                                    </div>

                                    <div className="flex items-center gap-[1rem]">
                                          <input type="radio" name="front-end-core" value={"Angular"} />
                                          <span>Angular</span>
                                    </div>

                                    <div className="flex items-center gap-[1rem]">
                                          <input type="radio" name="front-end-core" value={"Vue"} />
                                          <span>Vue</span>
                                    </div>

                                    <div className="flex items-center gap-[1rem]">
                                          <input type="radio" name="front-end-core" value={"Other"} />
                                          <span>Other</span>
                                    </div>
                              </div>
                        </DivNative>
                  </DivNative>
            </DivNative>
      );
};

export default InputOptionIntroduce;
