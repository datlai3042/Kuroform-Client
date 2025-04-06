import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { inputIntroduceDate, inputIntroduceText } from "@/app/_constant/inputIntroduceUI.constant";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import FormService from "@/app/_services/form.service";
import { FormCore, InputCore, ReactCustom } from "@/type";
import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBigRight } from "lucide-react";
import { inputSettingDate } from "@/app/_constant/input.constant";
import Calendar from "@/app/(NextClient)/test/calendar/Calendar";
import useChangeTypeInput from "@/app/hooks/useChangeTypeInput";
import InputIntroduceHeader from "../../InputIntroduce/InputIntroduceHeader";

type TProps = {
      inputItem: InputCore.InputDate.InputTypeDate;
      setOpenModel: ReactCustom.SetStateBoolean;
};

const InputDateIntroduce = (props: TProps) => {
      const { inputItem, setOpenModel } = props;

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const changeTypeInput = useChangeTypeInput();

      const handleChooseInputType = () => {
            changeTypeInput.mutate({ form: formCore, inputItem, type: "DATE" });
      };

      return (
            <DivNative className="w-full h-full flex flex-col sm:pt-[4rem] ">
                  <InputIntroduceHeader title={inputIntroduceDate.title} description={inputIntroduceDate.description} action={handleChooseInputType} />
                  <DivNative className=" overflow-auto flex flex-col gap-[1.8rem] p-[2rem]   ">
                        <DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-color-main text-[#fff]">
                              Ví dụ
                        </DivNative>
                        <DivNative className={`h-full   flex    gap-[1rem] `}>
                              <Calendar />
                        </DivNative>
                  </DivNative>
            </DivNative>
      );
};

export default InputDateIntroduce;
