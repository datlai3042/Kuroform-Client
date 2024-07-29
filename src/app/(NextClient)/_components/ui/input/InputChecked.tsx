import React from "react";

type TProps = {
      value: string;
      name_radio: string;
      value_current: string | string[];
      callbackChecked?: () => void;
      getStateCheck?: (check: boolean) => void;
      checked: boolean;
};

const InputChecked = (props: TProps) => {
      const { value, value_current, checked, callbackChecked, getStateCheck } = props;
      console.log({ value_current, value });
      const onChangeInput = () => {
            const inputChecked = value_current === value;
            console.log({ inputChecked, value, value_current });
            getStateCheck && getStateCheck(inputChecked);
            callbackChecked && callbackChecked();
      };

      return (
            <div className="p-[1rem] flex items-center gap-[2rem] rounded-lg hover:cursor-pointer hover:bg-formCoreBgColor" onClick={onChangeInput}>
                  <div className="min-w-[2rem] w-max h-[2.6rem] relative rounded-full flex items-center ">
                        <div className=" absolute z-[2] w-[2rem] aspect-square rounded-full bg-[#fff] flex items-center justify-center ml-[.6rem] border-[.1rem] border-gray-400">
                              {checked && <div className=" w-[50%] aspect-square rounded-full bg-blue-300"></div>}
                        </div>
                        {value_current && checked ? (
                              <div className="absolute min-w-[12rem] h-full bg-color-main rounded-full text-[#fff] flex items-center justify-center">
                                    <span className="ml-[2rem] px-[2rem] text-[1.2rem] w-max">[{value}]</span>
                              </div>
                        ) : (
                              <span className="ml-[4rem]">{value}</span>
                        )}
                  </div>
            </div>
      );
};

export default InputChecked;
