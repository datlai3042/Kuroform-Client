import { InputCore } from "@/type";
import React, { memo, useContext, useMemo } from "react";
import { generateInputForms } from "./FormCore";
import LoadingSpinner from "@/app/(NextClient)/_components/ui/loading/LoadingSpinner";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";

type TProps = {
      inputId: string;
      listInput: InputCore.InputForm[];
};

const InputDrap = (props: TProps) => {
      const { inputId, listInput } = props;

      const RenderInput = useMemo(() => {
            let isInputDrap = listInput.find((ip) => {
                  if (ip._id === inputId) {
                        return ip;
                  }
                  return;
            });
            if (isInputDrap) {
                  return generateInputForms([isInputDrap]);
            }
      }, [inputId, listInput]);

      return (
            <div className={`relative p-[2.4rem_3rem]   rounded-[.4rem] border-color-main bg-color-section-theme`}>
                  {RenderInput}
                  {<DrapArea />}
            </div>
      );
};

export const DrapArea = () => {
      return (
            <div className=" w-[24rem] h-[15%] bg-color-main absolute right-[4%] top-[8%] z-[10] rounded-[.4rem] flex  gap-[1.2rem] items-center justify-center ">
                  <span className="text-[#fff]">Đang được kéo để thay đổi</span>
                  <LoadingSpinner color="#fff" width="min-w-[2.4rem]" height="min-h-[2.4rem]"/>
            </div>
      );
};

export default memo(InputDrap);
