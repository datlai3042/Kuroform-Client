import React from "react";
import Button from "../ui/button/Button";
import { useRouter } from "next/navigation";

type TProps = {
      message: string;
};

const LayoutTokenFailure = (props: TProps) => {
      const { message } = props;
      const router = useRouter();
      return (
            <div className="mt-[-12rem] relative inset-0  h-screen px-[2rem] flex flex-col gap-[1rem] justify-center items-center">
                  <p className="font-bold text-[3rem] text-color-main">{message}</p>
                  <Button textContent="Về trang chủ" className="!bg-color-main text-[#fff] w-full" onClick={() => router.push("/dashboard")} />
            </div>
      );
};

export default LayoutTokenFailure;
