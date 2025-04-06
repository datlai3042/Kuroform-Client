import ModelAddress from "@/app/(NextClient)/_components/Model/ModelAddress";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { inputIntroduceAddress } from "@/app/_constant/inputIntroduceUI.constant";
import { RootState } from "@/app/_lib/redux/store";
import useChangeTypeInput from "@/app/hooks/useChangeTypeInput";
import { InputCore, ReactCustom, UI } from "@/type";
import { ArrowBigRight } from "lucide-react";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import InputIntroduceHeader from "../../InputIntroduce/InputIntroduceHeader";
import superAddressValidate from "@/app/(NextClient)/form/[id]/_components/InputAnswer/_validate/inputAddress.validate";
import { inititalValueInputAddress } from "@/app/_constant/input.constant";
import InputValidateError from "@/app/(NextClient)/form/[id]/_components/_common/InputValidateError";

type TProps = {
      inputItem: InputCore.InputAddress.InputTypeAddress;
      setOpenModel: ReactCustom.SetStateBoolean;
};

const InputAddressIntroduce = (props: TProps) => {
      const { inputItem } = props;

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const changeTypeInput = useChangeTypeInput();

      const [controlerInput, setControllerInput] = useState<InputCore.Commom.ControlerInput<UI.Address.AddressEnity>>({
            value: {
                  addressString: "",
                  addressValidate: inititalValueInputAddress,
                  address_full: "",
                  addressCore: "",
            },
            error: {
                  message: "",
            },
            validate: false,
      });

      const handleChooseInputType = () => {
            changeTypeInput.mutate({ form: formCore, inputItem, type: "ADDRESS" });
      };

      const onChangeAddress = (address: UI.Address.AddressEnity) => {
            const { _next, message, type } = superAddressValidate({
                  inputValue: address.address_full,
                  inputSetting: inputItem.core.setting,
                  description: address,
            });

            setControllerInput((prev) => ({
                  ...prev,
                  validate: !_next,
                  value: address,
                  error: {
                        message,
                  },
            }));
      };

      return (
            <DivNative className="w-full h-full flex flex-col  sm:pt-[4rem] ">
                  <InputIntroduceHeader title={inputIntroduceAddress.title} description={inputIntroduceAddress.description} action={handleChooseInputType} />
                  <DivNative className="h-[70%] xl:h-[50%] flex flex-col gap-[1.8rem] p-[2rem]  ">
                        <DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-color-main text-[#fff]">
                              Ví dụ
                        </DivNative>
                        <ModelAddress detail={true} onChange={onChangeAddress} />
                        <div className="flex flex-col gap-[1rem]   justify-center">
                              {controlerInput.validate ||
                                    (controlerInput.value.addressString && <span className="text-[1.4rem]">{controlerInput.value?.addressString}</span>)}
                              <button
                                    onClick={() => onChangeAddress(controlerInput.value)}
                                    className=" w-[9rem] flex items-center justify-center p-[.8rem] xl:p-[1rem] bg-color-main rounded-lg text-[1.2rem] xl:text-[1.4rem] text-[#ffffff]"
                              >
                                    Xác nhận
                              </button>

                              {controlerInput.error.message && <InputValidateError message={controlerInput.error.message} />}
                        </div>
                  </DivNative>
            </DivNative>
      );
};

export default InputAddressIntroduce;
