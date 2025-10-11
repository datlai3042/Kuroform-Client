import { OctagonAlert } from "lucide-react";
import React from "react";

const InputError = ({
  message = "Ops, Có lỗi gì đó đâu đây",
}: {
  message?: string;
}) => {
  return (
    <div className=" min-h-[1rem] flex items-center text-[1.4rem] text-[rgb(230_105_105)] font-bold bg-[rgb(251_213_213)]">
      <div className="p-[.6rem_1rem] w-[9rem] flex-center">
        <OctagonAlert className="ml-[-.9rem]"/>
      </div>
      {<p>{message}</p>}
    </div>
  );
};

export default InputError;
