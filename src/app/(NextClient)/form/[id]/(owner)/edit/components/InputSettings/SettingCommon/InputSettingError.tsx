import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { inputSettingText } from "@/app/_constant/input.constant";
import { InputCore } from "@/type";
import React, { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import InputSettingLabel from "../InputSettingLabel";

type TProps<InputType extends InputCore.Commom.InputCommon, SettingType extends InputCore.Setting.InputSettingCommon> = {
      inputItem: InputType;
      setInputItemString: React.Dispatch<SetStateAction<{ core: { setting: SettingType } }>>;
};
const InputSettingError = <InputType extends InputCore.Commom.InputCommon, Type extends InputCore.Setting.InputSettingCommon>(
      props: TProps<InputType, Type>,
) => {
      const { inputItem, setInputItemString } = props;

      const [error, setError] = useState<string>(inputItem.core.setting.input_error || "Nhập placehoder của bạn");
      const errorRef = useRef<HTMLDivElement | null>(null);

      const labelClick = () => {
            if (errorRef.current) {
                  errorRef.current.focus();
            }
      };

      const handleErrorInput = (e: React.ChangeEvent<HTMLDivElement>) => {
            if (errorRef.current) {
                  errorRef!.current!.textContent = e.target.textContent;
                  const errorCurrent = errorRef.current.textContent;
                  setInputItemString((prev) => {
                        const newSetting = structuredClone(prev);
                        newSetting.core.setting.input_error = errorCurrent || inputSettingText.input_error;
                        return newSetting;
                  });
            }
      };

      return (
            <DivNative className="h-max flex flex-col  justify-between gap-[.6rem]">
                  <InputSettingLabel onClick={labelClick} className="hover:cursor-pointer">
                        Nhập thông báo lỗi
                  </InputSettingLabel>
                  <DivNativeRef
                        spellCheck={false}
                        ref={errorRef}
                        contentEditable={true}
                        onBlur={handleErrorInput}
                        className="input-setting  border-[.1rem] border-[var(--border-color-input)] p-[1rem] rounded-[.4rem]  focus:outline-none"
                        data-text={`${error || inputSettingText.input_error}`}
                        suppressContentEditableWarning={true}
                  >
                        {error}
                  </DivNativeRef>
            </DivNative>
      );
};

export default InputSettingError;
