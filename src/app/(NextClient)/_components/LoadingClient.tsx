import React from "react";
import LoadingSpinner from "./ui/loading/LoadingSpinner";
import Image from "next/image";

type TProps = {
      width?: string;
      height?: string;
      message?: string;
      style?: React.CSSProperties;
};

const LoadingClient = (props: TProps) => {
      const { height = "h-screen", width = "w-screen", message, style = {} } = props;

      const styleContainer = `${width} ${height}`;
      return (
            <div
                  style={style}
                  className={`${styleContainer} relative flex flex-col  justify-center items-center gap-[0rem] !bg-[var(--bg-client-loading)]`}
            >
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[2]">
                        <div className="flex justify-center items-center gap-[1rem]">
                              <LoadingSpinner color="#fff" />
                              <p className="ml-[2rem] ">
                                    <span className="text-[#fff] text-[6rem]">Kuro</span>
                                    <span className="text-[#6262e5] text-[6rem]">form</span>
                              </p>

                              <div className="flex justify-center items-center bg-[#fff] rounded-full p-[.3rem]">
                                    <Image src={"/icon_core.png"} width={20} height={20} alt="avatar" unoptimized={true} className="min-w-[6rem] h-[6rem] " />
                              </div>
                              {/* <div className={`animate-changeBgColorWithTime flex items-center gap-[.8rem] rounded-full`}>
                                 
                              </div> */}
                        </div>
                        {message && <p className="text-color-main text-center">{message}</p>}
                        <div
                              className="mt-[1rem] text-center text-[2.6rem] font-medium"
                              style={{ background: "linear-gradient(to right,var(--color-main), #fff)", backgroundClip: "text", color: "transparent" }}
                        >
                              ...Đang tải...
                        </div>
                  </div>
                  {/* <div className="absolute top-0 left-0  bg-[#000] h-full animate-ltrColor "></div> */}
            </div>
      );
};

export default LoadingClient;
