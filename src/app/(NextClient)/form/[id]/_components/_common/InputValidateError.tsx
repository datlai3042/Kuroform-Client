import React from "react";

type TProps = {
      message: string;
};

const InputValidateError = (props: TProps) => {
      const { message } = props;

      return <span className="text-[1.4rem] text-red-800 font-bold">{message}</span>;
};

export default InputValidateError;
