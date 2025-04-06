import React from "react";
import ButtonDesignFormColor from "./DesignCommon/ButtonDesignFormColor";
import ButtonDesignSubmit from "./DesignCommon/ButtonDesignSubmit";

const FormDesignColorAndSubmit = () => {
      return (
            <div className=" p-[1rem_2rem] flex flex-col gap-[3rem] mt-[1rem] border-t-[.1rem] border-[var(--border-color-input)]">
                  <div className="mt-[1rem] flex flex-col gap-[1.8rem]">
                        <p className="text-[1.3rem] font-normal uppercase p-[.6rem_1rem] rounded-[.4rem] bg-color-main text-[#fff]">Màu sắc của form</p>
                        <ButtonDesignFormColor />
                  </div>

                  <div className="flex flex-col gap-[1.8rem]">
                        <p className="text-[1.3rem] font-normal uppercase p-[.6rem_1rem] rounded-[.4rem] bg-color-main text-[#fff]">Chữ của nút submit</p>

                        <ButtonDesignSubmit />
                  </div>
            </div>
      );
};

export default FormDesignColorAndSubmit;
