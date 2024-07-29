import React from "react";
import LoadingSpinner from "./ui/loading/LoadingSpinner";
import Image from "next/image";

type TProps = {
      width?: string;
      height?: string;
      message?: string;
};

const LoadingClient = (props: TProps) => {
      const { height = "h-screen", width = "w-screen", message } = props;

      const styleContainer = `${width} ${height}`;

      return (
            <div className={`${styleContainer} relative flex flex-col h-screen  justify-center items-center gap-[0rem] bg-[#fff]`}>
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[2]">
                        <div className="flex justify-center items-center gap-[1rem]">
                              <LoadingSpinner color="text-color-main" />
                              <p className="ml-[2rem] ">
                                    <span className="text-[#000] text-[6rem]">Kuro</span>
                                    <span className="text-color-main text-[6rem]">form</span>
                              </p>

                              <div className="flex justify-center items-center">
                                    <Image src={"/icon_core.png"} width={20} height={20} alt="avatar" unoptimized={true} className="min-w-[6rem] h-[6rem] " />
                              </div>
                              {/* <div className={`animate-changeBgColorWithTime flex items-center gap-[.8rem] rounded-full`}>
                                 
                              </div> */}
                        </div>
                        {message && <p className="text-color-main">{message}</p>}
                  </div>
                  {/* <div className="absolute top-0 left-0  bg-[#000] h-full animate-ltrColor "></div> */}
            </div>
      );
};

export default LoadingClient;
