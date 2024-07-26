import React from "react";

type TProps = {
      message: string;
};

const InputValidateSuccess = (props: TProps) => {
      const { message } = props;

      return <span className="text-[1.5rem] text-blue-500 font-bold max-w-[90%] break-all">{message}</span>;
};

export default InputValidateSuccess;
