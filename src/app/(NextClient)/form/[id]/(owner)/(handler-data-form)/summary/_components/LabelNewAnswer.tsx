import React, { useEffect, useState } from "react";

const LabelNewAnswer = () => {
      const [mount, setMount] = useState(true);

      useEffect(() => {
            setTimeout(() => {
                  setMount(false);
            }, 15000);
      }, []);
      if (!mount) {
            return;
      }
      return <div className="bg-blue-600 p-[.1rem_.4rem] rounded-[.4rem] text-[#fff]">Mới</div>;
};

export default LabelNewAnswer;
