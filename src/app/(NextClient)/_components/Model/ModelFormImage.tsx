import React from "react";
import ModelWrapper from "./ModelWrapper";
import DivNative from "../ui/NativeHtml/DivNative";
import { ReactCustom } from "@/type";
import FormBackgoundUpload from "../../form/[id]/(owner)/edit/components/FormBackgoundUpload";
import FormAvatarUpload from "../../form/[id]/(owner)/edit/components/FormAvatarUpload";

type TProps = {
      setOpenModel: ReactCustom.SetStateBoolean;
      MODE: "AVATAR" | "BACKGROUND";
};

const ModelFormImage = (props: TProps) => {
      const { MODE, setOpenModel } = props;

      return (
            <ModelWrapper ModelWidth="w-[90%] xl:w-[80rem]" ModelHeight="h-[45rem]" ModelWrapperOpacity="bg-[rgba(0,0,0,.6)]" setOpenModel={setOpenModel}>
                  <DivNative className="w-full h-full py-[1.6rem] bg-color-section-theme">
                        {MODE === "BACKGROUND" && <FormBackgoundUpload setOpenModel={setOpenModel} />}
                        {MODE === "AVATAR" && <FormAvatarUpload setOpenModel={setOpenModel} />}
                  </DivNative>
            </ModelWrapper>
      );
};

export default ModelFormImage;
