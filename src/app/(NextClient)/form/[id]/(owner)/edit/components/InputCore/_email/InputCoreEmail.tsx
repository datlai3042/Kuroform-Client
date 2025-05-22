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
import { renderInputStyles } from "@/app/utils/form.utils";

type TProps = {
      inputItem: TInputCore.InputEmail.InputTypeEmail;
      isDrap?: boolean;

};

const InputCoreEmail = (props: TProps) => {
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
      const form_mode_display = formCore.form_mode_display === "custom";

      const { inputItem, isDrap } = props;
      const inputRef = useRef<HTMLInputElement | null>(null);

      const title = inputItem.input_title ? inputItem.input_title : "";

      const [inputValue, setInputValue] = useState<string>("");
      const [error, setError] = useState<boolean>(false);
      const { modeScreen } = useContext(FormModeScreenContext);
      const [active,setActive] = useState(false)

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
            <DivNative className="flex flex-col gap-[.8rem] bg-transparent">
                  <SpanNative
                        style={{ color: formCore.form_input_styles.color || "var(--text-text-theme)" }}
                        textContent="Nhập email của bạn"
                        className={`${form_mode_display ? "group-hover:!text-[#ffffff]" : "text-text-theme "} text-[1.6rem] font-medium`}
                  />
                  <DivNative
                        style={{ ...renderInputStyles(formCore.form_input_styles) }}
                        className={`text-text-theme relative min-h-[5rem] h-max flex items-center gap-[.5rem] border-[.1rem] border-[var(--border-color-input)] focus:border-transparent  rounded-lg`}
                  >
                        <input
                              className="w-[80%]  h-full p-[1rem] rounded-lg text-[1.6rem]   bg-transparent   outline-none   "
                              ref={inputRef}
                              onKeyDown={onPressEnter}
                              onChange={(e) => setInputValue(e.target.value)}
                              onBlur={onBlur}
                              placeholder={inputItem.core.setting.placeholder}
                        />
                        <AtSign className="absolute z-[2] right-[1rem]  opacity-50" size={18} />
                  </DivNative>
                  {error && (
                        <SpanNative
                              className="mt-[1rem] flex group-focus:hidden opacity-55"
                              tabIndex={-1}
                              textContent="
					Email khong dung dinh dang"
                        />
                  )}
            </DivNative>
      );

      return <InputCore isDrap={isDrap} inputItem={inputItem} InputComponent={InputEmail} inputTitle={title} />;
};

export default InputCoreEmail;
