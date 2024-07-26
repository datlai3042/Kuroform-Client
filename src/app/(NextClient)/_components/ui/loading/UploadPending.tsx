import React from "react";

const UploadPending = () => {
      return (
            <div className="w-full h-[2rem] flex items-center gap-[1rem] text-blue-400">
                  <div className="w-[1rem] h-[1rem] bg-blue-400 rounded-full"></div>
                  <span className="text-[1.2rem] font-semibold">Đang tải lên</span>
            </div>
      );
};

export default UploadPending;
