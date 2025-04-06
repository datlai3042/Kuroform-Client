import React from "react";

const SpaceLine = ({ content }: { content: string }) => {
      return (
            <div className="w-full flex">
                  <div className="w-[30%] flex items-center">
                        <div className="w-full h-[.1rem] border-b-[.1rem] border-[#5c6c75] opacity-85"></div>
                  </div>
                  <div className="flex-1 whitespace-pre px-[1.2rem] bg-color-section-theme text-[1.3rem] text-[#5c6c75]">{content}</div>
                  <div></div>
                  <div className="w-[30%] flex items-center">
                        <div className="w-full h-[.1rem] border-b-[.1rem] border-[#5c6c75]  opacity-85"></div>
                  </div>
            </div>
      );
};

export default SpaceLine;
