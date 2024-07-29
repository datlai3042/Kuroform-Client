import { FormCore, InputCore } from "@/type";
import React from "react";
import InputErrorMessage from "./InputAnswer/InputError/InputErrorMessage";

type TProps = {
      inputItem: InputCore.InputForm;
      inputItemInArrayGlobal: FormCore.FormAnswer.ControlerInputAnswer<FormCore.FormAnswer.Data.InputData>;
};

const BoxHandlerInputAnswerErrorMsg = (props: TProps) => {
      const { inputItem, inputItemInArrayGlobal } = props;
      return (
            <InputErrorMessage
                  message={inputItem.core.setting.input_error_state ? inputItem.core.setting.input_error : inputItemInArrayGlobal?.globalError?.message}
                  type={inputItemInArrayGlobal?.globalError?.type}
            />
      );
};

export default BoxHandlerInputAnswerErrorMsg;
