import Image from "next/image";
import Link from "next/link";
import React from "react";

const FormNotFound = () => {
      return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center text-text-theme bg-color-section-theme">
                  <Image
                        src={"/assets/images/icon/form_answer/form_empty_response.png"}
                        width={50}
                        height={50}
                        alt="toast success"
                        quality={100}
                        className="min-w-[40rem] h-[40rem]"
                        unoptimized={true}
                  />
                  <div className="min-h-full  flex flex-col items-center    gap-[2rem]">
                        <p className="text-[6rem] font-medium">Không tìm thấy Form</p>
                        <Link
                              href={"/dashboard"}
                              className="min-w-[16rem] h-[4rem] p-[1rem_2rem] flex items-center justify-center text-[1.6rem] bg-blue-600 text-[#ffffff] rounded-lg"
                        >
                              Tạo form mới
                        </Link>
                  </div>
            </div>
      );
};

export default FormNotFound;
