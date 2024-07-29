import Image from "next/image";
import React from "react";

type TProps = {
      content?: string;
      gap?: string;
};

const NotFoundPage = (props: TProps) => {
      const { content = "Không tìm thấy thông tin", gap = "2rem" } = props;

      return (
            <div style={{ gap }} className="w-full h-full min-h-[38rem] flex flex-col items-center justify-center text-text-theme bg-[#fff]">
                  <Image
                        src={"/assets/images/icon/errors/404.jpg"}
                        width={18}
                        height={18}
                        alt="icon"
                        className="w-[16rem] h-[16rem] xl:w-[40rem] xl:h-[36rem]"
                        unoptimized={true}
                  />
                  <div className="text-[2rem] xl:text-[4rem] font-medium text-[#000]">{content}</div>
            </div>
      );
};

export default NotFoundPage;
