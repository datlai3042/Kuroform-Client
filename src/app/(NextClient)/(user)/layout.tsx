import Http from "@/app/_lib/http";
import { ResponseApi } from "@/app/_schema/api/response.shema";
import { UserType } from "@/app/_schema/user/user.type";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";
import CheckExprireToken from "../_components/Layout/CheckExprireToken";
import Footer from "../_components/Layout/Footer";
import { SocketProvider } from "../_components/provider/SocketProvider";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
      const cookieStore = cookies();
      const client_id = cookieStore.get("next_client_id")?.value;
      const access_token = cookieStore.get("next_access_token")?.value;
      const refresh_token = cookieStore.get("next_refresh_token")?.value;
      const code_verify_token = cookieStore.get("next_code_verify_token")?.value;

      const res = await Http.get<ResponseApi<{ user: UserType }>>(`/v1/api/account/me`, {
            credentials: "include",
            headers: {
                  Cookie: `refresh_token=${refresh_token};access_token=${access_token};client_id=${client_id};code_verify_token=${code_verify_token}`,
                  CodeVerifyToken: code_verify_token,
            } as HeadersInit,
      });

      const { user } = res.metadata;
      const renderUserName = () => {
            if (user?.user_last_name && user?.user_first_name) {
                  return user?.user_first_name + " " + user?.user_last_name;
            }
            if (!user?.user_last_name && user?.user_first_name) {
                  return user?.user_first_name;
            }

            if (user?.user_last_name && !user?.user_first_name) {
                  return user?.user_last_name;
            }

            return user?.user_email;
      };
      const fullName = renderUserName();
      const imageAvatar = user?.user_avatar_current || "/icon_core.png";
      // console.clear();
      return {
            title: fullName,
            icons: {
                  icon: [
                        {
                              rel: "icon",
                              type: "image/png",
                              url: imageAvatar,
                        },

                        {
                              rel: "icon",
                              type: "image/ico",
                              url: "/favicon.ico",
                        },
                  ],
            },
      };
}

const UserAuthenticationPage = ({ children }: { children: React.ReactNode }) => {
      return (
            <>
                  <SocketProvider>
                        <div className="relative">
                              <div className="w-full absolute z-[2] pb-[6rem] sm:pb-0 xl:pb-0">{children}</div>
                        </div>
                        <CheckExprireToken />
                        <Footer />
                  </SocketProvider>
            </>
      );
};

export default UserAuthenticationPage;
