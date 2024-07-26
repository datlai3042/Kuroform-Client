import React from "react";

type TProps = {
      onClose: (state: boolean) => void;
};

const IconClose = (props: TProps) => {
      const { onClose } = props;

      return (
            <button
                  className="w-[3rem] h-[3rem] xl:w-[4rem] xl:h-[4rem] bg-[#ffffff] flex items-center justify-center rounded-full shadow text-[12px] text-color-main font-semibold"
                  onClick={() => onClose(false)}
            >
                  X
            </button>
      );
};

export default IconClose;
