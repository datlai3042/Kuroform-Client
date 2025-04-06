import React from "react";

type TProps = {
      message: string;
};

const LayoutTokenFailure = (props: TProps) => {
      const { message } = props;

      return (
            <div className="mt-[-12rem] relative inset-0  h-screen px-[2rem] flex justify-center items-center">
                  <p className="font-bold text-[3rem] text-color-main">{message}</p>
            </div>
      );
};

export default LayoutTokenFailure;
