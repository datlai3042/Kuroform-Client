import Image from "next/image";
import React from "react";

const InternalServerErrorPage = () => {
      return (
            <div className="w-full h-screen flex flex-col items-center justify-center gap-[6rem] text-text-theme bg-[#fff]">
                  <Image
                        src={"/assets/images/icon/errors/500.png"}
                        width={50}
                        height={50}
                        alt="toast success"
                        quality={100}
                        className="min-w-[60rem] h-[45rem]"
                        unoptimized={true}
                  />
                  <div className="text-[4rem]  text-[#000]">Server hiện đang gặp sự cố</div>
            </div>
      );
};

export default InternalServerErrorPage;
