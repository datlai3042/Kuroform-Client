"use client";

import React, { use, useEffect } from "react";
import LayoutSidebar from "../../_components/Layout/LayoutSidebar";
import UserService from "@/app/_services/user.service";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { onFetchUser } from "@/app/_lib/redux/authentication.slice";

type TProps = {
      children: React.ReactNode;
};
const DashBoardLayout = (props: TProps) => {
      const apiGetMe = useQuery({
            queryKey: ["me"],
            queryFn: () => UserService.me(),
      });
      const dispatch = useDispatch();
      useEffect(() => {
            if (apiGetMe.isSuccess) {
                  const { user } = apiGetMe?.data.metadata;

                  dispatch(onFetchUser({ user }));
            }
      }, []);
      return <LayoutSidebar>{props.children}</LayoutSidebar>;
};

export default DashBoardLayout;
