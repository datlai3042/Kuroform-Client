"use client";
import { useMediaQuery } from "@mantine/hooks";
import React, { SetStateAction, createContext, useEffect, useState } from "react";

type TSidebarContext = {
      openSidebar: boolean;
      setOpenSidebar: React.Dispatch<SetStateAction<boolean>>;
      widthSidebar: number;
      setWidthSidebar: React.Dispatch<SetStateAction<number>>;
};

export const SidebarContext = createContext<TSidebarContext>({
      openSidebar: true,
      setOpenSidebar: () => {},
      widthSidebar: 0,
      setWidthSidebar: () => {},
});

type TProps = {
      children: React.ReactNode;
};

const SidebarContextProvider = (props: TProps) => {
      const { children } = props;
      const matches = useMediaQuery(
            "(max-width: 767px)",
            false,

            {
                  getInitialValueInEffect: false,
            },
      );
      const [openSidebar, setOpenSidebar] = useState<boolean>(() => {
            return !matches;
      });

      const [widthSidebar, setWidthSidebar] = useState(0);

      useEffect(() => {
            setOpenSidebar(!matches);
      }, [matches]);


      useEffect(() => {
            if(!openSidebar) {
                  setWidthSidebar(0)
            }
      }, [openSidebar])

      return <SidebarContext.Provider value={{ openSidebar, setOpenSidebar, widthSidebar, setWidthSidebar }}>{children}</SidebarContext.Provider>;
};

export default SidebarContextProvider;
