import ModelFormImage from "@/app/(NextClient)/_components/Model/ModelFormImage";
import { Image } from "lucide-react";
import React, { useState } from "react";

type TProps = {
      code: "AVATAR" | "BACKGROUND";
};

const ButtonUploadFile = (props: TProps) => {
      const { code } = props;

      const [openModel, setOpenModel] = useState<boolean>(false);

      return (
            <>
                  {openModel && <ModelFormImage setOpenModel={setOpenModel} MODE={code} />}
                  <button
                        onClick={() => setOpenModel(true)}
                        className="border-[.1rem] !h-[4rem] border-dashed border-white w-full bg-color-main flex gap-[.3rem] justify-center items-center text-[#fff] font-medium rounded-[.3rem] hover:opacity-100 opacity-55"
                  >

                        <Image size={18}/>
                        Tải ảnh lên
                  </button>
            </>
      );
};

export default ButtonUploadFile;
