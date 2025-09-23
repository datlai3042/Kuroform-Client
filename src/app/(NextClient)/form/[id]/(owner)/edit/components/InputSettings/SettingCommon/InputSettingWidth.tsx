import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { InputCore } from "@/type";
import { Slider } from "antd";
import React, { SetStateAction, useEffect, useState } from "react";
import InputSettingLabel from "../InputSettingLabel";
type TProps<InputType extends InputCore.Commom.InputCommon, SettingType extends InputCore.Setting.InputSettingCommon> = {
      inputItem: InputType;
      setInputItemString: React.Dispatch<SetStateAction<{ core: { setting: SettingType } }>>;
};

const InputSettingWidth = <InputType extends InputCore.Commom.InputCommon, Type extends InputCore.Setting.InputSettingCommon>(
      props: TProps<InputType, Type>,
) => {
      const { inputItem, setInputItemString } = props;

      const [value, setValue] = useState<number>(inputItem.core.setting.width || 100);

      const onChange = (value: number) => {
            setInputItemString((prev) => {
                  const newSetting = structuredClone(prev);
                  newSetting.core.setting.width = value;
                  return newSetting;
            });
            setValue(value);
      };

      useEffect(() => {
            setValue(inputItem.core.setting.width);
      }, [inputItem.core.setting.width]);

      return (
            <DivNative className="flex flex-col  justify-between  ">
                  <InputSettingLabel>Chiều dài Input {value}%</InputSettingLabel>
                  <Slider defaultValue={value} onChange={onChange} min={25} max={100} trackStyle={{background: 'var(--color-main)'}}/>
            </DivNative>
      );
};

export default InputSettingWidth;
