import Image from "next/image";
import React from "react";

type TProps = {
      content?: string;
      gap?: string;
};

const FormEmptyResponse = (props: TProps) => {
      const { content = "Bạn chưa nhận bất kì phản hồi nào", gap = "2rem" } = props;

      return (
            <div style={{ gap }} className="w-full h-full min-h-[38rem] flex flex-col items-center justify-center text-text-theme bg-transparent">
                  <Image
                        src={"/assets/images/icon/form_answer/form_empty_response.png"}
                        width={18}
                        height={18}
                        alt="icon"
                        className="w-[16rem] h-[16rem] xl:w-[30rem] xl:h-[30rem]"
                        unoptimized={true}
                  />
                  <div className="text-[2rem] xl:text-[4rem] font-medium text-text-theme">{content}</div>
            </div>
      );
};

export default FormEmptyResponse;
