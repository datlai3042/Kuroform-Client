import { RootState } from "@/app/_lib/redux/store";
import { FormCore, InputCore } from "@/type";
import React, { SetStateAction, useMemo } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

type TProps = {
      inputItem: InputCore.InputForm;
      color: string;
      setOpenSetting: React.Dispatch<SetStateAction<boolean>>;
      openSetting: boolean;
};

const generateLabelSetting = (settngName: keyof InputCore.Setting.SettingAll) => {
      let label;
      if (settngName === "input_color") return (label = "Màu sắc của chữ");
      if (settngName === "input_error") return (label = "Lỗi tùy chọn");
      if (settngName === "input_size") return (label = "Cỡ chữ");
      if (settngName === "input_style") return (label = "Kiểu chữ");
      if (settngName === "require") return (label = "Bắt buộc");
      if (settngName === "maxLength") return (label = "Độ dài tối đa");
      if (settngName === "minLength") return (label = "Độ dài tối thiểu");
      if (settngName === "placeholder") return (label = "Placeholder của input");
};

const RenderSettingItem = (props: TProps) => {
      const { inputItem, openSetting, setOpenSetting } = props;

      return (
            <div
                  className="h-full "
                  onClick={() => {
                        setOpenSetting(true);
                  }}
            >
                  <div className="flex flex-col justify-center h-full px-[4rem] py-[1.8rem] gap-[1rem] xl:text-[1.3rem]">
                        {Object.keys(inputItem.core.setting).map((setting, i) => (
                              <div
                                    key={uuidv4() + i}
                                    onClick={() => {
                                          setOpenSetting(true);
                                    }}
                              >
                                    <span className="mr-[.4rem] text-[#000]">{generateLabelSetting(setting as keyof InputCore.Setting.SettingAll)}:</span>
                                    <span className="font-medium ">
                                          {JSON.stringify(inputItem.core.setting[setting as keyof InputCore.Setting.InputSettingCommon])}
                                    </span>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default RenderSettingItem;
