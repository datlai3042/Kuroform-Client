import { FormCore, InputCore } from "@/type";
import React, { memo, useContext, useMemo } from "react";
import { generateInputForms } from "./FormCore";
import LoadingSpinner from "@/app/(NextClient)/_components/ui/loading/LoadingSpinner";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import { renderInputStyles } from "@/app/utils/form.utils";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";

type TProps = {
      inputId: string;
      listInput: InputCore.InputForm[];
};

const InputDrap = (props: TProps) => {
      const { inputId, listInput } = props;
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

      const RenderInput = useMemo(() => {
            let isInputDrap = listInput.find((ip) => {
                  if (ip._id === inputId) {
                        return ip;
                  }
                  return;
            });
            if (isInputDrap) {
                  return generateInputForms([isInputDrap], true);
            }
      }, [inputId, listInput]);

      return (
            <div
                  className={`relative p-[2.4rem_3rem]   rounded-[.4rem] border-color-main `}
            >
                  {RenderInput}
                  {<DrapArea />}
            </div>
      );
};

export const DrapArea = () => {
      return (
            <div className="shadow-2xl w-[24rem] h-[15%] bg-blue-700 p-[1rem] absolute right-[4%] top-[8%] z-[10] rounded-[.4rem] flex  gap-[1.2rem] items-center justify-center ">
                  <span className="text-[#fff] ">Đang được kéo để thay đổi</span>
                  <LoadingSpinner color="#fff" width="min-w-[2.4rem]" height="min-h-[2.4rem]" />
            </div>
      );
};

export default memo(InputDrap);
