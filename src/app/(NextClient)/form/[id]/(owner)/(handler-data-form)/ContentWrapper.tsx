import { useDebouncedCallback } from "@mantine/hooks";
import React, { useEffect, useState } from "react";

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
      const [heightContent, setHeightContent] = useState<string | number>("auto");
      const [minHeightContent, setMinHeightContent] = useState<string | number>("auto");

      const handleBrowserResize = () => {
            const contentContainer = document.getElementById("content")?.getBoundingClientRect().height || 0;
            const contentInfo = document.getElementById("content-info")?.getBoundingClientRect().height || 0;
            const contentTab = document.querySelector(".content-tab")?.getBoundingClientRect().height || 0;

            const calc = contentContainer - contentInfo - contentTab - 52;
              const minHeight = calc / 100 * 10
              setMinHeightContent(minHeight)
            setHeightContent(calc);
      };

      const onHandleResizeDelay = useDebouncedCallback(handleBrowserResize, 100);

      useEffect(() => {
            setTimeout(() => {
                  handleBrowserResize();
            }, 300);

            window.addEventListener("resize", onHandleResizeDelay);

            return () => {
                  window.removeEventListener("resize", onHandleResizeDelay);
            };
      }, []);

      return (
            <div className="control-wrapper" style={{  minHeight: '100%', }}>
                  {children}
            </div>
      );
};

export default ContentWrapper;
