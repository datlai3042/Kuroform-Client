"use client";
import Http from "@/app/_lib/http";
import AuthService from "@/app/_services/auth.service";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { object } from "zod";
import LayoutTokenFailure from "../../_components/Layout/LayoutTokenFailure";
import LayoutRequestLoading from "../../_components/Layout/LayoutRequestLoading";

const LogoutPage = () => {
      const [error, setError] = useState(false);

      const searchParams = useSearchParams();
      const code_verify_token_sv = searchParams.get("code_verify_token");
      const force = searchParams.get("force");
      const router = useRouter();

      useEffect(() => {
            const abort = new AbortController();
            const localCodeJSON = localStorage.getItem("code_verify_token");

            const logoutFunction = async () => {
                  await AuthService.logoutNextClient().catch(() => {
                        setError(true);
                        return;
                  });
            };

            if (force === "true") {
                  logoutFunction();
                  return;
            }

            if (!localCodeJSON) {
                  logoutFunction();
                  return;
            }
            const localCode = JSON.parse(localCodeJSON || "");
            // if (!localCode || !localCode) {
            // 	return;
            // }

            if (localCode === code_verify_token_sv) {
                  logoutFunction();
                  return;
            } else {
                  setError(true);
            }
            return () => {
                  abort.abort();
            };
      }, [code_verify_token_sv, router, force]);

      return (
            <div>
                  {error ? (
                        <LayoutTokenFailure message="Yêu cầu không hợp lệ, vui lòng quay về giao diện đăng nhập" />
                  ) : (
                        <LayoutRequestLoading message="Ứng dụng đang xác thực lại một số thông tin" />
                  )}
            </div>
      );
};

export default LogoutPage;
