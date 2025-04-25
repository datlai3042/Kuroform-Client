import { RootState } from "@/app/_lib/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import FormBackground from "../FormBackground";
import ButtonChangeModeBackground from "./ButtonChangeModeBackground";
import ButtonUploadFile from "./ButtonUploadFile";
import ButtonBackgroundColor from "./DesignCommon/ButtonBackgroundColor";
import ButtonBackgroundObject from "./DesignCommon/ButtonBackgroundObject";
import ButtonBackgroundSize from "./DesignCommon/ButtonBackgroundSize";
type TypeDesignBackground = "type" | "size" | "color";
const FormDesignBackground = () => {
      const formCore = useSelector((state: RootState) => state.form.formCoreBackUp);
      const [type, setType] = useState<TypeDesignBackground>("type");

      const formBackground = !!formCore.form_background?.form_background_iamge_url || false;

      const checkBackground = formCore.form_background?.form_background_iamge_url || formCore.form_background_state ? "bg-transparent" : " cursor-not-allowed";

      return (
            <>
                  {formCore.form_background || formCore.form_background_state ? (
                        <div className={`${checkBackground}  flex flex-col  gap-[2rem] `}>
                              {/* <Select<TypeDesignBackground>
                        placeholder="Chọn loại chỉnh sửa"
                        className="customSelect"
                        defaultValue="type"
                        style={{ width: 180 }}
                        onChange={(value) => setType(value as TypeDesignBackground)}
                        options={[
                              { value: "type", label: "Chỉnh type ảnh bìa" },
                              { value: "size", label: "Chỉnh kích thước ảnh bìa" },
                              { value: "color", label: "Chỉnh màu nền ảnh bìa" },
                        ]}
                  /> */}

                              <div className="w-full flex flex-col gap-[2rem] ">
                                    <div className="flex gap-[1rem]">
                                          <div className="basis-[12rem]  relative">{<FormBackground action={"thumb"} />}</div>
                                          <div className="flex-1 flex flex-col gap-[1.4rem]">
                                                <ButtonBackgroundSize />
                                                <ButtonBackgroundObject />
                                          </div>
                                    </div>
                                    <div className="flex flex-col gap-[1.6rem] w-full">
                                          {/* <div style={{ lineHeight: 1.6 }} className="font-medium flex flex-col gap-[.6rem] ">
                                    <span>Tùy chỉnh ảnh bìa</span>
                                    {!formBackground ? (
                                          <p className="flex gap-[.4rem]">
                                                <UploadNone />
                                                {isBgDefault && <span>- ảnh mặc định</span>}
                                          </p>
                                    ) : (
                                          ""
                                    )}
                              </div> */}
                                          <div className="flex items-center justify-between">
                                                <div className="w-max">
                                                      <ButtonChangeModeBackground />
                                                </div>
                                                <ButtonBackgroundColor direction="col" />
                                          </div>
                                    </div>
                              </div>
                        </div>
                  ) : (
                        <ButtonUploadFile code="BACKGROUND" />
                  )}
            </>
      );
};

export default FormDesignBackground;
