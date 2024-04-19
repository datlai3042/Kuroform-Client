import { redirect } from "next/navigation";
import { ResponseApi, ResponseAuth } from "../_schema/api/response.shema";
import {
	AUTHORIZATION_ERROR_STATUS,
	ConstructorError,
	ErrorPayload,
	HttpError,
	PERMISSION_ERROR_STATUS,
	PermissionError,
} from "./httpError";
import { normalizePath } from "./utils";

type Method = "GET" | "POST" | "PUT" | "DELETE";
type CustomRequest = Omit<RequestInit, "method"> & {
	baseUrl?: string;
	pathName?: string;
};

class ClientToken {
	private _access_token: string = "";
	private _refresh_token: string = "";
	private _id: string = "";

	set id(id: string) {
		if (typeof window !== undefined) {
			this._id = id;
		}
	}

	get id() {
		return this._id;
	}

	set accessToken(at: string) {
		if (typeof window !== undefined) {
			console.log("set at");
			this._access_token = at;
		}
	}

	get accessToken() {
		return this._access_token;
	}

	set refreshToken(rf: string) {
		if (typeof window !== undefined) {
			this._refresh_token = rf;
		}
	}

	get refreshToken() {
		return this._refresh_token;
	}
}

export const clientToken = new ClientToken();

let NOT_RETRY: null | Promise<any> = null;

/**
 *
 * @param method phương thức HTTP
 * @param url endpoint
 * @param options các options
 */

export const resquest = async <Response>(method: Method, url: string, options?: CustomRequest | undefined) => {
	const body = options?.body
		? options.body instanceof FormData
			? options.body
			: JSON.stringify(options.body)
		: undefined;

	const baseHeader =
		options?.body instanceof FormData
			? { Authorization: `Bearer ${clientToken.accessToken}`, "x-client-id": clientToken.id }
			: {
					Authorization: `Bearer ${clientToken.accessToken}`,
					"Content-Type": "application/json",
					"x-client-id": clientToken.id,
			  };

	const baseUrl = options?.baseUrl === undefined ? process.env.NEXT_PUBLIC_BACK_END_URL : options.baseUrl;

	const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

	const response = await fetch(fullUrl, {
		...options,
		headers: {
			...baseHeader,
			...options?.headers,
		} as any,
		body,
		method,
	});

	const payload: Response = await response.json();

	//RESPONSE: ERROR
	if (!response.ok) {
		//ERROR: ACCESS_TOKEN
		if (+response.status === AUTHORIZATION_ERROR_STATUS) {
			const { refresh_token } = options?.headers as HeaderToken;
			const { Authorization } = options?.headers as HeaderToken;

			const clientId = (options?.headers as HeaderToken)["x-client-id"];
			const token_expires = Authorization.split("")[1];

			//TOKEN EXPRIES NEXT-CLIENT
			if (typeof window !== "undefined") {
				//refresh-token api
				const options: RequestInit = {
					method: "GET",
					headers: {
						authorization: `Bearer ${token_expires}`,
						"x-client-id": clientId,
						Cookie: `refresh_token=${refresh_token}`,
					},
					cache: "no-store",
				};
				const callRefreshToken = await fetch(`${baseUrl}/v1/api/auth/refresh-token`, options);
				const refresh_api: ResponseApi<ResponseAuth> = await callRefreshToken.json();

				//validate refresh-token
				//---*---//

				//CASE: FAILED

				if (+refresh_api.code === PERMISSION_ERROR_STATUS) {
					const payloadError: ConstructorError = {
						status: +refresh_api.code,
						payload: payload as ErrorPayload,
					};
					console.log({ http: "token-client-side:::logout thooi" });
					throw new PermissionError(payloadError);
				}
				//CASE: SUCCESS
				else {
					const { access_token, refresh_token } = refresh_api.metadata.token;
					const { _id: user_id } = refresh_api.metadata.user;

					//PROCESS SYNC TOKEN BETWEEN NEXT-CLIENT AND NEXT-SERVER
					const bodySyncTokenAPI = {
						access_token,
						refresh_token,
						_id: user_id,
					};
					const syncToken = await fetch("http://localhost:3000/v1/api/auth/set-token", {
						body: JSON.stringify(bodySyncTokenAPI),
						method: "POST",
					});

					const tokenResponse = await syncToken.json();

					//AFTER
					if (tokenResponse) {
						const { access_token, refresh_token } = tokenResponse.metadata.token;
						const { _id } = tokenResponse.metadata.user;

						//NEW TOKEN CLIENT
						clientToken.accessToken = access_token;
						clientToken.refreshToken = refresh_token;
						clientToken.id = _id;

						//CALL API AGAIN WITH NEW TOKEN
						const call_again = await fetch(fullUrl, {
							method,
							body,
							headers: {
								...baseHeader,
								Authorization: `Bearer ${access_token}`,
							} as any,
						});

						//FINALLY
						const response_again: Response = await call_again.json();
						return response_again;
					}
				}
			}

			//TOKEN EXPRIES NEXT-SERVER
			else {
				//refresh-token api
				const optionsRefreshAPI: RequestInit = {
					method: "GET",
					headers: {
						authorization: `Bearer ${token_expires}`,
						"x-client-id": clientId,
						Cookie: `refresh_token=${refresh_token}`,
					},
					cache: "no-store",
				};
				const callRefreshToken = await fetch(`${baseUrl}/v1/api/auth/refresh-token`, { ...optionsRefreshAPI });
				const refresh_api: ResponseApi<ResponseAuth> = await callRefreshToken.json();

				//validate refresh-token
				//---*---//

				//CASE: FAILED
				if (+refresh_api.code === PERMISSION_ERROR_STATUS) {
					const payloadError: ConstructorError = {
						status: +refresh_api.code,
						payload: payload as ErrorPayload,
					};
					console.log({ http: "server-client-side:::logout thooi", refresh_api, token: refresh_token });
					throw new PermissionError(payloadError);
				}
				//CASE: SUCCESS
				else {
					const pathName = options?.pathName;
					const { access_token, refresh_token: newRf } = refresh_api.metadata.token;
					const { _id: user_id } = refresh_api.metadata.user;
					redirect(
						`/refresh-token?token_expires=${refresh_token}&new_access_token=${access_token}&new_refresh_token=${newRf}&user_id=${user_id}&pathName=${pathName}`
					);
				}
			}
		} else {
			throw new HttpError({ status: 500 });
		}
	}

	if ("v1/api/auth/set-token".includes(normalizePath(url))) {
		clientToken.accessToken = (payload as TokenNextSync).access_token;
		clientToken.refreshToken = (payload as TokenNextSync).refresh_token;
		clientToken.id = (payload as TokenNextSync)._id;
	}

	if (["v1/api/auth/login", "v1/api/auth/register"].some((path) => path === normalizePath(url))) {
		clientToken.accessToken = (payload as ResponseApi<ResponseAuth>).metadata.token.access_token;
		clientToken.refreshToken = (payload as ResponseApi<ResponseAuth>).metadata.token.refresh_token;
		clientToken.id = (payload as ResponseApi<ResponseAuth>).metadata.user._id;
	}

	if (["v1/api/auth/logout"].includes(normalizePath(url))) {
		clientToken.accessToken = "";
		clientToken.refreshToken = "";
		clientToken.id = "";
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
		console.log({ options });
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
