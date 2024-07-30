import { FormCore, InputCore as TInputCore, UI } from "@/type";
import React, { useMemo, useState } from "react";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import InputCore from "../InputCore";
import superAddressValidate from "@/app/(NextClient)/form/[id]/_components/InputAnswer/_validate/inputAddress.validate";
import ModelAddress from "@/app/(NextClient)/_components/Model/ModelAddress";
import { inititalValueInputAddress } from "@/app/_constant/input.constant";
import InputValidateError from "@/app/(NextClient)/form/[id]/_components/_common/InputValidateError";
import InputValidateSuccess from "@/app/(NextClient)/form/[id]/_components/_common/InputValidateSuccess";

type TProps = {
      inputItem: TInputCore.InputAddress.InputTypeAddress;
};

const InputCoreAddress = (props: TProps) => {
      const { inputItem } = props;

      const [controlerInput, setControllerInput] = useState<TInputCore.Commom.ControlerInput<UI.Address.AddressEnity>>({
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

      const onChangeAddress = (address: UI.Address.AddressEnity) => {

            const { _next, message, type } = superAddressValidate({
                  inputValue: address,
                  inputSetting: inputItem.core.setting,
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

      const InputAddress = (
            <div className="flex flex-col gap-[2rem]">
                  <ModelAddress detail={true} onChange={onChangeAddress} />
                  <div className="flex flex-col h-[8rem] gap-[1rem]   justify-center">
                        {(controlerInput.validate || controlerInput.value.addressString) && (
                              <InputValidateSuccess message={controlerInput.value.addressString} />
                        )}
                        <button
                              onClick={() => onChangeAddress(controlerInput.value)}
                              className=" w-[9rem] flex items-center justify-center p-[.8rem] xl:p-[1rem] bg-color-btn-primarily rounded-lg text-[1.2rem] xl:text-[1.4rem] text-[#ffffff]"
                        >
                              Xác nhận
                        </button>

                        {controlerInput.error.message && <InputValidateError message={controlerInput.error.message} />}
                  </div>
            </div>
      );

      return (
            <InputCore
                  InputComponent={InputAddress}
                  inputItem={inputItem}
                  inputTitle={inputItem.input_title || ""}
                  dataTextTitle="Thêm tiêu đề cho phần địa chỉ"
            />
      );
};

export default InputCoreAddress;
