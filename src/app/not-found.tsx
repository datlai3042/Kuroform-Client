import React from "react";
import NotFoundPage from "./(NextClient)/_components/_StatusCodeComponent/NotFoundPage";

const NotFound = () => {
      return (
            <div className="w-screen h-screen flex items-center justify-center">
                  <NotFoundPage content="Đường dẫn không tồn tại" />;
            </div>
      );
};

export default NotFound;
