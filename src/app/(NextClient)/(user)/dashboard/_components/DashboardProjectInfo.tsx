"use client";
import Portal from "@/app/(NextClient)/_components/Portal";
import useDisableBodyScroll, { useDisableBodyScrollJS } from "@/app/hooks/useDisalbeBodyScroll";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useMediaQuery } from "@mantine/hooks";
import { Circle, CodeXml, Dot, Github, Plus, Tags } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const DashboardProjectInfo = () => {
      const [showInfo, setShowInfo] = useState(false);

      return (
            <div
                  className="group relative w-full h-[3.8rem] flex items-center px-[2rem] gap-[.8rem] opacity-90 cursor-pointer hover:opacity-100 bg-color-main rounded-[.4rem]"
                  onClick={() => setShowInfo(true)}
            >
                  <Image src={"/assets/images/home/avatar_author.png"} width={20} height={20} alt="avatar" className="w-[2.8rem] h-[2.8rem] rounded-full" />
                  <span className="">Thông tin project</span>
                  {/* <div className="absolute w-0 h-0 bottom-0 transition-all duration-500 group-hover:w-[25rem] m-auto group-hover:h-[25rem] bg-red-800"></div> */}
                  {showInfo && <ProjectInfoOverlay onClose={() => setShowInfo(false)} />}
            </div>
      );
};

const ProjectInfoOverlay = ({ onClose }: { onClose?: () => void }) => {

     const matches = useMediaQuery(
            "(max-width: 767px)",
            false,

            {
                  getInitialValueInEffect: false,
            },
      );


      useDisableBodyScrollJS()


      return (
            <>
                  <Portal>
                        <ProjectInfoModal onClose={onClose} />
                        <div
                              onClick={(e) => {
                                    e.stopPropagation();
                                    if (onClose) {
                                          onClose();
                                    }
                              }}
                              className="fixed top-[0] right-[0rem] z-[9999] bg-[rgba(0,0,0,.4)] w-screen h-screen flex items-center justify-center"
                        ></div>
                  </Portal>
            </>
      );
};

const ProjectInfoModal = ({ onClose }: { onClose?: () => void }) => {
      return (
            <div style={{ lineHeight: 1.6 }} className="showProjectInfo  ">
                  <button
                        onClick={(e) => {
                              e.stopPropagation();
                              if (onClose) {
                                    onClose();
                              }
                        }}
                        className="absolute top-[-8%] bg-[#2662d9] right-0 p-[.6rem] w-[10rem] rounded-[.4rem] cursor-pointer flex items-center justify-center text-[#fff] text-[1.2rem]"
                  >
                        Đóng 
                  </button>
                 <div style={{ overscrollBehavior: 'none'}} className=" rounded-[.4rem] flex flex-col md:flex-row md:flex-wrap bg-[#fff] overflow-y-auto overflow-x-hidden max-h-[80vh]">
                 <div className="p-[1.6rem]  md:w-[30%] h-full  flex-col gap-[1.6rem] md:gap-[1rem] border-r-[.1rem] border-[#ccc] flex items-center py-[1.6rem]">
                        <Image
                              src={"/assets/images/home/avatar_author.png"}
                              width={20}
                              height={20}
                              alt="avatar"
                              unoptimized={true}
                              className="w-[7rem] h-[7rem] rounded-full"
                        />
                        <span className="text-[#2662d9] text-[1.6rem] font-extrabold">Lại Huỳnh Phát Đạt</span>
                        <div className="w-full md:w-[80%] flex flex-col gap-[1.2rem] ">
                              <p className="flex gap-[.6rem] flex-wrap md:flex-nowrap">
                                    <span className="whitespace-pre min-w-[6rem] text-[#2662d9] font-extrabold">Technology:</span>
                                    <span>ReactJS, NextJS, Typescript, ReactQuery, Redux, Javascript ES6</span>
                              </p>

                              <p className="flex gap-[.6rem] flex-wrap md:flex-nowrap">
                                    <span className="whitespace-pre min-w-[6rem] text-[#2662d9] font-extrabold">Library UI:</span>
                                    <span>Antd Design, Semantic UI, Shadcn, Tailwindcss, SCSS</span>
                              </p>

                              <p className="flex gap-[.6rem] flex-wrap md:flex-nowrap">
                                    <span className="whitespace-pre min-w-[6rem] text-[#2662d9] font-extrabold">BackEnd:</span>
                                    <span>ExpressJS, Mongodb</span>
                              </p>

                              <p className="flex gap-[.6rem] flex-wrap md:flex-nowrap">
                                    <span className="whitespace-pre min-w-[6rem] text-[#2662d9] font-extrabold">Other:</span>
                                    <span>Github, Gitlab</span>
                              </p>
                        </div>
                        <div className="w-full md:w-[80%] flex flex-col gap-[.8rem]">
                              <span className="text-[#2662d9] text-[1.6rem] font-extrabold">My contact</span>
                              <p className="flex gap-[.6rem] flex-wrap">
                                    <span className="whitespace-pre min-w-[6rem] text-[#2662d9] font-extrabold">Phone:</span>
                                    <span>0789520106</span>
                              </p>

                              <p className="flex gap-[.6rem] flex-wrap">
                                    <span className="whitespace-pre min-w-[6rem] text-[#2662d9] font-extrabold">Email:</span>
                                    <span>datlai304@gmail.com</span>
                              </p>
                        </div>
                        <div className="ml-auto md:ml-0 mt-auto flex justify-center gap-[.6rem]">
                              <div className="p-[.6rem] bg-[#2662d9] hover:bg-color-main text-[#fff] rounded-full">
                                    <Github className="" size={16} />
                              </div>

                              <div className="p-[.2rem_1.2rem] w-[7rem] flex justify-center bg-[#2662d9]  hover:bg-color-main text-[#fff] rounded-full">
                                    <a
                                          onClick={(e) => e.stopPropagation()}
                                          href="/assets/pdf/myCv/LaiHuynhPhatDat_FresherFrontEnd.pdf"
                                          download={"LaiHuynhPhatDat_FresherFrontEnd.pdf"}
                                          target="_blank"
                                          className="flex items-center gap-[1rem] text-[1.2rem]"
                                    >
                                          My CV
                                    </a>
                              </div>
                        </div>
                  </div>
                  <div className="w-full md:flex-1 p-[1.6rem] mt-[2rem] md:overflow-x-auto ">
                        <div className="flex flex-col gap-[4.8rem]">
                              <div className="flex flex-col gap-[.8rem] border-b-[.1rem] border-[var(--border-color-input)]">
                                    <p className="flex items-center gap-[0rem] text-[1.6rem] font-extrabold">
                                          <span className="text-[#232323]">Front End</span>
                                    </p>
                                    <div className="pl-[1rem] flex flex-col gap-[1rem]">
                                          <div className="flex gap-[1.8rem]">
                                                <Image
                                                      src={"/assets/images/social/react.png"}
                                                      width={20}
                                                      height={20}
                                                      alt="avatar"
                                                      unoptimized={true}
                                                      className="logo-info"
                                                      title="ReactJS"
                                                />

                                                <Image
                                                      src={"/assets/images/social/nextjs.png"}
                                                      width={20}
                                                      height={20}
                                                      alt="avatar"
                                                      unoptimized={true}
                                                      className="logo-info"
                                                      title="NextJS"
                                                />
                                                <Image
                                                      src={"/assets/images/social/typescript.svg"}
                                                      width={20}
                                                      height={20}
                                                      alt="avatar"
                                                      unoptimized={true}
                                                      className="logo-info"
                                                      title="Typescipt"
                                                />

                                                <Image
                                                      src={"/assets/images/social/react-hook-form.svg"}
                                                      width={20}
                                                      height={20}
                                                      alt="avatar"
                                                      unoptimized={true}
                                                      className="logo-info"
                                                      title="React Hook Form"
                                                />

                                                <Image
                                                      src={"/assets/images/social/react-query.png"}
                                                      width={20}
                                                      height={20}
                                                      alt="avatar"
                                                      unoptimized={true}
                                                      className="logo-info"
                                                      title="React Query"
                                                />

                                                <Image
                                                      src={"/assets/images/social/dndkit.svg"}
                                                      width={20}
                                                      height={20}
                                                      alt="avatar"
                                                      unoptimized={true}
                                                      className="logo-info w-[8rem]"
                                                      title="Dnd Kit"
                                                />
                                          </div>
                                    </div>

                                    <div className="pl-[1.4rem]  mt-[1rem] flex flex-col gap-[1rem]">
                                          <div className="flex gap-[1.2rem]">
                                                <Image
                                                      src={"/assets/images/social/antd.png"}
                                                      width={20}
                                                      height={20}
                                                      alt="avatar"
                                                      unoptimized={true}
                                                      className="logo-info w-[4rem]"
                                                      title="Antd design"
                                                />

                                                <Image
                                                      src={"/assets/images/social/tailwind.png"}
                                                      width={20}
                                                      height={20}
                                                      alt="avatar"
                                                      unoptimized={true}
                                                      className="logo-info w-[4rem]"
                                                      title="Tailwindcss"
                                                />

                                                <Image
                                                      src={"/assets/images/social/shadcn.png"}
                                                      width={20}
                                                      height={20}
                                                      alt="avatar"
                                                      unoptimized={true}
                                                      className="logo-info w-[4rem]"
                                                      title="Shadcn"
                                                />
                                          </div>
                                    </div>
                              </div>

                              <div className="flex flex-col ">
                                    <p className="flex items-center gap-[0rem] text-[1.6rem] font-extrabold">
                                          <span className="text-[#232323]">Back End</span>
                                    </p>

                                    <div className="pl-[1rem] flex flex-col gap-[1rem]">
                                          <div className="flex gap-[1.8rem]">
                                                <Image
                                                      src={"/assets/images/social/nodejs.png"}
                                                      width={20}
                                                      height={20}
                                                      alt="avatar"
                                                      unoptimized={true}
                                                      className="logo-info w-[5rem]"
                                                      title="NodeJS"
                                                />

                                                <Image
                                                      src={"/assets/images/social/expressjs.png"}
                                                      width={20}
                                                      height={20}
                                                      alt="avatar"
                                                      unoptimized={true}
                                                      className="logo-info w-[6rem]"
                                                      title="ExpressJS"
                                                />

                                                <Image
                                                      src={"/assets/images/social/mongodb.png"}
                                                      width={20}
                                                      height={20}
                                                      alt="avatar"
                                                      unoptimized={true}
                                                      className="logo-info w-[6rem]"
                                                      title="MongoDB"
                                                />
                                                <Image
                                                      src={"/assets/images/social/jwt.png"}
                                                      width={20}
                                                      height={20}
                                                      alt="avatar"
                                                      unoptimized={true}
                                                      className="logo-info w-[6rem]"
                                                      title="JWT"
                                                />
                                                <Image
                                                      src={"/assets/images/social/socket.png"}
                                                      width={20}
                                                      height={20}
                                                      alt="avatar"
                                                      unoptimized={true}
                                                      className="logo-info w-[6rem]"
                                                      title="Socket.io"
                                                />
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>

                 </div>
            </div>
      );
};
export default DashboardProjectInfo;
