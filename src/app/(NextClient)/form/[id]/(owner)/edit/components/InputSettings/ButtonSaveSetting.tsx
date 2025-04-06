import LoadingSpinner from "@/app/(NextClient)/_components/ui/loading/LoadingSpinner";
import React from "react";

type TProps = {
    showLoading?: boolean
    onSubmit: () => void
}

const ButtonSaveSetting = (props: TProps) => {

    const {showLoading, onSubmit} = props

      return (
            <button
                  onClick={(e) =>  {
                    e.stopPropagation()
                    onSubmit()
                  }}
                  className="ml-auto bg-color-main flex items-center justify-center gap-[1rem] min-w-max p-[.5rem_.6rem] text-[1.3rem] text-[#ffffff] rounded-[.4rem]"
            >
                  <span>Lưu thiết lập</span>
                  {showLoading && <LoadingSpinner color="#fff" width="min-w-[2.4rem]" height="min-h-[2.4rem]" />}
            </button>
      );
};

export default ButtonSaveSetting;
