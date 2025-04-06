import { Select } from "antd";
import React, { SetStateAction } from "react";
import { ModeDesignForm } from "./FormDesignCustom";

type TProps = {
      modeDesign: ModeDesignForm;
      setModeDesign: React.Dispatch<SetStateAction<ModeDesignForm>>;
};

const SelectModeDesign = ({ modeDesign, setModeDesign }: TProps) => {
      return (
            <>
                  <Select<ModeDesignForm>
                        className="customSelect"
                        defaultValue="BACKGROUND"
                        style={{ width: 220 }}
                        onChange={(value) => setModeDesign(value as ModeDesignForm)}
                        options={[
                              { value: "BACKGROUND", label: "Thiết kế background" },
                              { value: "TITLE", label: "Thiết kế tiêu đề chính" },
                              { value: "SUB_TITLE", label: "Thiết kế tiêu đề phụ" },

                              { value: "AVATAR", label: "Thiết kế avatar" },
                              { value: "SUBMIT", label: "Thiết kế màu nền và submit" },
                        ]}
                  />
            </>
      );
};

export default SelectModeDesign;
