import React, { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { AtSign } from "lucide-react";
import { validateEmail } from "@/app/_lib/utils";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import { FormCore, InputCore as TInputCore } from "@/type";
import { inputSettingText } from "@/app/_constant/input.constant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import InputCore from "../InputCore";

type TProps = {
      inputItem: TInputCore.InputEmail.InputTypeEmail;
};

const InputCoreEmail = (props: TProps) => {
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
      const form_mode_display = formCore.form_mode_display === "custom";

      const { inputItem } = props;
      const inputRef = useRef<HTMLInputElement | null>(null);

      const title = inputItem.input_title ? inputItem.input_title : "";

      const [inputValue, setInputValue] = useState<string>("");
      const [error, setError] = useState<boolean>(false);
      const { modeScreen } = useContext(FormModeScreenContext);

      const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                  if (modeScreen === "FULL") {
                        const checkvalidate = validateEmail(inputValue);
                        return checkvalidate ? setError(false) : setError(true);
                  }
            }
      };

      const onBlur = () => {
            if (!inputValue) return;
            const checkvalidate = validateEmail(inputValue);
            return checkvalidate ? setError(false) : setError(true);
      };

      useEffect(() => {
            if (inputRef.current) {
                  inputRef.current.value = "";
                  setError(false);
            }
      }, [modeScreen]);

      const InputEmail = (
            <DivNative className="flex flex-col gap-[.3rem] ">
                  <SpanNative
                        textContent="Nhập email của bạn"
                        className={`${form_mode_display ? "group-hover:!text-[#ffffff]" : "text-text-theme "} text-[1.6rem] font-semibold`}
                  />
                  <DivNative
                        className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] border-[.1rem] bg-[#fff] border-gray-400 focus:border-transparent  rounded-lg`}
                  >
                        <input
                              className="w-[80%] h-full p-[1rem] rounded-lg text-[1.6rem]     outline-none   text-[#000]"
                              ref={inputRef}
                              onKeyDown={onPressEnter}
                              onChange={(e) => setInputValue(e.target.value)}
                              onBlur={onBlur}
                              placeholder={inputItem.core.setting.placeholder}
                        />
                        <AtSign className="absolute z-[2] right-[1rem] text-textMain opacity-50" size={18} />
                  </DivNative>
                  {error && (
                        <SpanNative
                              className="flex group-focus:hidden opacity-55"
                              tabIndex={-1}
                              textContent="
					Email khong dung dinh dang"
                        />
                  )}
            </DivNative>
      );

      return <InputCore inputItem={inputItem} InputComponent={InputEmail} inputTitle={title} />;
};

export default InputCoreEmail;
