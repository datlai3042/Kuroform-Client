import { FormCore, InputCore, UI } from "@/type";
import { SetStateAction } from "react";
import { superTextValidate } from "../_validate/inputText.validate";
import { superEmailValidate } from "../_validate/inputEmail.validate";
import { REQUIRE_ERROR } from "@/app/_constant/input.constant";
import { superPhoneValidate } from "../_validate/inputPhone.validate";
import { superVoteValidate } from "../_validate/inputVote.validate";
import { superDateValidate } from "../_validate/inputDate.validate";
import superAddressValidate from "../_validate/inputAddress.validate";
import { ScorllDataItem } from "@/app/(NextClient)/_components/Model/ModelScrollList";
import superAnchorValidate from "../_validate/inputAnchor.validate";

//thêm lỗi của input vào global

export const setErrorGlobal = (
      cb: React.Dispatch<SetStateAction<FormCore.FormAnswer.FormAnswerControl>>,
      input_id: string,
      title: string,
      type: InputCore.Commom.ErrorText,
      message: string,
) => {
      cb((prev) => {
            let newArray = [];
            let newObj: FormCore.FormAnswer.FormAnswerControl = structuredClone(prev);
            if (prev.inputFormErrors.some((ip) => ip._id === input_id)) {
                  newArray = prev.inputFormErrors.map((ipr) => {
                        if (ipr._id === input_id) {
                              ipr.title = title as string;
                              ipr.type = type as InputCore.Commom.ErrorText;
                              ipr.message = message;
                              return ipr;
                        }
                        return ipr;
                  });

                  return { ...newObj, inputFormErrors: newArray };
            }
            newArray = [...newObj.inputFormErrors];
            let inputErrorInfo: FormCore.FormAnswer.InputFormError = {
                  _id: input_id,
                  title: title as string,
                  type: type as InputCore.Commom.ErrorText,
                  message,
            };
            newArray.push(inputErrorInfo);
            newObj.inputFormErrors = newArray;

            return newObj;
      });
};

//xóa lỗi của input_id ra khỏi lỗi global
export const deleteErrorGlobal = (cb: React.Dispatch<SetStateAction<FormCore.FormAnswer.FormAnswerControl>>, input_id: string) => {
      cb((prev) => {
            let newArray = structuredClone(prev);
            newArray.inputFormErrors = newArray.inputFormErrors.filter((ip) => {
                  if (ip._id !== input_id) return ip;
                  return null;
            });
            return newArray;
      });
};

//đặt lại cờ require của input trong mảng global
export const setInputRequireGlobal = (cb: React.Dispatch<SetStateAction<FormCore.FormAnswer.FormAnswerControl>>, input_id: string, newRuleRequire: boolean) => {
      cb((prev) => {
            let newArray = structuredClone(prev);
            newArray.inputFormRequire = prev.inputFormRequire.map((ip) => {
                  if (ip._id === input_id) {
                        ip.checkRequire = newRuleRequire;
                        return ip;
                  }
                  return ip;
            });
            return newArray;
      });
};

//đặt data của input trong mảng global
export const setDataInputGlobal = <T extends FormCore.FormAnswer.Data.InputData["value"]>({
      callback,
      input_id,
      input_value,
}: {
      callback: React.Dispatch<SetStateAction<FormCore.FormAnswer.FormAnswerControl>>;
      input_id: string;
      input_value: T;
}) => {
      callback((prev) => {
            let newArray = structuredClone(prev);
            console.log({ input_value });
            newArray.inputFormData = prev.inputFormData.map((ip) => {
                  if (ip._id === input_id && ip.type === "OPTION_MULTIPLE") {
                        ip.value = input_value as string[];
                        return ip;
                  }

                  if (ip._id === input_id) {
                        ip.value = input_value || "";
                        return ip;
                  }
                  return ip;
            });
            return newArray;
      });
};

export const checkInputAnswerType = <T extends FormCore.FormAnswer.Data.InputData>(
      inputItem: FormCore.FormAnswer.Data.InputData,
      type: InputCore.InputForm["type"],
): inputItem is T => {
      return inputItem.type === type;
};

export const checkErrorFinal = (
      newArrayErrorGlobal: FormCore.FormAnswer.InputFormError[] = [],
      inputFormErrors: FormCore.FormAnswer.InputFormError[],
      inputFormData: FormCore.FormAnswer.InputFormData[],
) => {
      inputFormData.map((ip) => {
            const ipError = inputFormErrors.filter((ipr) => ipr._id === ip._id && ip.setting?.require)[0];

            if (ipError) {
                  newArrayErrorGlobal.push(ipError);
                  return;
            }
            // validate input chữ
            if (!ipError && ip.type === "TEXT") {
                  const { _next, message, type } = superTextValidate({
                        inputValue: ip.value as string,
                        inputSetting: ip.setting as InputCore.Setting.InputSettingTextCommon,
                  });
                  if (_next) return;
                  const inputErrorInfo: FormCore.FormAnswer.InputFormError = {
                        _id: ip._id,
                        title: ip.title,
                        type: type as InputCore.Commom.ErrorText,
                        message,
                  };

                  newArrayErrorGlobal.push(inputErrorInfo);
            }

            //validate input email
            if (!ipError && ip.type === "EMAIL") {
                  const { _next, message, type } = superEmailValidate({
                        inputValue: ip.value as string,
                        inputSetting: ip.setting as InputCore.Setting.InputSettingTextCommon,
                  });
                  if (_next) return;
                  const inputErrorInfo: FormCore.FormAnswer.InputFormError = {
                        _id: ip._id,
                        title: ip.title,
                        type: type as InputCore.Commom.ErrorText,
                        message,
                  };

                  newArrayErrorGlobal.push(inputErrorInfo);
            }

            //validate input số điện thoại
            if (!ipError && ip.type === "PHONE") {
                  const { _next, message, type } = superPhoneValidate({
                        inputValue: ip.value as string,
                        inputSetting: ip.setting as InputCore.Setting.InputSettingTextCommon,
                  });
                  if (_next) return;
                  const inputErrorInfo: FormCore.FormAnswer.InputFormError = {
                        _id: ip._id,
                        title: ip.title,
                        type: type as InputCore.Commom.ErrorText,
                        message,
                  };

                  newArrayErrorGlobal.push(inputErrorInfo);
            }

            //validate input đánh giá
            if (!ipError && ip.type === "VOTE") {
                  const { _next, message, type } = superVoteValidate({
                        inputValue: ip.value as string,
                        inputSetting: ip.setting as InputCore.Setting.InputSettingTextCommon,
                  });
                  if (_next) return;
                  const inputErrorInfo: FormCore.FormAnswer.InputFormError = {
                        _id: ip._id,
                        title: ip.title,
                        type: type as InputCore.Commom.ErrorText,
                        message,
                  };

                  newArrayErrorGlobal.push(inputErrorInfo);
            }

            //validate input ngày
            if (!ipError && ip.type === "DATE") {
                  const { _next, message, type } = superDateValidate({
                        inputValue: ip.value as string,
                        inputSetting: ip.setting as InputCore.Setting.InputSettingTextCommon,
                  });
                  if (_next) return;
                  const inputErrorInfo: FormCore.FormAnswer.InputFormError = {
                        _id: ip._id,
                        title: ip.title,
                        type: type as InputCore.Commom.ErrorText,
                        message,
                  };

                  newArrayErrorGlobal.push(inputErrorInfo);
            }

            //validate input 1 chọn
            if (!ipError && ip.type === "OPTION" && ip.value) {
                  return;
            }

            if (!ipError && ip.type === "OPTION" && !ip.value && ip.setting?.require) {
                  const inputErrorInfo: FormCore.FormAnswer.InputFormError = {
                        _id: ip._id,
                        title: ip.title,
                        type: "REQUIRE",
                        message: REQUIRE_ERROR,
                  };
                  newArrayErrorGlobal.push(inputErrorInfo);
            }

            //validate input nhiều chọn
            if (!ipError && ip.type === "OPTION_MULTIPLE" && ip.value.length > 0) {
                  return;
            }

            if (!ipError && ip.type === "OPTION_MULTIPLE" && ip.value.length === 0 && ip.setting?.require) {
                  const inputErrorInfo: FormCore.FormAnswer.InputFormError = {
                        _id: ip._id,
                        title: ip.title,
                        type: "REQUIRE",
                        message: REQUIRE_ERROR,
                  };
                  newArrayErrorGlobal.push(inputErrorInfo);
            }

            //validate input file upload
            if (!ipError && ip.type === "FILE_IMAGE" && ip.value.length > 0) {
                  return;
            }

            if (!ipError && ip.type === "FILE_IMAGE" && ip.value.length === 0 && ip.setting?.require) {
                  const inputErrorInfo: FormCore.FormAnswer.InputFormError = {
                        _id: ip._id,
                        title: ip.title,
                        type: "REQUIRE",
                        message: REQUIRE_ERROR,
                  };
                  newArrayErrorGlobal.push(inputErrorInfo);
            }

            if (!ipError && ip.type === "ADDRESS" && ip.setting && checkInputAnswerType<FormCore.FormAnswer.Data.Address>(ip, "ADDRESS")) {
                  const { _next, message, type } = superAddressValidate({ inputValue: ip.value, inputSetting: ip.setting });
                  if (!_next) {
                        const inputErrorInfo: FormCore.FormAnswer.InputFormError = {
                              _id: ip._id,
                              title: ip.title,
                              type,
                              message: message,
                        };
                        newArrayErrorGlobal.push(inputErrorInfo);
                  }
            }

            if (!ipError && ip.type === "ANCHOR" && ip.setting && checkInputAnswerType<FormCore.FormAnswer.Data.Anchor>(ip, "ANCHOR")) {
                  const { _next, message, type } = superAnchorValidate({ inputValue: ip.value, inputSetting: ip.setting });
                  if (!_next) {
                        const inputErrorInfo: FormCore.FormAnswer.InputFormError = {
                              _id: ip._id,
                              title: ip.title,
                              type,
                              message: message,
                        };
                        newArrayErrorGlobal.push(inputErrorInfo);
                  }
            }
      });

      return newArrayErrorGlobal;
};

export const setErrorInputFromGlobal = (input_id: string, inputFormErrors: FormCore.FormAnswer.InputFormError[]) => {
      let instanceError: FormCore.FormAnswer.InputError = {} as FormCore.FormAnswer.InputError;
      const temp = inputFormErrors.filter((dataError) => {
            if (dataError._id === input_id) {
                  return dataError;
            }
      })[0];

      instanceError = {
            error: !!temp,
            message: temp?.message,
            type: temp?.type,
      };
      return instanceError;
};

export const renderErrorInput = (inputFormErrors: FormCore.FormAnswer.InputFormError[], inputItem: InputCore.InputForm) => {
      let instanceError: FormCore.FormAnswer.InputError = {} as FormCore.FormAnswer.InputError;
      const temp = inputFormErrors.filter((dataError) => {
            if (dataError._id === inputItem._id) {
                  return dataError;
            }
      })[0];
      instanceError = {
            error: !!temp,
            message: temp?.message,
            type: temp?.type,
      };
      return instanceError;
};
let _text = ["EMAIL", "PHONE", "VOTE", "FILE_IMAGE", "ANCHOR"];
let _option = ["OPTION", "OPTION_MULTIPLE"];
let _address = ["ADDRESS"];
export const renderControllerInputAnswer = <T extends FormCore.FormAnswer.Data.InputData>({
      inputItem,
      inputFormErrors,
      inputFormData,
}: {
      inputItem: InputCore.InputForm;
      inputFormErrors: FormCore.FormAnswer.InputFormError[];
      inputFormData: FormCore.FormAnswer.Data.InputData[];
}): FormCore.FormAnswer.ControlerInputAnswer<T> => {
      let controller: FormCore.FormAnswer.ControlerInputAnswer<T> = {} as FormCore.FormAnswer.ControlerInputAnswer<T>;
      const inputItemInGlobal = inputFormErrors.filter((input_error) => {
            if (input_error._id === inputItem._id) return input_error;
      });

      const inputItemData = inputFormData?.filter((input_data) => {
            if (input_data._id === inputItem._id && input_data.type === inputItem.type) return input_data;
      });

      if (_text.includes(inputItem.type)) {
            controller = {
                  require: inputItem.core.setting.require,
                  globalError: {
                        state: inputItemInGlobal[0] ? true : false,
                        message: inputItemInGlobal[0]?.message || "",
                        type: inputItemInGlobal[0]?.type || null,
                  },
                  input: inputItemData[0] as T,
            };
      }

      if (_option.includes(inputItem.type)) {
            controller = {
                  require: inputItem.core.setting.require,
                  globalError: {
                        state: inputItemInGlobal[0] ? true : false,
                        message: inputItemInGlobal[0]?.message || "",
                        type: inputItemInGlobal[0]?.type || null,
                  },
                  input: inputItemData[0] as T,
            };
      }

      if (_address.includes(inputItem.type)) {
            controller = {
                  require: inputItem.core.setting.require,
                  globalError: {
                        state: inputItemInGlobal[0] ? true : false,
                        message: inputItemInGlobal[0]?.message || "",
                        type: inputItemInGlobal[0]?.type || null,
                  },
                  input: inputItemData[0] as T,
            };
      }

      return controller;
};

export const deleteErrorWhenFocus = (props: FormCore.FormAnswer.Common.DeleteErrorWhenFocusProps) => {
      const { error, inputItem, inputFormErrors, setError, setFormAnswer } = props;

      if (error.error) {
            setError((prev) => ({ ...prev, error: false, type: null }));
      }

      if (inputFormErrors.some((ip) => ip._id === inputItem._id)) {
            deleteErrorGlobal(setFormAnswer, inputItem._id!);
      }
      if (inputItem.core.setting.require) {
            setInputRequireGlobal(setFormAnswer, inputItem._id!, false);
      }
};

export const validateWhenFocus = <T extends InputCore.InputForm["core"]["setting"]>(props: FormCore.FormAnswer.Common.ValidateWhenBlur<T>) => {
      const { inputValue, inputItem, setError, setFormAnswer, validateCallback } = props;
      const { setting } = inputItem.core;
      const checkvalidate = validateCallback({ inputValue, inputSetting: setting as T });
      const { _next, message, type } = checkvalidate;
      if (_next) {
            if (inputItem.core.setting.require) {
                  setInputRequireGlobal(setFormAnswer, inputItem._id!, true);
            }

            if (inputItem.type === "ADDRESS") {
                  setDataInputGlobal<FormCore.FormAnswer.Data.Address["value"]>({ callback: setFormAnswer, input_id: inputItem._id!, input_value: inputValue });
                  return { _next, message, type };
            }
            setDataInputGlobal({ callback: setFormAnswer, input_id: inputItem._id!, input_value: inputValue });

            return { _next, message, type };
      }

      // Catch lỗi
      setError && setError((prev) => ({ ...prev, error: true, message, type }));
      setDataInputGlobal({ callback: setFormAnswer, input_id: inputItem._id!, input_value: inputValue });

      setErrorGlobal(setFormAnswer, inputItem._id!, inputItem.input_title || "", type!, message);
      return { _next, message, type };
};

export const renderOptionModelAddress = (option: UI.Address.AddressValidate | undefined, index: number) => {
      return {
            label: option ? option[index]?.name_with_type : "",
            value: option ? option[index]?.code : "",
            name_with_type: option ? option[index]?.name_with_type : "",
            path_with_type: option ? option[index]?.path_with_type : "",
      };
};
