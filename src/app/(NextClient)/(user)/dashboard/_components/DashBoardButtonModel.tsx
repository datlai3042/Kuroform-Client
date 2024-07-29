import React, { SetStateAction, useState } from "react";
import { ChevronDown } from "lucide-react";
import DashBoardModel from "./DashBoardModel";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";

type TProps = {
      openModel: boolean;
      setOpenModel: React.Dispatch<SetStateAction<boolean>>;
};

const DashBoardButtonModel = (props: TProps) => {
      const { openModel, setOpenModel } = props;

      const styleEffect = {
            onCheckFocus: (state: boolean) => {
                  if (state) return "bg-color-main outline outline-[4px] outline-blue-200";
                  return "bg-transparent hover:bg-color-main";
            },
      };

      return (
            <div className="relative ml-[-.2rem] z-[999] text-[#fff]">
                  <ButtonIcon
                        Icon={<ChevronDown className="w-[1.4rem]  " />}
                        className={`flex  bg-color-main  rounded-lg !w-[1.6rem] !h-[1.6rem]`}
                        onClick={() => setOpenModel((prev) => !prev)}
                  />
                  {openModel && <DashBoardModel setOpenModel={setOpenModel} />}
            </div>
      );
};

export default DashBoardButtonModel;
