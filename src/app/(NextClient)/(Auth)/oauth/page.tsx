"use client";
import { addOneToastError } from "@/app/_lib/redux/toast.slice";
import AuthService from "@/app/_services/auth.service";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import LayoutRequestLoading from "../../_components/Layout/LayoutRequestLoading";
import NotPermissionPage from "../../_components/_StatusCodeComponent/NotPermissionPage";
const OauthGooglePage = () => {
      const router = useRouter();

      const searchParams = useSearchParams();
      const client_id = searchParams.get("client_id") || "";
      const expireToken = searchParams.get("expireToken") || "";

      const access_token = searchParams.get("access_token") || "";
      const refresh_token = searchParams.get("refresh_token") || "";
      const code_verify_token = searchParams.get("code_verify_token") || "";
      const expireCookie = searchParams.get("expireCookie") || "";


      const dispatch = useDispatch();

      useEffect(() => {
            const params = { access_token, code_verify_token, refresh_token, client_id, expireToken, expireCookie };

            console.log({ params });
            if (!client_id && !expireToken && !access_token && !refresh_token && !code_verify_token && !expireCookie) {
                  dispatch(
                        addOneToastError({
                              toast_item: {
                                    _id: uuid(),
                                    type: "ERROR",
                                    toast_title: "Xác thực người dùng",
                                    core: { message: "Request không hợp lệ" },
                              },
                        }),
                  );
                  return;
            }
            AuthService.syncNextToken(params).then(() => router.push("/dashboard"));
      });

      const not_permission = client_id && expireToken && access_token && refresh_token && code_verify_token && expireCookie;

      if (!not_permission) {
            return <NotPermissionPage />;
      }
      return <LayoutRequestLoading message="Service đang xử lí các thông tin xin vui lòng đợi..." />;
};

export default OauthGooglePage;
