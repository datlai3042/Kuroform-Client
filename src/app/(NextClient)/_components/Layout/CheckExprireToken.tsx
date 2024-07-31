"use client";
import AuthService from "@/app/_services/auth.service";
import { differenceInHours, differenceInMilliseconds, differenceInSeconds } from "date-fns";
import React, { useEffect } from "react";

const timeCheck = 1000 * 60 * 30;

const CheckExprireToken = () => {
      useEffect(() => {
            const interval = setInterval(async () => {
                  const now = new Date();
                  const exprireToken = JSON.parse(localStorage.getItem("expireToken") || "0");
                  const exprireTokemTime = new Date(exprireToken);
                  if (differenceInHours(exprireTokemTime, now) < 1) {
                        try {
                              const res = await AuthService.refreshTokenServer();
                        } catch (error) {
                              await AuthService.logoutNextClient();
                              window.location.href = "/";
                        }
                  }
            }, timeCheck);

            return () => {
                  clearInterval(interval);
            };
      }, []);

      return null;
};

export default CheckExprireToken;
