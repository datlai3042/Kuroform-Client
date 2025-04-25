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
                        style={{ backgroundColor: "rgb(26 116 223 / 27%)" }}
                        onClick={() => setOpenModel(true)}
                        className="border-[.1rem] border-dashed border-[var(--color-main)] w-full h-[10rem] flex justify-center items-center text-blue-600 font-semibold"
                  >
                        Tải ảnh lên
                  </button>
            </>
      );
};

export default ButtonUploadFile;
