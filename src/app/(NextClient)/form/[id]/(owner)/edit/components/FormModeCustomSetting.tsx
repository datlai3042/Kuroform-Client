import { InputCore } from "@/type";
import React, { SetStateAction } from "react";
import RenderSettingItem from "./RenderSettingItem";

type TProps = {
      inputItem: InputCore.InputForm;
      colorMain: string;
      openSetting: boolean;
      setOpenSetting: React.Dispatch<SetStateAction<boolean>>;
};

const FormModeCustomSetting = (props: TProps) => {
      const { colorMain, inputItem, openSetting, setOpenSetting } = props;

      return (
            <>
                  <div className="absolute top-0 right-[.2rem] xl:right-[4rem] hidden sm:flex flex-col items-center">
                        <div style={{ borderColor: colorMain }} className="group-hover:!border-[#ffffff] w-[1rem] h-[3rem] border-x-[.2rem] "></div>
                        <div
                              style={{ backgroundColor: colorMain }}
                              className="group-hover:!bg-[#ffffff] group-hover:!text-inherit group-hover:font-semibold xl:group-hover:text-[1.6rem] text-[1.2rem] xl:text-[1.4rem] w-[12rem] xl:w-[16rem] h-[4rem] flex items-center justify-center text-white rounded-lg"
                        >
                              {inputItem.type.toUpperCase()}
                        </div>
                  </div>
                  <div
                        onClick={() => {
                              if (!openSetting) setOpenSetting(true);
                        }}
                        style={{ backgroundColor: colorMain }}
                        className="absolute group-hover:!bg-[#ffffff]  text-[#000] bottom-0 right-0 w-[0] xl:w-[28rem] h-[77%]  rounded-tl-[10rem] rounded-b-[1rem]"
                  >
                        <div
                              style={{ color: colorMain }}
                              className={`${
                                    openSetting ? "hidden sm:block sm:group-hover:block !text-blue-400 " : "hidden sm:group-hover:block"
                              }  hover:cursor-pointer h-full  rounded-tl-[10rem]`}
                        >
                              <RenderSettingItem inputItem={inputItem} color={colorMain} setOpenSetting={setOpenSetting} openSetting={openSetting} />
                        </div>
                  </div>
            </>
      );
};

export default FormModeCustomSetting;
