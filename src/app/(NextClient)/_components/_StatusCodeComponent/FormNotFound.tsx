import Image from "next/image";
import Link from "next/link";
import React from "react";
import ButtonCreateForm from "../ui/button/ButtonCreateForm";
import { Plus } from "lucide-react";

const FormNotFound = () => {
      return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center text-text-theme bg-color-section-theme">
                  <Image
                        src={"/assets/images/icon/form_answer/form_empty_response.png"}
                        width={50}
                        height={50}
                        alt="toast success"
                        quality={100}
                        className="min-w-[30rem] h-[30rem]"
                        unoptimized={true}
                  />
                  <div className="min-h-full  flex flex-col items-center    gap-[2rem]">
                        <p className="text-[6rem] font-medium">Không tìm thấy Form</p>
                        <ButtonCreateForm
                              isNotRedirect={true}
                              textContent="Tạo form mới"
                              urlNavigation="/"
                              className="flex  xl:[&]:p-[.8rem_1.2rem] !gap-[.5rem] !h-[3.6rem] !min-w-[10rem] !w-max !text-[1.3rem]"
                              position="LEFT"
                              icon={<Plus size={16} />}
                        />
                  </div>
            </div>
      );
};

export default FormNotFound;
