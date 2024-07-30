import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { regexPhoneVietNam } from "@/app/(NextClient)/form/[id]/_components/InputAnswer/_validate/inputPhone.validate";
import { inputIntroduceAnchor, inputIntroducePhone } from "@/app/_constant/inputIntroduceUI.constant";
import { RootState } from "@/app/_lib/redux/store";
import useChangeTypeInput from "@/app/hooks/useChangeTypeInput";
import { InputCore, ReactCustom } from "@/type";
import { ArrowBigRight, AtSign } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputIntroduceHeader from "../../InputIntroduce/InputIntroduceHeader";
import superAnchorValidate from "@/app/(NextClient)/form/[id]/_components/InputAnswer/_validate/inputAnchor.validate";
import InputValidateError from "@/app/(NextClient)/form/[id]/_components/_common/InputValidateError";
import InputValidateSuccess from "@/app/(NextClient)/form/[id]/_components/_common/InputValidateSuccess";

type TProps = {
      inputItem: InputCore.InputAnchor.InputTypeAnchor;
      setOpenModel: ReactCustom.SetStateBoolean;
};

const InputAnchorIntroduce = (props: TProps) => {
      const { inputItem, setOpenModel } = props;

      const changeTypeInput = useChangeTypeInput();
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

      const handleChooseInputType = () => {
            changeTypeInput.mutate({ form: formCore, inputItem, type: "ANCHOR" });
      };

      const [controlerInput, setControllerInput] = useState<InputCore.Commom.ControlerInput<{ href: string }>>({
            value: {
                  href: "",
            },
            error: {
                  message: "",
            },
            validate: false,
      });

      const onValidate = () => {
            const { _next, message, type } = superAnchorValidate({ inputValue: controlerInput.value.href, inputSetting: inputItem.core.setting });
            if (_next) {
                  setControllerInput((prev) => ({ ...prev, error: { message: "" }, validate: true }));
            } else {
                  setControllerInput((prev) => ({ ...prev, error: { message }, validate: false }));
            }
      };

      const onChangeValue = (valueInput: string) => {
            setControllerInput((prev) => ({ ...prev, value: { href: valueInput } }));
      };

      return (
            <DivNative className="w-full h-full flex flex-col py-[1rem] ">
                  <InputIntroduceHeader title={inputIntroduceAnchor.title} description={inputIntroduceAnchor.description} action={handleChooseInputType} />
                  <DivNative className="h-[50%] flex flex-col gap-[2.6rem] p-[3rem_2rem]">
                        <DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-gray-200  text-gray-400">
                              Ví dụ
                        </DivNative>
                        <DivNative className="flex flex-col gap-[1rem]">
                              <SpanNative textContent="Nhập đường dẫn" className="text-[1.6rem] font-bold" />
                              <DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
                                    <input
                                          value={controlerInput.value.href}
                                          onChange={(e) => onChangeValue(e.target.value)}
                                          className="w-full h-full p-[1rem] rounded-lg text-[1.6rem]   border-[.1rem] border-gray-400  outline-none focus:outline-blue-200 focus:border-transparent text-[#000]"
                                          placeholder="Nhập đường dẫn liên kết của bạn"
                                    />
                                    <div className="absolute z-[2] right-[1rem]  opacity-70">www</div>
                              </DivNative>
                              <div className="flex flex-col h-[8rem] gap-[1rem]   justify-center">
                                    {controlerInput.validate && controlerInput.value.href && <InputValidateSuccess message={"Đường dẫn hợp lệ"} />}
                                    <button
                                          onClick={onValidate}
                                          className=" w-[9rem] flex items-center justify-center p-[.8rem] xl:p-[1rem] bg-blue-600 rounded-lg text-[1.2rem] xl:text-[1.4rem] text-[#ffffff]"
                                    >
                                          Xác nhận
                                    </button>
                                    {controlerInput.error.message && <InputValidateError message={controlerInput.error.message} />}
                              </div>
                        </DivNative>
                  </DivNative>
            </DivNative>
      );
};

export default InputAnchorIntroduce;
