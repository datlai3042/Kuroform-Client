"use client";

import React, { useEffect } from "react";
import LoginForm from "../../_components/Model/LoginForm";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addOneToastWarning } from "@/app/_lib/redux/toast.slice";
import { v4 } from "uuid";
import { Metadata } from "next";




const LoginPage = () => {
      const router = useRouter();
      const query = useSearchParams();
      const state = query.get("token_expire");
      const dispatch = useDispatch();

      useEffect(() => {
            if (!!state) {
                  dispatch(
                        addOneToastWarning({
                              toast_item: {
                                    _id: v4(),
                                    core: { message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại" },
                                    toast_title: "Bảo mật",
                                    type: "WARNING",
                              },
                        }),
                  );
            }
      }, []);

      return (
            <div className="w-full h-full flex justify-center  ">
                  <LoginForm />
            </div>
      );
};

export default LoginPage;
