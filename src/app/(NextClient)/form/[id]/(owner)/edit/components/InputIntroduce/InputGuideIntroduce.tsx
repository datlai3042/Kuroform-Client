import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { NotebookPen, Plus } from "lucide-react";
import { Span } from "next/dist/trace";
import Image from "next/image";
import React from "react";
const InputGuideIntroduce = () => {
      return (
            <DivNative className="w-full h-full   px-[1rem] xl:px-[2rem] sm:pt-[8rem] flex flex-col justify-center items-center  gap-[1rem] text-[1.3rem] xl:text-[1.8rem] opacity-65">
                  <p className="text-[1.5rem] font-bold">Giao diện này giúp bạn có thể thêm các input có sẵn vào Form</p>
                  <Image
                        src={"/assets/images/InputIntroduce/introduce.png"}
                        width={18}
                        height={18}
                        alt="icon"
                        className="w-[42rem] max-h-[36rem] object-cover"
                        unoptimized={true}
                  />
            </DivNative>
      );
};

export default InputGuideIntroduce;
