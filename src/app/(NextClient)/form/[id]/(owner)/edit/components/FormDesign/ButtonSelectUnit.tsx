import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { FormCore } from "@/type";
import { useClickOutside } from "@mantine/hooks";
import { Select } from "antd";
import { Settings } from "lucide-react";
import React, { useState } from "react";

type TProps = {
      defaultValue?: FormCore.FormImageUnit;
      onChangeUnit?: (unit: FormCore.FormImageUnit) => void;
      disabled?: boolean;
      placeholder: string;
};

const options = [
      { value: "AUTO", label: "AUTO" },
      { value: "%", label: "%" },
      { value: "PX", label: "PIXEL" },
];

const ButtonSelectUnit = (props: TProps) => {
      const { defaultValue, onChangeUnit, disabled = false, placeholder } = props;
      const [openChoose, setOpenChoose] = useState(false);
      const styleEffect = {
            onActive: (value: FormCore.FormImageUnit) => {
                  if (value === defaultValue) return "bg-color-main text-[#fff]";
                  return "hover:bg-color-main hover:text-[#fff]";
            },
      };
      const ref = useClickOutside(() => setOpenChoose(false));

      return (
            <div className=" text-text-theme relative" onClick={(e) => e.stopPropagation()}>
                  <span>
                        <Settings
                              size={14}
                              onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenChoose((prev) => !prev);
                              }}
                        />
                  </span>
                        <div
                              onClick={(e) => e.stopPropagation()}
                              style={{ display: openChoose ? "flex" : "none" }}
                              className="absolute top-[150%] right-0  rounded-[4px] z-[100] flex flex-col  border-[.1rem] border-[var(--border-color-input)] bg-color-section-theme text-text-theme "
                        >
                              {options.map((op) => {
                                    return (
                                          <div
                                                className={`${styleEffect.onActive(
                                                      op.value as FormCore.FormImageUnit,
                                                )} cursor-pointer text-right p-[.4rem_.4rem]`}
                                                key={op.value}
                                                onClick={(e) => {
                                                      e.stopPropagation();
                                                      if (onChangeUnit) {
                                                            onChangeUnit(op.value as FormCore.FormImageUnit);
                                                            setOpenChoose(false);
                                                      }
                                                }}
                                          >
                                                {op.label}
                                          </div>
                                    );
                              })}
                        </div>
            </div>
      );
};

export default ButtonSelectUnit;
