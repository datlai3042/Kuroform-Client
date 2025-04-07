import Image from "next/image";
import React from "react";

type TProps = {
      content?: string;
      gap?: string;
      className?: string;
};

const FormEmpty = (props: TProps) => {
      const { content = "Bạn chưa tạo form, hãy tạo thử nha", gap = "4rem", className = {} } = props;

      return (
            <div
                  style={{ gap }}
                  className={`mt-[4rem] bg-color-section-theme rounded-lg w-full h-full min-h-[40rem] flex flex-col items-center justify-center ${className}`}
            >
                  <Image
                        src={"/assets/images/icon/form_answer/form_empty_response.png"}
                        width={18}
                        height={18}
                        alt="icon"
                        className="w-[24rem] h-[24rem]"
                        unoptimized={true}
                  />
                  <div className="text-[4rem] text-color-main">{content}</div>
            </div>
      );
};

export default FormEmpty;
