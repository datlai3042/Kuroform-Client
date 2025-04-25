import { FormCore, InputCore as TInputCore } from "@/type";
import React, { useMemo, useState } from "react";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { regexPhoneVietNam } from "@/app/(NextClient)/form/[id]/_components/InputAnswer/_validate/inputPhone.validate";
import InputCore from "../InputCore";
import { renderInputStyles } from "@/app/utils/form.utils";

type TProps = {
      inputItem: TInputCore.InputPhone.InputTypePhone;
};

const InputCorePhone = (props: TProps) => {
      const { inputItem } = props;
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
      const form_mode_display = formCore.form_mode_display === "custom";

      const [phone, setPhone] = useState<number>(0);

      const InputPhone = (
            <DivNative
                  style={{ color: formCore.form_input_styles.color || "var(--text-text-theme)" }}
                  className="flex flex-col gap-[1rem] text-text-theme  bg-transparent"
            >
                  <SpanNative
                        textContent="Số điện thoại"
                        className={` text-[1.6rem] font-medium`}
                  />
                  <DivNative
                        style={{ ...renderInputStyles(formCore.form_input_styles) }}
                        className={` relative min-h-[5rem]   p-[1rem] border-[.1rem] rounded-[.4rem] border-[var(--border-color-input)] h-max flex items-center gap-[.5rem] `}
                  >
                        <input
                              value={phone}
                              type="number"
                              className="w-full h-full border-none focus:border-none  rounded-lg text-[1.6rem]  bg-transparent    outline-none  focus:border-transparent"
                              placeholder="Nhập số điện thoại của bạn"
                              onChange={(e) => setPhone(+e.target.value)}
                        />
                  </DivNative>
                  {phone != 0 && !phone.toString().match(regexPhoneVietNam) && (
                        <>
                              <span className="text-[1.4rem]">Số điện thoại bạn nhập không hợp lệ</span>

                              <span>Input này chỉ chấp nhập giá trị là số</span>
                        </>
                  )}

                  {phone != 0 && phone.toString().match(regexPhoneVietNam) && (
                        <>
                              <span className="text-[1.4rem]">Số điện thoại bạn nhập hợp lệ</span>
                        </>
                  )}
            </DivNative>
      );

      return (
            <InputCore
                  InputComponent={InputPhone}
                  inputItem={inputItem}
                  inputTitle={inputItem.input_title || ""}
                  dataTextTitle="Thêm tiêu đề cho số điện thoại"
            />
      );
};

export default InputCorePhone;
