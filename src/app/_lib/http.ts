import { redirect } from "next/navigation";
import { ResponseApi, ResponseAuth } from "../_schema/api/response.shema";
import { AUTHORIZATION_ERROR_STATUS, PERMISSION_ERROR_STATUS } from "./httpError";
import { normalizePath } from "./utils";
import { unknown } from "zod";

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
	const data = {
		status: response.status,
		metadata: payload,
	};

	if (!response.ok) {
		if (+response.status === AUTHORIZATION_ERROR_STATUS) {
			if (typeof window !== "undefined") {
				console.log({ http: "client-happy" });
			} else {
				const { refresh_token } = options?.headers as HeaderToken;
				const { Authorization } = options?.headers as HeaderToken;
				const pathName = response.url;
				const clientId = (options?.headers as HeaderToken)["x-client-id"];
				const old_token = Authorization.split("")[1];

				const callRefreshToken = await fetch(`${baseUrl}/v1/api/auth/refresh-token`, {
					method: "GET",
					headers: {
						authorization: `Bearer ${old_token}`,
						"x-client-id": clientId,
						Cookie: `refresh_token=${refresh_token}`,
					},
					cache: "no-store",
				});
				const refresh_api = await callRefreshToken.json();

				if (+refresh_api.code === PERMISSION_ERROR_STATUS) {
					console.log({ http: "logout thooi", refresh_api, token: refresh_token });
					throw new Error("Token hết hạn");
				} else {
					if (refresh_api.metadata && refresh_api.metadata.token && refresh_api.metadata.user) {
						console.log({ http: "call refresh" });
						const pathName = options?.pathName;
						const { access_token, refresh_token: newRf } = refresh_api.metadata.token;
						const { _id: user_id } = refresh_api.metadata.user;
						const { domain } = options?.headers as any;
						redirect(
							`/refresh-token?old_token=${refresh_token}&new_access_token=${access_token}&new_refresh_token=${newRf}&user_id=${user_id}&pathName=${pathName}`
						);
					}
				}
			}
		}
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
