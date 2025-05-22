import { useDebouncedCallback } from "@mantine/hooks";
import React, { useEffect, useRef, useState } from "react";

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
      const [heightContent, setHeightContent] = useState<string | number>("auto");
      const containerRef = useRef<HTMLDivElement>(null);
      const handleBrowserResize = () => {
            if (containerRef.current) {
                  const viewHeight = window.innerHeight;
                  const heightContainer = viewHeight - containerRef.current.offsetTop - 50;
                  setHeightContent(heightContainer);
            }
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
            <div ref={containerRef} className="control-wrapper" style={{ height: heightContent, overflowY: "auto", overflowX: 'hidden', marginTop: '-1rem' }}>
                  {children}
            </div>
      );
};

export default ContentWrapper;
