import { ResponseApi, ResponseAuth } from "../_schema/api/response.shema";
import { generateInfoRequest, normalizePath, removeValueLocalStorage, setValueLocalStorage } from "./utils";
import { CustomRequest, Method, TokenNextSync } from "@/type";
import AuthService from "../_services/auth.service";
import { httpCaseErrorNextClient, httpCaseErrorNextServer } from "./httpCase";
import { redirect } from "next/navigation";

/**
 *
 * @param method phương thức HTTP
 * @param url endpoint
 * @param options các options
 */

export const resquest = async <Response>(method: Method, url: string, options?: CustomRequest | undefined) => {
      const { body, baseHeader, fullUrl } = generateInfoRequest(url, options as CustomRequest);
      const optionsRequest: RequestInit = {
            ...options,
            headers: {
                  ...baseHeader,
                  ...options?.headers,
            } as any,
            body,
            method,
            credentials: "include",
      };

      const response = await fetch(fullUrl, optionsRequest)
            .then((data: any) => data)
            .catch((e: Error) => {
                  redirect("/errors/internal-server-error");
            });

      //RESPONSE: ERROR
      if (!response.ok) {
            //ERROR: ACCESS_TOKEN
            if (typeof window !== "undefined") {
                  const result = await httpCaseErrorNextClient<Response>(response, +response.status, method, url, fullUrl, optionsRequest);
                  return result;
            } else {
                  return await httpCaseErrorNextServer(+response.status, options as CustomRequest);
            }
      }

      const payload: Response = await response.json();

      if ("v1/api/auth/set-token".includes(normalizePath(url))) {
            const { expireToken, code_verify_token, expireCookie } = payload as { expireToken: string; code_verify_token: string,expireCookie: string };

            setValueLocalStorage("expireToken", expireToken);
            setValueLocalStorage("expireCookie", expireCookie);

            setValueLocalStorage("code_verify_token", code_verify_token);
      }

      if (["v1/api/auth/login", "v1/api/auth/register"].some((path) => path === normalizePath(url))) {
            // const expireTokenJSON = (payload as ResponseApi<ResponseAuth>).metadata.expireToken;
            // setValueLocalStorage("expireToken", expireTokenJSON);

            // const codeVerifyTokenJSON = (payload as ResponseApi<ResponseAuth>).metadata.token.code_verify_token;
            // setValueLocalStorage("code_verify_token", codeVerifyTokenJSON);


            // const expireCookieJSON = (payload as ResponseApi<ResponseAuth>).metadata.expireCookie;
            // setValueLocalStorage("expireCookie", expireCookieJSON);

            const { metadata } = payload as ResponseApi<ResponseAuth>;
            const {
                  client_id,
                  expireToken,
                  token: { access_token, code_verify_token, refresh_token },
                  expireCookie
            } = metadata;
            const params = { access_token, code_verify_token, refresh_token, client_id, expireToken,expireCookie };

            await AuthService.syncNextToken(params);
      }

      if (["v1/api/auth/logout"].includes(normalizePath(url))) {
            // removeValueLocalStorage("expireToken");
            // removeValueLocalStorage("code_verify_token");
      }

      return payload;
};

class Http {
      static get<Response>(url: string, options: Omit<CustomRequest, "body"> = {}) {
            const method: Method = "GET";
            return resquest<Response>(method, url, options);
      }

      /**
       *
       * @param url endPoint
       * @param body body
       * @param options
       * @returns
       */
      static post<Response>(url: string, body: any, options: Omit<CustomRequest, "body"> = {}) {
            const method: Method = "POST";
            return resquest<Response>(method, url, { ...options, body });
      }

      static put<Response>(url: string, body: any, options: Omit<CustomRequest, "body">) {
            const method: Method = "PUT";
            return resquest<Response>(method, url, { ...options, body });
      }

      static delete<Response>(url: string) {
            const method: Method = "DELETE";
            return resquest<Response>(method, url);
      }
}

export default Http;
