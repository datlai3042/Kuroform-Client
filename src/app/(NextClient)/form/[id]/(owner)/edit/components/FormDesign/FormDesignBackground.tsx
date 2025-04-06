import React, { useState } from "react";
import ButtonColor from "./DesignCommon/ButtonColor";
import ButtonEditTextSize from "./DesignCommon/ButtonEditTextSize";
import ButtonEditTextStyle from "./DesignCommon/ButtonEditTextStyle";
import ButtonPositionBackground from "./DesignCommon/ButtonBackgroundPosition";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import ButtonChangeModeBackground from "./ButtonChangeModeBackground";
import ButtonBackgroundColor from "./DesignCommon/ButtonBackgroundColor";
import ButtonBackgroundPostition from "./DesignCommon/ButtonBackgroundPosition";
import ButtonBackgroundPadding from "./DesignCommon/ButtonBackgroundPadding";
import ButtonBackgroundSize from "./DesignCommon/ButtonBackgroundSize";
import ButtonBackgroundObject from "./DesignCommon/ButtonBackgroundObject";
import { Select } from "antd";
import UploadNone from "@/app/(NextClient)/_components/ui/loading/UploadNone";
import { Circle } from "lucide-react";
type TypeDesignBackground = "type" | "size" | "color";
const FormDesignBackground = () => {
      const formCore = useSelector((state: RootState) => state.form.formCoreBackUp);
      const [type, setType] = useState<TypeDesignBackground>("type");

      const formBackground = !!formCore.form_background?.form_background_iamge_url || false;

      const checkBackground =
            formCore.form_background?.form_background_iamge_url || formCore.form_background_state ? "bg-transparent" : " cursor-not-allowed";

      const isBgDefault = formCore.form_background_state && !formCore.form_background?.form_background_iamge_url;

      return (
            <div className={`${checkBackground}  flex flex-col items-end gap-[2rem] p-[1.6rem_2rem] border-t-[.1rem] border-[var(--border-color-side)] `}>
                  <Select<TypeDesignBackground>
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
                  />

                  {type === "type" && (
                        <div className="flex flex-col gap-[1.6rem] w-full">
                              <div style={{ lineHeight: 1.6 }} className="font-medium flex flex-col gap-[.6rem] ">
                                    <span>Tùy chỉnh ảnh bìa</span>
                                    {!formBackground ? (
                                          <p className="flex gap-[.4rem]">
                                                <UploadNone />
                                                {isBgDefault && <span>- ảnh mặc định</span>}
                                          </p>
                                    ) : (
                                          ""
                                    )}
                              </div>
                              <ButtonChangeModeBackground />
                        </div>
                  )}
                  {type === "size" && (
                        <div className="flex flex-col gap-[1.6rem]">
                              <p style={{ lineHeight: 1.6 }} className="flex gap-[1rem] text-[1.2rem] opacity-55">
                                    <Circle className="text-color-main min-w-max" />
                                    <span className="text-justify">Để các cấu hình dưới đây chính xác hơn thì bạn chọn mode: Cover nhé</span>
                              </p>
                              <ButtonBackgroundSize />
                              <ButtonBackgroundObject />
                              {/* <ButtonBackgroundPostition /> */}
                              {/* <ButtonBackgroundPadding /> */}
                        </div>
                  )}
                  {type === "color" && <ButtonBackgroundColor />}
            </div>
      );
};

export default FormDesignBackground;
