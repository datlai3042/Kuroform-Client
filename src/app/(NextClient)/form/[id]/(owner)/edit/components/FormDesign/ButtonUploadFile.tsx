import ModelFormImage from "@/app/(NextClient)/_components/Model/ModelFormImage";
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
                        style={{ backgroundColor: "rgb(20 67 122)" }}
                        onClick={() => setOpenModel(true)}
                        className="border-[.1rem] border-dashed border-white w-full h-[10rem] flex justify-center items-center text-[#fff] font-semibold"
                  >
                        Tải ảnh lên
                  </button>
            </>
      );
};

export default ButtonUploadFile;
