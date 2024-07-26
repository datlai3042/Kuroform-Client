"use client";

import React, { use } from "react";
import LayoutSidebar from "../../_components/Layout/LayoutSidebar";

type TProps = {
      children: React.ReactNode;
};
const DashBoardLayout = (props: TProps) => {
      return <LayoutSidebar>{props.children}</LayoutSidebar>;
};

export default DashBoardLayout;
