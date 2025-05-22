import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { FormCore, InputCore } from "@/type";
import { useMutation } from "@tanstack/react-query";
import FormService from "@/app/_services/form.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import useUpdateInputSetting from "@/app/hooks/useUpdateInputSetting";
import InputSettingRequire from "../../InputSettings/SettingCommon/InputSettingRequire";
import InputSettingPlaceholder from "../../InputSettings/SettingCommon/InputSettingPlaceholder";
import InputSettingMinLength from "../../InputSettings/SettingCommon/InputSettingMinLength";
import InputSettingMaxLength from "../../InputSettings/SettingCommon/InputSettingMaxLength";
import InputSettingError from "../../InputSettings/SettingCommon/InputSettingError";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import { addOneToastError } from "@/app/_lib/redux/toast.slice";

import { v4 } from "uuid";
import InputSettingErrorState from "../../InputSettings/SettingCommon/InputSettingErrorState";
import LoadingSpinner from "@/app/(NextClient)/_components/ui/loading/LoadingSpinner";
import ButtonSaveSetting from "../../InputSettings/ButtonSaveSetting";
import InputSettingWidth from "../../InputSettings/SettingCommon/InputSettingWidth";

/*
      require
      placeholder,
      minLength,
      maxLength,
      error
*/

type TProps = {
      inputItem: InputCore.InputForm;
      setOpenModel: React.Dispatch<SetStateAction<boolean>>;
};

const InputSettingText = (props: TProps) => {
      const { inputItem, setOpenModel } = props;
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

      const color = formCore.form_title.form_title_color ? formCore.form_title.form_title_color : formCore.form_setting_default.form_title_color_default;
      const dispatch = useDispatch();
      const [inputItemString, setInputItemString] = useState<InputCore.Commom.InputCommonText>(() => {
            return {
                  core: {
                        setting: inputItem.core.setting,
                  },
            } as InputCore.Commom.InputCommonText;
      });

      const { updateTypeInputMutation } = useUpdateInputSetting<InputCore.Setting.InputSettingCommon>();

      const handleSaveSetting = () => {
            if (inputItemString.core.setting.minLength > inputItemString.core.setting.maxLength) {
                  dispatch(
                        addOneToastError({
                              toast_item: { _id: v4(), toast_title: "Lỗi cài đặt Input", type: "ERROR", core: { message: "Min không thể lớn Max" } },
                        }),
                  );
                  return;
            }
            const newForm = structuredClone(formCore);
            newForm.form_inputs = newForm.form_inputs.filter((ip) => {
                  if (ip._id !== inputItem._id) return ip;
                  (ip.core.setting as unknown as InputCore.Commom.InputCommonText) = inputItemString;
                  return ip;
            });

            updateTypeInputMutation.mutate({
                  form: newForm,
                  input_id: inputItem._id!,
                  input_id_setting: inputItemString.core.setting,
            });
      };

      useEffect(() => {
            if (updateTypeInputMutation.isSuccess) {
                  setOpenModel(false);
            }
      }, [updateTypeInputMutation.isSuccess, setOpenModel]);

      return (
            <DivNative className="h-max flex flex-col gap-[1rem]">
                  <InputSettingRequire<InputCore.Commom.InputCommonText, InputCore.Setting.InputSettingTextCommon>
                        inputItem={inputItemString}
                        setInputItemString={setInputItemString}
                  />
                  <InputSettingPlaceholder inputItem={inputItemString} setInputItemString={setInputItemString} />
                  <InputSettingMinLength inputItem={inputItemString} setInputItemString={setInputItemString} />
                  <InputSettingMaxLength inputItem={inputItemString} setInputItemString={setInputItemString} />
                  <InputSettingErrorState inputItem={inputItemString} setInputItemString={setInputItemString} />
                  <InputSettingWidth inputItem={inputItemString} setInputItemString={setInputItemString} />
                  {inputItemString.core.setting.input_error_state && (
                        <InputSettingError<InputCore.Commom.InputCommonText, InputCore.Setting.InputSettingTextCommon>
                              inputItem={inputItemString}
                              setInputItemString={setInputItemString}
                        />
                  )}
                  {/* <ButtonNative textContent="Lưu" onClick={(e) => handleSaveSetting(e)} className="w-[14rem] h-[4rem] text-[#ffffff] rounded-lg" /> */}

                  <ButtonSaveSetting showLoading={updateTypeInputMutation.isPending} onSubmit={handleSaveSetting} />
            </DivNative>
      );
};

export default InputSettingText;
