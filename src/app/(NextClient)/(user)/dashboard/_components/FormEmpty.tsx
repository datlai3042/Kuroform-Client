import ButtonCreateForm from "@/app/(NextClient)/_components/ui/button/ButtonCreateForm";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

type TProps = {
      content?: string | React.ReactNode;
      gap?: string;
      className?: string;
};

const FormEmpty = (props: TProps) => {
      const {
            content = (
                  <div className="flex flex-col items-center gap-[2rem]">
                        <strong className="text-[4.2rem] text-color-main">Welcome Kuroform</strong>
                        <span className="text-[1.8rem] font-bold">Hãy tạo form để trải nghiệm tính năng</span>
                  </div>
            ),
            className = {},
      } = props;

      return (
            <div
                  style={{ gap: '4rem' }}
                  className={`mt-[4rem] bg-color-section-theme rounded-lg w-full h-full min-h-[40rem] flex flex-col items-center justify-center ${className}`}
            >
                  <Image
                        src={"/assets/images/icon/form_answer/form_empty_response.png"}
                        width={18}
                        height={18}
                        alt="icon"
                        className="w-[25rem] h-[25rem]"
                        unoptimized={true}
                  />
                  <div className="">{content}</div>

                  <ButtonCreateForm
                        textContent="Tạo Form"
                        urlNavigation="/"
                        className="flex  xl:[&]:p-[2px] !gap-[.5rem] !h-[5rem] !min-w-[14rem] !rounded-lg !w-max !text-[1.5rem] font-bold"
                        position="LEFT"
                        icon={<Plus size={20} className="font-bold" />}
                  />
            </div>
      );
};

export default FormEmpty;
