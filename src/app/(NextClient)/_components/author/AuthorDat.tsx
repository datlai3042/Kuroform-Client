"use client";

import { Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ClickOutSide from "../Model/ClickOutSide";

type TProps = {
      color?: string;
      backgroundColor?: string;
};

const AuthorDat = (props: TProps) => {
      const { color, backgroundColor } = props;

      const [openDetailAuthor, setOpenDetailAuthor] = useState<boolean>(false);

      const setAnimation = openDetailAuthor ? "animate-btt" : "animate-ttb";


      const background = openDetailAuthor ? " shadow-lg" : " ";

      return (
            <button
                  onClick={() => setOpenDetailAuthor((prev) => !prev)}
                  className={` ${background} bg-[#fff] text-[#000] fixed z-[2] bottom-[4rem] right-[2rem]  transition-[width] duration-1000 min-w-[4rem]  rounded-full p-[.4rem]`}
            >
                  <ClickOutSide setOpenModel={setOpenDetailAuthor}>
                        <div className="flex items-center justify-center gap-[1rem]">
                              {openDetailAuthor && <span className="pl-[.6rem]">Được phát triển bởi Kuro Đạt</span>}
                              <div className={` w-[4rem] h-[4rem] relative flex rounded-full`}>
                                    <Image
                                          width={70}
                                          height={70}
                                          src={"/assets/images/home/avatar_author.png"}
                                          alt="Ảnh tác giả"
                                          className="w-full h-full rounded-full"
                                    />

                                    <div
                                          className={`${setAnimation} bg-[#fff] text-[#000] absolute z-[1] bottom-[450%] right-[3rem] min-w-[11rem] p-[1rem_.8rem] min-h-[8rem]  flex flex-col gap-[2rem] rounded-lg shadow-2xl `}
                                    >
                                          <a
                                                onClick={(e) => {
                                                      e.stopPropagation();
                                                }}
                                                href="https://www.facebook.com/datlai304"
                                                target="_blank"
                                                className="flex items-center gap-[1rem]"
                                          >
                                                <Image
                                                      width={70}
                                                      height={70}
                                                      src={"/assets/images/social/facebook.png"}
                                                      alt="Liên hệ"
                                                      className="w-[2rem] h-[2rem] rounded-full"
                                                />
                                                Facebook
                                          </a>

                                          <a
                                                onClick={(e) => e.stopPropagation()}
                                                href="https://github.com/datlai3042"
                                                target="_blank"
                                                className="flex items-center gap-[1rem]"
                                          >
                                                <Image
                                                      width={70}
                                                      height={70}
                                                      src={"/assets/images/social/github.png"}
                                                      alt="Liên hệ"
                                                      className="w-[2rem] h-[2rem] rounded-full"
                                                />
                                                Github
                                          </a>

                                          <a
                                                onClick={(e) => e.stopPropagation()}
                                                href="/assets/pdf/myCv/LaiHuynhPhatDat_InternFrontEnd.pdf"
                                                download={'LaiHuynhPhatDat_InternFrontEnd.pdf'}
                                                target="_blank"
                                                className="flex items-center gap-[1rem]"
                                          >
                                                <Image
                                                      width={70}
                                                      height={70}
                                                      src={"/assets/images/social/pdf.png"}
                                                      alt="Liên hệ"
                                                      className="w-[2rem] h-[2rem] rounded-full"
                                                />
                                                CV của mình
                                          </a>
                                    </div>
                              </div>
                        </div>
                  </ClickOutSide>
            </button>
      );
};

export default AuthorDat;
