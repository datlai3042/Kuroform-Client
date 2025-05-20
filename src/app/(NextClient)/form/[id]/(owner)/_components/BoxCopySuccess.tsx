import { Check } from "lucide-react";
import React from "react";

type TProps = {
      message: string;
};

const BoxCopySuccess = (props: TProps) => {
      const { message } = props;

      return (
            <div className="w-max min-h-[3rem] flex items-center gap-[1rem]   text-[#fff] px-[2rem] rounded-lg  bg-color-main border-[.1rem] border-[var(--border-color-input)] ">
                  {message}
                  <Check size={16} />
            </div>
      );
};

export default BoxCopySuccess;
