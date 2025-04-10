import Image from "next/image";
import React, { SetStateAction, useEffect, useState } from "react";
import ClickOutSide from "./ClickOutSide";
import Portal from "../Portal";

type TProps = {
      imageActive: string;
      imagesUrl: string[];
      setOpenModel: React.Dispatch<SetStateAction<boolean>>;
};

const ModelShowImage = (props: TProps) => {
      const { imageActive, imagesUrl, setOpenModel } = props;

      const [imageShow, setImageShow] = useState<string>(imageActive);

      useEffect(() => {
            const body = document.querySelector("body");
            if (body) {
                  body.style.overflow = "hidden";
            }

            return () => {
                  (body as HTMLBodyElement).style.overflow = "scroll";
            };
      }, []);

      return (
            <Portal>
                  <div className="animate-modeScreen transition-[scale] duration-300 fixed inset-0 min-h-screen  flex items-center justify-center pt-[4rem] bg-[rgba(0,0,0,.8)] z-[1000] hover:cursor-pointer">
                        <ClickOutSide setOpenModel={setOpenModel} width="w-max" height="h-[60rem]">
                              <div className="w-full  xl:h-[60rem]  flex flex-col items-center gap-[5rem] ">
                                    <div className="w-[35rem] h-[35rem] xl:w-[45rem] min-h-[70%] max-h-[70%]">
                                          <Image
                                                src={imageShow}
                                                width={400}
                                                height={400}
                                                alt="image form"
                                                className="w-full h-full   object-contain"
                                                unoptimized={false}
                                          />
                                    </div>
                                    <div className="  flex gap-[4rem] max-w-[30rem] xl:max-w-[80rem] pb-[2rem] mx-auto overflow-x-auto scroll-images">
                                          {imagesUrl.map((img) => (
                                                <div key={img} className="group relative min-w-[8rem] min-h-[8rem] hover:cursor-pointer ">
                                                      <Image
                                                            src={img}
                                                            width={400}
                                                            height={400}
                                                            alt="image form"
                                                            className={`${
                                                                  img === imageShow
                                                                        ? "z-[2] border-[.4rem] border-color-main"
                                                                        : "border-[.4rem] border-[#ccc] group-hover:border-color-main"
                                                            } group-hover:z-[2]  object-contain absolute inset-0 w-full h-full transition-all duration-500 bg-[#ccc]`}
                                                            onClick={() => setImageShow(img)}
                                                      />

                                                      <div className="absolute inset-0 bg-[rgba(0,0,0,.8)]"></div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </ClickOutSide>
                  </div>
            </Portal>
      );
};

export default ModelShowImage;
