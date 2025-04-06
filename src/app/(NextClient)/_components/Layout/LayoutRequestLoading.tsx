import React from "react";
import LoadingSpinner from "../ui/loading/LoadingSpinner";

type TProps = {
      message: string;
};

const LayoutRequestLoading = (props: TProps) => {
      const { message } = props;

      return (
            <div className="mt-[-12rem] relative inset-0 max h-screen  flex justify-center items-center gap-[4rem]">
                  <LoadingSpinner color="#0bceb2" />

                  <p className="font-bold text-[3rem] text-[#0bceb2]">{message}</p>
            </div>
      );
};

export default LayoutRequestLoading;
